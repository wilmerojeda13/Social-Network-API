//Requiring the modules 
const express = require('express');
const mongoose = require('mongoose');

//Initialize app
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Initialize app routes
app.use(require('./routes'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// Use this to log mongo queries being executed!
mongoose.set('debug', true);
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
