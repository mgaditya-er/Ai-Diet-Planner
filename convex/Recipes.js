import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateRecipe=mutation({
    args:{
        jsonData:v.any(),
        uid:v.id('users'),
        recipeName:v.string(),
        imageUrl:v.string()
    },
    handler:async(ctx,args)=>{
        const result = await ctx.db.insert('recipes',{
            jsonData:args.jsonData,
            uid:args.uid,
            recipeName : args.recipeName,
            imageUrl:args.imageUrl

        });
        return result;
    }
})

export const GetRecipeById = query({
    args: {
      id: v.optional(v.id('recipes'))
    },
    handler: async (ctx, args) => {
      if (!args.id) return null;  // Gracefully return null
      return await ctx.db.get(args.id);
    }
  });
  

export const GetAllRecipes = query({
    handler: async (ctx, args) => {
      const result = await ctx.db.query('recipes').collect();
      return result;
    }
  });
  