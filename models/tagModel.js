import mongoose from 'mongoose'

const tagSchema=mongoose.Schema({
    tag:{name:[String]}
})

const tag=mongoose.model('tag',tagSchema);


export default tag;