import testController from '../controllers/testController.js';
import express from 'express'

const testRoute=express.Router();
console.log(testController)
testRoute.get('/',testController)

export default testRoute