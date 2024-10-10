import express from 'express'
import { getanswerController, getquestionController, getspecificUserquestion, postanswerController, postquestionController } from '../controllers/contentController.js';
const contentRouter=express.Router();

contentRouter.post('/askquestion',postquestionController);
contentRouter.get('/getquestion',getquestionController);
contentRouter.get('/getanswer/:id',getanswerController);
contentRouter.post('/postAnswer',postanswerController);
contentRouter.get('/getuserquestion/:id',getspecificUserquestion);

export {contentRouter}