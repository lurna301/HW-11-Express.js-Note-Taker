const notes = require('express').Router();
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  
  // POST Route for submitting notes
  notes.post('/', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to create note.`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      }; 
  
      res.json(response);
    } else {
      res.json('Error in posting note');
    }
  });








module.exports = notes