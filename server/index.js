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
const app = express();
const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.get('/api/room/:roomId', (req, res, next) => {
  const roomId = Number(req.params.roomId);
  if (roomId < 0) {
    throw new ClientError(400, 'roomId must be a positive integer');
  }

  const sql = `
  select "roomName",
         "youtubeVideo"
    from "rooms"
   where "roomId" = $1
  `;
  const params = [roomId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find room with roomId ${roomId}`);
      }
      res.status(201).json(result.rows[0]);
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
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      next(err);
    });
});

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
// Adding comment
