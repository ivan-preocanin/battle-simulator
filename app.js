require('dotenv').config();
const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const webpush = require('web-push');

const app = express();
const port = 3000;

const { DB_CONNECTION_STRING, JWT_KEY } = process.env;

const schema = new mongoose.Schema({
  name: String,
});

const Army = mongoose.model('Army', schema);

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('index'));

app.post('/api/join', (req, res) => {
  const { name, squadsCount } = req.body;
  const token = jwt.sign({ name, squadsCount }, JWT_KEY, { expiresIn: '1h' });
  // save army in db
  mongoose.connect(DB_CONNECTION_STRING, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    const army = new Army({
      name,
    });

    army.save((error, army) => {
      if (error) {
        return console.error(error);
      }
      return res.send('\n\nSAVED');
    });
  });
  db.close();

  // army.join

  return res.status(200).json({
    message: `${name} has joined the battle with ${squadsCount} squads!`,
    token,
  });
});

app.put('/api/attack/:armyId', (req, res) => res.send('attack'));

app.put('/api/leave', (req, res) => {
  // army.leave
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Battle server ready on port ${port}!`));
