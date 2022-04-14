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

app.post('/api/room/create', (req, res, next) => {
  const { roomName } = req.body;
  if (!roomName) {
    throw new ClientError(400, 'roomName is a required field');
  }
  const sql = `
  insert into "rooms" ("roomName")
  values ($1)
  returning *
  `;
  const params = [roomName];
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
