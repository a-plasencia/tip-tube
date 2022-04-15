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

app.post('/api/create', (req, res, next) => {
  const { roomName, username, youtubeVideo } = req.body;
  if (!roomName || !username || !youtubeVideo) {
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
      const sqlUsers = `
      insert into "users" ("username")
      values ($1)
      returning *
      `;
      const paramsUsers = [username];
      db.query(sqlUsers, paramsUsers)
        .then(result => {
          const userResult = result.rows[0];
          userResult.room = roomsResult;
          res.status(201).json(userResult);
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

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
