const express = require('express');
var cors = require('cors')
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET;

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(5000))
    .catch(err => console.log(err));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((res, req, next) => {
    next();
})

app.use('', userRoutes);
app.use('', todoRoutes);
