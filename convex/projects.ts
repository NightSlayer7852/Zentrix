import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { v } from "convex/values";
import { verifyAuth } from "./auth";

export const create = mutation({
    args: {
        name : v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);
    await ctx.db.insert("projects", {
        name: args.name,
        ownerId: identity.subject,
        updatedAt: Date.now(),
    })
    }
})

export const getPartial = query({
    args: {
        limit: v.number(),
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);
        const projects = await ctx.db.query("projects").withIndex("by_owner",
                (q) => q.eq("ownerId", identity.subject)
            ).order("desc").take(args.limit ?? 10);
        return projects;
    }   
})

export const get = query({
    args: {},
    handler: async (ctx) => {
        const identity = await verifyAuth(ctx);
        const project = await ctx.db.query("projects").withIndex("by_owner",    
            (q) => q.eq("ownerId", identity.subject)
        ).collect();
        return project;
    }
})

export const getById = query({
    args: {
        id: v.id("projects"),
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);
        const project = await ctx.db.get("projects", args.id);
        if (!project || project.ownerId !== identity.subject) {
            throw new Error("Project not found or access denied");
        }
        return project;
    }
})

export const rename = mutation({
    args: {
        id: v.id("projects"),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);
        const project = await ctx.db.get("projects", args.id);

        if (!project || project.ownerId !== identity.subject) {
            throw new Error("Project not found or access denied");
        }

        await ctx.db.patch("projects", args.id, {
            name: args.name,
            updatedAt: Date.now(),
        })
    }
})