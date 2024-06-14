require('dotenv').config();

//MongoDB Connection
const mongoStr = process.env.DATABASE_URL
const mongoose = require('mongoose');

mongoose.connect(mongoStr);
const database = mongoose.connection;

database.on('error', (error) => {
    console.error(error)
})

database.once('connected', () => {
    console.log('Database Connected')
})

//Server Port
const app = require('./app.js');

app.listen(3000, () => {
    console.log(`Server started at ${3000}`)
});