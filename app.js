const express = require('express');
var cors = require('cors')
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET;

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
const dbURI = 'mongodb+srv://Himanshu:Sphl%4023908@cluster0.jhrmdq8.mongodb.net/Todo_List?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(5000))
    .catch(err => console.log(err));

function generateToken(user, role) {
    const token = jwt.sign({ user: user, role: role }, process.env.TOKEN_SECRET);
    return token;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((res, req, next) => {
    next();
})

app.use('', userRoutes);
app.use('', todoRoutes);
