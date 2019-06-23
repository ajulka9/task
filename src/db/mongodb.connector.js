const Mongoose = require('mongoose');
const TaskModel = require('./tasks.db.model');
const Constants = require('./db_constants');
const UserModel = require('./users.db.model');

var taskCollection;
var userCollection;
Mongoose.connect(Constants.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
}, (error, client)=>{
    if(error){
        console.log('Error connecting to db : '+ error);
    } else{
        console.log('Successfully connected to db !');
        // taskCollection = client.db(Constants.TASKS_COLLECTION);
        // userCollection = client.db(Constants.USER_COLLECTION);
    }
});

const createUser = (user)=>{
    var newUser = new UserModel(user);
    newUser.save().then(()=>{
        console.log('User  : '+ user.name + ' create in DB');
    }).catch((error)=>{
        console.log('Error creating User : '+ user.name + ' in the DB' + error);
    });
}

const getUsers = async ()=>{
    debugger
    UserModel.find({}).then((users)=>{
        return users;
    }).catch((e)=>{
        console.log('Error getting all users',e)
    })
}
const createTask = (task)=>{
    var newTask = new TaskModel(task);
}

const updateTask =  (id, task) => {
    return new Promise((resolve, reject)=>{
        TaskModel.findByIdAndUpdate(id, task).then((task)=>{
            console.log('DB: then() and resolving ', task);
            resolve(task);
        }).catch((e)=>{
            console.log('DB: catch() and rejecting ',e);
            reject(e);
        })
    })
}

const updateAgeAndCount = async (id, age)=>{
    const user = await UserModel.findByIdAndUpdate(id, {age});
    const count = await UserModel.countDocuments({age});
}

module.exports = {createUser, createTask, getUsers, updateAgeAndCount, updateTask}