const express = require('express')
const db = require('./config/db')
const app = express()
const route = require('./routes/route')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

db.createTable();

app.use('/api', route);


app.listen('5000', '0.0.0.0', console.log('http//kmldjslkf'));

