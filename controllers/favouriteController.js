import favourite from "../models/favouriteModel.js"
import mongoose from 'mongoose'
import { UserQuestion } from "../models/QuestionModel.js";

const getFavouriteController = async (req, res) => {
    
   try {
        const id=req.params.id;
       const favouriteDoc = await favourite.findOne({ userId:id });

       if (!favouriteDoc) {
           return res.status(404).send({ message: 'Favourites not found', success: false });
       }

       const favouritesId = favouriteDoc.questionId; 
       const favtQuest = [];
        
      
       for (let i = 0; i < favouritesId.length; i++) {
           console.log(favouritesId[i])
          
           const objectId = mongoose.Types.ObjectId.createFromHexString(favouritesId[i]);
           const question = await UserQuestion.findOne({ _id:objectId });
           if (question) {
               favtQuest.push(question);
           }
       }
      
       return res.status(200).send({ favtQuest, success: true });
   } catch (err) {
       console.log('Error in fetching favourite', err);
       return res.status(500).send({ message: 'Internal server error', success: false });
   }
};

const postFavouriteController=async (req,res)=>{
    const {questionId,userId,username}=req.body;
    const newFavourites=new favourite({
         questionId:questionId,
         userId:userId,
         username:username
    });
    try{
         if(newFavourites){
            await newFavourites.save();
            return res.status(200).send({message:'data saved successfully',success:true});
         }
         else{
            return res.status(409).send({message:'error in data-sent',success:false});
         }
    }
    catch(err){
         console.log(err)
         return res.status(409).send({message:'Internal sever error',success:false});
    }
}


export  {getFavouriteController,postFavouriteController};