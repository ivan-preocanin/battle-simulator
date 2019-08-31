require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

const { DB_CONNECTION_STRING, JWT_KEY } = process.env;

app.get('/', (req, res) => res.send('index'));

app.post('/api/join', (req, res) => res.send('join'));

app.put('/api/attack/:armyId', (req, res) => res.send('attack'));

app.put('/api/leave', (req, res) => res.send('leave'));

app.listen(port, () => console.log(`Battle server ready on port ${port}!`));
