const express = require('express')
const db = require('./config/db')
const app = express()
const route = require('./routes/route')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

db.createTables();

app.use('/api', route);

const PORT =    5440;

app.listen(PORT, '192.168.8.152', () => {
    console.log(`Server running at http://192.168.8.152:${PORT}`);
  });

