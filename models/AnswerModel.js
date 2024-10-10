import mongoose from "mongoose";

const AnswerSchema=mongoose.Schema({
       questionId:{
        type:String,
        required:true,
       },
       answer:{
        type:String,
        required:true,
       },
       mentionedUser:{
        type:[String],
       },
       userId:{
        type:String,
        required:true,
       },
       username:{
              type:String,
       }
})

const Answers=mongoose.model('Answers',AnswerSchema);
export default Answers;