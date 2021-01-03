const express = require('express');
const app = express();
const path = require('path');
const createNewNote = require("./lib/notes");
const { notes } = require("./data/db.json");

const PORT = process.env.PORT || 3001;
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});
// gets all notes
app.get('/api/notes', (req, res) => {
  res.json(notes)
});
// gets notes by id
app.get('/api/notes/:id', (req, res) => {
  res.json(notes[req.params.id])
});
// route to post new note
app.post('/api/notes', (req,res) => {
  req.body.id = notes.length.toString();
  const note = createNewNote(req.body, notes);
  res.json(note); 
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});