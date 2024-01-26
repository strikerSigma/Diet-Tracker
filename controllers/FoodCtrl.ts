import expressAsyncHandler from "express-async-handler";
import { cachedData, parseCsv } from "../config/csvFetcher";
import { prisma } from "../Models/Users";

const FetchFoods = expressAsyncHandler(async(req,res)=>{
    if(!cachedData) await parseCsv();
    res.json(cachedData)
})
const FindSearch = expressAsyncHandler(async(req,res)=>{
    const query:any = req.query.search;
    console.log(query,req.params)
    let SearchResult :any[] =[];
    if(!cachedData) await parseCsv();
    cachedData?.map(food=>{ if(food.Category.toLowerCase().includes(query.toLowerCase()) 
     || food.Description.toLowerCase().includes(query.toLowerCase())) { SearchResult.push(food)}
    })
    res.json(SearchResult)
})

const CreateFood = expressAsyncHandler(async(req:any,res:any)=>{
    const food = req.body;
    const result = await HelpercreateFood(req,food);
    res.json(result);
})

const DeleteFood = expressAsyncHandler(async(req:any,res:any)=>{
    const foodId = Number(req.params.id);
    const result = await prisma.food.delete({
        where:{id: foodId}
    })
    res.json(result);
})


const favoriteFood = expressAsyncHandler(async(req:any,res:any)=>{
    const foodId = Number(req.params.id);
    try{
        const favoriteFood:any = await prisma.favoriteFood.findFirst({
            where: {userId: req.user.id},
        })
        const food = await prisma.food.update({
            where: {id: foodId},
            data: { favoriteId: favoriteFood.id}
        })
            res.json("Food favorited");
    }
    catch(err:any){ throw new Error(err)}
})

const RemovefavoriteFood = expressAsyncHandler(async(req:any,res:any)=>{
    const foodId = Number(req.params.id);
    try{
        const food = await prisma.food.update({
            where: {id: foodId},
            data: { favoriteId: null}
        })
            res.json("favorited food removed");
    }
    catch(err:any){ throw new Error(err)}
})



//Helper Function
const HelpercreateFood = async(req:any,food:any)=>{
    console.log(req.user);
    try{
        const catalog:any = await prisma.foodCatalog.findFirst({
        where: {
            userId: req.user.id,
        }
    })
    console.log(catalog);
    const foodAdded = await prisma.food.create({
    data: {
        catalog: { connect: { id: catalog.id } },
        name: food.name,
        description: food.description,
        quantity: parseFloat(food.quantity),
        energy: parseFloat(food.energy),
        protein: parseFloat(food.protein),
        carbohy: parseFloat(food.carbohy),
        fat: parseFloat(food.fat),
        cholesterol: parseFloat(food.cholesterol),
        fiber: parseFloat(food.fiber),
        sugar: parseFloat(food.sugar),
        vitamens: [parseFloat(food.vitA), parseFloat(food.vitB), parseFloat(food.vitC), parseFloat(food.vitE), parseFloat(food.vitK)],
        iron: parseFloat(food.iron),
        cal: parseFloat(food.cal),
        mag: parseFloat(food.mag),
        phos: parseFloat(food.phos),
        pot: parseFloat(food.pot),
        sod: parseFloat(food.sod),
        zinc: parseFloat(food.zinc),
    }
});

    console.log(food);
    return foodAdded;
    }
    catch(err:any) {
        throw new Error(err);
    }
}

export {
    FetchFoods,
    FindSearch,
    CreateFood,
    favoriteFood,
    RemovefavoriteFood,
    DeleteFood
}