import express from 'express';
import { FindSearch, FetchFoods, CreateFood, favoriteFood } from '../controllers/FoodCtrl';
import {authMiddleware} from  '../middleware/authMiddleware';
let FoodRouter = express.Router();

FoodRouter.get('/fetch-foods',authMiddleware, FetchFoods);
FoodRouter.get('/find-search',authMiddleware, FindSearch);
FoodRouter.post('/create-food',authMiddleware, CreateFood);
FoodRouter.get('/favorite/:id',authMiddleware, favoriteFood);
// FoodRouter.post('/login', loginUserCtrl);
// FoodRouter.get('/logout',authMiddleware, logoutUser);
// appRouter.post('/password',updatePassword);
// appRouter.post('/password-reset',resetPassword);
// appRouter.delete('/:id',authMiddleware,deleteUser)
// appRouter.put('/:id',authMiddleware,updateUser)
// appRouter.get('/refresh',handleRefreshToken)
export default FoodRouter;