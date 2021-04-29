// Declaration
const express = require('express');
const app = express();

// dotenv configuration
require('dotenv').config();
// model
const Todo = require('./models/Todo')

const PORT = 8080 || process.env.PORT;
// MongoDB connection using mongoose module
const mongoose = require('mongoose');
// database name
const DB_NAME = process.env.DB_NAME;
const DB_LINK = process.env.MONGO_LINK+DB_NAME;
mongoose.connect(DB_LINK, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(()=> console.log('MongoDB database is Successfully connected'))
.catch(()=> console.log('Database connection failed!'))

// Settings of public and view engine
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'hbs');

app.use(express.urlencoded({
    extended: false
}))

//! Routing *CRUD
const url =require('url');
//! Create(C)
// Create a new documents for DB
app.post('/todolist', (req, res)=> {
    req.body.created = Date.now()
    const newTask = new Todo(req.body)
    // Create/save
    newTask.save(()=>{
        // go back to the form
        const message = 'A new task has been created'
        res.redirect(url.format({
            pathname: './todolist',
            query:{
                message: message
            }

        }))
        // res.redirect('/todolist');
        // res.render('tasklist', {
        //     successMsg: 'Your Task successfully added'
        // })
    })
})
//! Read(R)
app.get('/todolist', (req,res)=>{
    // Find all data from Todo collections
    Todo.find((err, tasks)=>{
        res.render('tasklist', {tasks}) //ES6
    })
})

//! Update(U)
// update existing Id
app.get('/todo/update/:id', (req, res)=>{
    const taskId = req.params.id;
    Todo.findByIdAndUpdate(taskId, (err, doc)=>{
        console.log('This task has been updated')
        res.redirect('/todolist');
    })
    // res.json(req.params.id)
})
//! Delete(D)
// delete some docs by Id
app.get('/todo/delete/:id', (req, res)=>{
    const taskId = req.params.id;
    Todo.findByIdAndDelete(taskId, (err, doc)=>{
        console.log('This task has been deleted')
        res.redirect('/todolist');
    })
    // res.json(req.params.id)
})

// listen app with port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})





