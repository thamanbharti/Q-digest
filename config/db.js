// import dotenv from 'dotenv'
import mongoose from "mongoose";


const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('db connected')
    })
    .catch((err)=>{
        console.log('error in connecting db',err);
    })
}


export default connectDB