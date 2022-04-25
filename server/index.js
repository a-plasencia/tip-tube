require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const ClientError = require('./client-error');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
const http = require('http');
const app = express();
const jsonMiddleware = express.json();
app.use(jsonMiddleware);
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

app.get('/api/room/:roomId', (req, res, next) => {
  const roomId = Number(req.params.roomId);
  if (roomId < 0) {
    throw new ClientError(400, 'roomId must be a positive integer');
  }

  const sql = `
with "roomMessages" as (
  select "m".*,
         "u"."username"
    from "messages" as "m"
    join "users" as "u" using ("userId")
   where "m"."roomId" = $1
)
select "r".*,
       json_agg("rm" order by "createdAt") as "messages"
  from "rooms" as "r"
  left join "roomMessages" as rm using ("roomId")
 where "r"."roomId" = $1
 group by "r"."roomId"
  `;
  const params = [roomId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find room with roomId ${roomId}`);
      }
      const results = result.rows[0];
      const filteredResults = results.messages.filter(function (message) { return message !== null; });
      results.messages = filteredResults;

      io.on('connection', socket => {
        // eslint-disable-next-line no-console
        console.log('a user connected');
        socket.on('disconnect', () => {
          // eslint-disable-next-line no-console
          console.log('user disconnected');
        });
      });

      res.status(201).json(results);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/create', (req, res, next) => {
  const { roomName, youtubeVideo } = req.body;
  if (!roomName || !youtubeVideo) {
    throw new ClientError(400, 'a required field is missing');
  }
  const sqlRooms = `
  insert into "rooms" ("roomName", "youtubeVideo")
  values ($1, $2)
  returning *
  `;
  const paramsRooms = [roomName, youtubeVideo];
  db.query(sqlRooms, paramsRooms)
    .then(result => {
      const roomsResult = result.rows[0];
      res.status(201).json(roomsResult);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/user/username', (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    throw new ClientError(400, 'username is a required field');
  }
  const sql = `
  insert into "users" ("username")
  values ($1)
  returning *
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/message', (req, res, next) => {
  const { content, userId, roomId } = req.body;
  if (!content || !userId || !roomId) {
    throw new ClientError(400, 'required field is missing');
  }
  const sql = `
  insert into "messages" ("content", "userId", "roomId", "createdAt")
  values ($1, $2, $3, now())
  returning *
  `;
  const params = [content, userId, roomId];
  db.query(sql, params)
    .then(result => {
      const results = result.rows[0];
      const messageSql = `
      select "content",
             "username"
      from "messages"
      join "users" using ("userId")
      where "userId" = $1 and "messageId" = $2
      `;
      const paramsSelect = [userId, results.messageId];
      db.query(messageSql, paramsSelect)
        .then(result => {
          const toEmit = result.rows[0];

          // io.to(`roomId=${results.roomId}`).emit('message', `${toEmit.username}: ${toEmit.content}`);

          res.status(201).json(toEmit);
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      next(err);
    });
});

app.use(staticMiddleware);

app.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
