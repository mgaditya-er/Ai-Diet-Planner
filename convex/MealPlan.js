import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateMealPLan=mutation({
    args:{
         recipeId : v.id('recipes'),
        date : v.string(),
        mealType : v.string(),
        uid:v.id('users')
    },
    handler:async(convexToJson,args)=>{
        const result=await convexToJson.db.insert('mealPlan',{
            recipeId : args.recipeId,
            date : args.date,
            mealType : args.mealType,
            uid:args.uid
        });
        return result;
    }
})