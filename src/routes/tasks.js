const express  = require('express');
const TaskModel = require('../db/tasks.db.model');
const router = express.Router();

router.get('/tasks', (req, res) => {
    TaskModel.find({}).then((tasks) => {
        console.log('task found: ' + tasks)
        res.status(200);
        res.send(tasks);
    }).catch((e) => {
        console.log(e);
        res.status(400);
        res.send(e);
    })
});

router.get('/tasks/:id', (req,res)=>{
    console.log(req.params);
    TaskModel.findById(req.params.id).then((task)=>{
        res.status(200);
        res.send(task);
    }).catch((e)=>{
        res.status(400);
        res.send(e);
    })
});

router.post('/tasks', (req, res) => {
    debugger
    console.log(req.body);
    var task = new TaskModel({
        title: req.body.title,
        createdDate: new Date()
    });
    task.save().then(() => {
        console.log('Successfully created task : ' + task.title + ' in the DB!');
        res.send(task);
    }).catch((error) => {
        console.log('Error creating task in DB: ' + error);
        res.send(error);

    })
});

router.patch('/tasks/:id', (req, res)=>{
    console.log('PATCH: req.body : '+ JSON.stringify(req.body))
    DbConnector.updateTask(req.params.id, req.body).then((task)=>{
        console.log('app.js : then() ', task);
        res.status(200).send(task);
    }).catch((e)=>{
        console.log('apps.js: catch() ', e);
        res.status(400).send(e);
    })
});

module.exports = router;