const express = require('express');
const app = express();
const path = require('path');
const { notes } = require("./data/db.json");

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes)
});

app.post('/api/notes', (req, res) => {
  req.body.id = notes.length.toString();
  res.json(notes)
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(3000)