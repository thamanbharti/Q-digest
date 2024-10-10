import Answers from "../models/AnswerModel.js";
import mongoose from "mongoose";
import {UserQuestion} from "../models/QuestionModel.js"
import tag from "../models/tagModel.js";
import { Notification } from "../models/NotificationModel.js";
const getquestionController=async (req,res)=>{
        const getQuestions= await UserQuestion.find();
      try{
           return res.status(200).send({getQuestions:getQuestions,success:true});
      }
      catch(err){
           console.log('error in fetching questions',err);
           return res.status(409).send({message:'Internal server error',success:false});
      }
}

const getspecificUserquestion=async (req,res)=>{
     const id=req.params.id;
     const getQuestions= await UserQuestion.find({postedById:id});
     try{
          return res.status(200).send({getQuestions:getQuestions,success:true});
     }
     catch(err){
          console.log('error in fetching questions',err);
          return res.status(409).send({message:'Internal server error',success:false});
     }
}

const getanswerController=async (req,res)=>{
     //    const {questionId}=req.body;
     //    console.log(questionId)
        const id=req.params.id;
    
        const getAnswers=await Answers.find({questionId:id});
        try{
            return res.status(200).send({getAnswers:getAnswers,success:true});
       }
       catch(err){
            console.log('error in fetching answers',err);
            return res.status(409).send({message:'Internal server error',success:false});
       }
          
}

const postanswerController=async (req,res)=>{
     const {questionId,mentionedUser,answer,userId,username,userRepliedTo}=req.body;
     const newAnswer=new Answers({
          questionId:questionId,
          mentionedUser:mentionedUser,
          answer:answer,
          userId:userId,
          username:username
     })
     
     if(mentionedUser.length){
          for(let i=0;i<mentionedUser.length;i++){
               const newNotify=new Notification({
                    notification:"You have been tagged in one Reply",
                    Username:mentionedUser[i],
                    seen:false,
               })
               await newNotify.save();
          }
     }
     if(userRepliedTo){
          const newNotify=new Notification({
               notification:"Your one question have been answered",
               Username:userRepliedTo,
               seen:false,
          })
          await newNotify.save();
     }

     await newAnswer.save();
     try{
          return res.status(200).send({message:'answer saved',success:true});
     }
     catch(err){
          return res.status(409).send({message:'Internal server error',success:false});
      }
     
}

const postquestionController=async (req,res)=>{
       const {question,questionTag,postedById,title,postedByusername}=req.body;
       const newQuestion=new UserQuestion({
          question:question,
          questionTag:questionTag,
          postedById:postedById,
          title:title,
          postedByusername:postedByusername
       })
       console.log(question,questionTag,postedById,title);
       await newQuestion.save();
       try{
          return res.status(200).send({message:'post created',success:true});
       }
       catch(err){
           return res.status(409).send({message:'Internal server error',success:false});
       }
}

const gettagController=async (req,res)=>{
     const getTag=await tag.find();
     try{
          return res.status(200).send({message:'tags fetched succesfully',success:true,data:getTag});
     }
     catch(err){
          console.log('error in fetching tag',err);
          return res.status(409).send({message:'Internal server error',success:false});
     }
}

const notificationController=async (req,res)=>{
      const user=req.params.user;
      console.log(user)
     const notification= await Notification.find({Username:user,seen:false});
      try{
          console.log(notification)
          return res.status(200).send({success:true,notification});
      }
      catch(err){
          console.log('error in fetching notify',err);
          return res.status(409).send({message:'Internal server error',success:false});
      }
}

const updateNotificationController = async (req, res) => {
     try {
         const user = req.params.user;
         const { seen } = req.body;
 
         
         const result = await Notification.updateMany(
             { Username: user },
             { $set: { seen: seen } }
         );
 
         if (result.nModified > 0) {
             res.status(200).json({ message: 'Notifications updated successfully' });
         } else {
             res.status(404).json({ message: 'No notifications found for the specified user' });
         }
     } catch (error) {
         res.status(500).json({ message: 'An error occurred while updating notifications', error: error.message });
     }
 };
 

export  {getquestionController,getanswerController,gettagController,postquestionController,postanswerController,getspecificUserquestion,notificationController,updateNotificationController};

