import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:String,
    mobile:Number,
    image:String,
    email:String,
    password:String
});

const User = mongoose.model('jis', userSchema)

export default User