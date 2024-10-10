import { gettagController, notificationController,updateNotificationController } from "../controllers/contentController.js";
import express from 'express'

const tagRouter=express.Router();


tagRouter.get('/tag',gettagController);
tagRouter.get('/notification/:user',notificationController);
tagRouter.put('/notification/:user',updateNotificationController);

export {tagRouter};
