import express from 'express';
import { FindSearch, FetchFoods, CreateFood, favoriteFood, DeleteFood, RemovefavoriteFood } from '../controllers/FoodCtrl';
import {authMiddleware} from  '../middleware/authMiddleware';
import { CreateCustomMeal, CreateTarget, DeleteTarget, FoodToCustomMeal } from '../controllers/OtherCtrl';
import {  fetchCatalog, fetchFavorites, fetchMeals, fetchTargets } from '../controllers/FetchCtrl';
let FoodRouter = express.Router();

FoodRouter.get('/fetch-foods',authMiddleware, FetchFoods);
FoodRouter.get('/find-search',authMiddleware, FindSearch);
FoodRouter.post('/create-food',authMiddleware, CreateFood);
FoodRouter.get('/favorite/:id',authMiddleware, favoriteFood);
FoodRouter.delete('/delete-food/:id',authMiddleware, DeleteFood);
FoodRouter.delete('/remove-favorite/:id',authMiddleware, RemovefavoriteFood);
FoodRouter.post('/create-target',authMiddleware, CreateTarget);
FoodRouter.delete('/delete-target/:id',authMiddleware, DeleteTarget);
FoodRouter.post('/create-meal',authMiddleware, CreateCustomMeal);
FoodRouter.post('/add-food-to-meal',authMiddleware, FoodToCustomMeal);
//fetch URL's
FoodRouter.get('/fetch-meals',authMiddleware, fetchMeals);
FoodRouter.get('/fetch-catalog',authMiddleware, fetchCatalog);
FoodRouter.get('/fetch-favorites',authMiddleware, fetchFavorites);
FoodRouter.get('/fetch-targets',authMiddleware, fetchTargets);

// FoodRouter.post('/login', loginUserCtrl);
// FoodRouter.get('/logout',authMiddleware, logoutUser);
// appRouter.post('/password',updatePassword);
// appRouter.post('/password-reset',resetPassword);
// appRouter.delete('/:id',authMiddleware,deleteUser)
// appRouter.put('/:id',authMiddleware,updateUser)
// appRouter.get('/refresh',handleRefreshToken)
export default FoodRouter;