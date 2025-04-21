import { v } from "convex/values";
import { mutation ,query} from "./_generated/server";

export const CreateNewUser=mutation({
    args:{
        email : v.string(),
        name :v.string()
    },
    handler:async(ctx,args)=>{
        const user=await ctx.db.query('users')
        .filter(q=>q.eq(q.field('email'),args.email))
        .collect()

        if(user?.length==0)
        {
            const data={
                name: args.name,
                email:args.email,
                credits :10
            }
            const result= await ctx.db.insert('users',{
                ...data
            });
            return data;
        }
        return user[0];
    }

})

export const GetUser=query({
    args:{
        email:v.string()
    },
    handler:async(ctx,args)=>{
        const user=await ctx.db.query('users')
        .filter(q=>q.eq(q.field('email'),args.email))
        .collect()

        return user[0];
    }
})
