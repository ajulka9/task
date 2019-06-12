// Crud
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const connectioUrl = 'mongodb://localhost:27017';
const dbName = 'task-manager';

mongoClient.connect(connectioUrl, {
        useNewUrlParser: true
    },
    (error, client) => {
        if(error){
            console.log('Unable to connect to the DB');
            return;
        }
        console.log('Successfull connected to DB');
        const db = client.db(dbName);
        db.collection('users').insertMany([{
            'name':'Abhishek',
            'age':'30'
        },{
            'name':'Test',
            'age':'29',
            'alias':'tester'
        },{
            'name': 'Test2',
            'age':'49'
        }], (error, result)=>{
            if(error){
                console.log('Error inserting document to collection ' + error);
                return;
            } else{
                console.log(result.ops);
            }
        })
        client.close();
    });