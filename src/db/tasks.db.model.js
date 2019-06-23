const Mongoose = require('mongoose');
const DbConstants = require('./db_constants');

const TaskModel = Mongoose.model('Task',{
    title:{
        type: String,
        required : true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    dueDate:{
        type: Date
    },
    createdDate:{
        type:Date,
        required : false
    },
    status:{
        type: Boolean,
        default: false
    }
});

module.exports = TaskModel;