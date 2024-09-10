const mongoose = require('mongoose');
const schema = mongoose.Schema;


// schema
const UserSchema = new schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type: String,
            required:true,
            unique:true, 
            index:true
        },
        password:{
            type:String,
            required:true
        }
    },
    {timestamps:true}
);

const User = mongoose.model('Users', UserSchema);
// model

module.exports = User;