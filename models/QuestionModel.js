import mongoose from 'mongoose'


const userQuestionSchema = new mongoose.Schema({
    postedById: { type: String, required: true },
    upVote: { type: Number, default: 0 },
    downVote: { type: Number, default: 0 },
    question: { type: String, required: true },
    questionTag: [{ type: String, required: true }],
    title: { type: String, required: true },
    postedByusername:{
        type:String,
 }
}, {
    timestamps: true 
});

const UserQuestion = mongoose.model('UserQuestion', userQuestionSchema);

export { UserQuestion};
