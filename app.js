const express = require('express');
const path = require('path');
const {planetsRouter} = require('./src/routes/planets/planets.router')
const {launchesRouter} = require('./src/routes/launches/launches.router')
const morgan = require('morgan')
const cors = require('cors');
const app = express();


app.use(cors({
    origin: 'http://localhost:3000'
}));

//careful of spaces in the build public files

app.use(morgan('combined'));

//Very important to pass express.json() to allow json data to be read
app.use(express.json());
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

//always declare specific paths first like /launches before /*
app.use(express.static(path.join(__dirname, 'public')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;