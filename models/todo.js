const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;