import express from 'express'
import {getFavouriteController, postFavouriteController} from '../controllers/favouriteController.js'

const favRoute=express.Router();
favRoute.post('/saveFavourite',postFavouriteController);
favRoute.get('/getFavourite/:id',getFavouriteController);
export {favRoute};