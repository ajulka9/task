const express = require('express');
const userModel = require('../db/users.db.model');
const router = express.Router();

router.get('/users',(req, res)=>{
    const users = DbConnector.getUsers();
    console.log(' All Users: ', users);
    res.send(users);
});

router.post('/users/login', async(req, res)=>{
    try{
        const user = await userModel.loginUsingEmail(req.body.email, req.body.password);
        res.status(200).send('Login Success! Welcome : '+  user.name);
    } catch(e){
        console.log('e',e);
        res.status(401).send(e);
    }
});

router.post('/users', async(req, res)=>{
    try{
        const created = await userModel.create(req.body);
        res.status(201).send(created);
    }catch(e){
        console.log('e',e);
        res.status(400).send(e);
    }
});
module.exports = router;