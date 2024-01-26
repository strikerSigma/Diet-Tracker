import expressAsyncHandler from "express-async-handler";
import { prisma } from "../Models/Users";


//fetch custom meal i.e foods in custom meal
const fetchMeals = expressAsyncHandler(async (req:any, res) => {
    try{
        const meal = await prisma.customMeal.findMany({
            where:{ userId: Number(req.user.id)},
            include:{
                foods:true,
            }
        });
        res.json(meal);
    }
    catch(err:any){throw new Error(err)}
});

const fetchCatalog = expressAsyncHandler(async(req:any,res)=>{
    try{
        const catalog = await prisma.foodCatalog.findFirst({
            where:{ userId: Number(req.user.id)},
            include:{
                foods:true,
            }
        });
        res.json(catalog);
    }
    catch(err:any){throw new Error(err)}

});

const fetchFavorites = expressAsyncHandler(async(req:any,res)=>{
    try{
        const favorite = await prisma.favoriteFood.findFirst({
            where:{ userId: Number(req.user.id)},
            include:{
                foods:true,
            }
        });
        res.json(favorite);
    }
    catch(err:any){throw new Error(err)}
})

const fetchTargets = expressAsyncHandler(async(req:any,res)=>{
    try{
        const favorite = await prisma.target.findMany({
            where:{ userId: Number(req.user.id)},
        });
        res.json(favorite);
    }
    catch(err:any){throw new Error(err)}
})

export {
    fetchMeals,
    fetchCatalog,
    fetchFavorites,
    fetchTargets
}