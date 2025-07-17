import mongoose from "mongoose";

const RelationshipSchema = new mongoose.Schema({
    person1:{type:mongoose.Schema.Types.ObjectId,ref:'Person'},
    person2:{type:mongoose.Schema.Types.ObjectId,ref:'Person'},
    type:{type:String,enum:['Child','Spouse']}
});

export default mongoose.model('Relationship',RelationshipSchema);