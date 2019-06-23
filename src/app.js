const DbConnector = require('./db/mongodb.connector');
const express = require('express');
const TaskModel = require('./db/tasks.db.model');
const taskRouter = require('./routes/tasks');
const userRouter = require('./routes/users');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(taskRouter);
app.use(userRouter);
console.log('apps.js');

 

app.listen(port, () => {
    console.log('Server starting at : ' + port);
});