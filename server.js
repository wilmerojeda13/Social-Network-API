//Requiring the modules 
const express = require('express');
const mongoose = require('mongoose');

//Initialize app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Initialize app routes
app.use(rquire('./routes'))