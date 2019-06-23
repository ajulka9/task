const Validator = require('validator');
const Mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');
const UserSchema = Mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    age: {
        type: Number,
        validate(value) {
            if(value < 0){
                throw new Error('Age can not be negative value!');
            }
        }
    },
    email: {
        type: String,
        unique: true,
        validate(value){
            if(!Validator.isEmail(value)){
                throw new Error('Invalid Email!!');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password can not contain password');
            }
        }
    }
});

UserSchema.statics.loginUsingEmail = async function(email, password){
    console.log('MW: loginUsngEmail : ', email, password);
    const user = await UserModel.findOne({email});
    if(!user){
        console.log('User does not exist!');
        throw new Error('User does not exist!');
    }
    // const hashed = await Bcrypt.hash(password, 8);
    // console.log(hashed);
    // console.log(user.password);
    const isMatch = await Bcrypt.compare(password, user.password);
    if(isMatch){
        return user;
    } else{
        throw new Error('Invalid username or password!');
    }
};

UserSchema.pre('save', async function(next){

    console.log('Before pre save!!');
    const user = this;
    if(user.isModified('password')){
        user.password = await Bcrypt.hash(user.password, 8);
    }
    next();
});

const UserModel = Mongoose.model('User', UserSchema);



module.exports = UserModel;
