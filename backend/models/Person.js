import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
    name:String,
    gender:{type:String,enum:['Male','Female','Other']},
        yearOfBirth:Number
});

export default mongoose.model('Person',PersonSchema);