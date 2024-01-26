import expressAsyncHandler from "express-async-handler";
import { prisma } from "../Models/Users";

const CreateTarget = expressAsyncHandler(async(req:any,res)=>{
    const goal = req.body;
    try{
        const target = await prisma.target.create({
        data: {
    user: { connect: { id: req.user.id } },
    energy: parseFloat(goal.energy),
    protein: parseFloat(goal.protein),
    carbohy: parseFloat(goal.carbohy),
    fat: parseFloat(goal.fat),
    cholesterol: parseFloat(goal.cholesterol),
    fiber: parseFloat(goal.fiber),
    sugar: parseFloat(goal.sugar),
    // other fields...
  },
    });
    res.json(target);
    }
    catch (err:any) {throw new Error(err)}
})

const DeleteTarget = expressAsyncHandler(async(req:any,res)=>{
    const ID = Number(req.params.id);
    try{

        const target = await prisma.target.delete({
            where: {id: ID}
    });
    res.json("target deleted")
    }
    catch (err:any) {throw new Error(err)}
});

const CreateCustomMeal = expressAsyncHandler(async (req:any, res) => {

    try{
        const customMeal = await prisma.customMeal.create({
        data:{
            user: {connect: {id: req.user.id}},
            name: req.body.name,
        }
    });
    res.json(customMeal);
    }
    catch (err:any) { throw new Error(err)}
});


//add new food to custom meal
const FoodToCustomMeal = expressAsyncHandler(async (req:any, res) => {
    //food must be added in catalog
    try{
        const FetchMeal = await prisma.customMeal.update({
        where:{
            id: Number(req.body.mealId),
        },
        data:{
            foods: {connect: {id: Number(req.body.foodId)}}
        }
    })
    res.json(FetchMeal);
    }
    catch (err:any) {throw new Error(err);}
})

//fetch custom meal i.e foods in custom meal



export {
    CreateTarget,
    DeleteTarget,
    CreateCustomMeal,
    FoodToCustomMeal
}