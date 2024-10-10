import mongoose from 'mongoose';
import user from './userModel.js';

const NotificationSchema= new mongoose.Schema({
      Username:{
        type:String,
        required:true,
       
      },
      notification:{
        type:String,
        required:true,
      }
      ,
      seen:{
        type:Boolean,
        required:true,
      }
})

const Notification=new mongoose.model('Notification',NotificationSchema);

export {Notification} ;