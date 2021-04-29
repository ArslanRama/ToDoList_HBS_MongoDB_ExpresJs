
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema ({ 
    title: String,
    time: String,
    date: String,
    created: Date,
    updated: Date,
    deleted: Date,

})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo