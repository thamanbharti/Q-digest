import mongoose from 'mongoose'

const favouriteSchema=mongoose.Schema({
      userId:{
        type:String,
        required:true,
      },
      questionId:{
        type:[String],
        required:true,
      },
      username:{
        type:String,
 }
})

const favourite=mongoose.model('favourite',favouriteSchema);
export default favourite;