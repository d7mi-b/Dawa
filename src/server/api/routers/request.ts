import { prisma } from "~/server/db";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { z } from "zod";
import type { Request } from "~/types";


export const requestRouter = createTRPCRouter({
    get: privateProcedure.query(async () => {
        const requests: Request[] = await prisma.requests.findMany();

        return requests;
    }),

    user: privateProcedure.query(async req => {
        const user_id = req.ctx.req.user ? req.ctx.req.user : "";

        const requests: Request[] = await prisma.requests.findMany({
            where: {
                user_id
            }
        })

        return requests;
    }),

    checkOwner: privateProcedure.input(z.object({
        id: z.string()
    })).query(async req => {
        const { id } = req.input;
        const user_id = req.ctx.req.user ? req.ctx.req.user : '';

        const request: Request | null = await prisma.requests.findUnique({
            where: {
                id, user_id
            }
        });

        if (request)
            return true;

        return false;
    }),

    request: privateProcedure.input(z.object({
        id: z.string()
    })).query(async req => {
        const { id } = req.input;

        const request: Request | null = await prisma.requests.findUnique({
            where: {
                id
            }
        })

        return request;
    }),

    add: privateProcedure.input(z.object({
        medicine: z.string(),
        description: z.string(),
        image: z.string(),
        city: z.string(),
        neighborhood: z.string(),
    })).mutation(async (req) => {
        const { medicine, description, image, city, neighborhood } = req.input;
        const user_id = req.ctx.req.user ? req.ctx.req.user : '';

        const request: Request = await prisma.requests.create({
            data: {
                medicine, description, image, city, neighborhood, createdAt: new Date(), user_id
            }
        })

        return request;
    }),

    delete: privateProcedure.input(z.object({
        id: z.string(),
    })).mutation(async req => {
        const { id } = req.input;
        
        const request: Request = await prisma.requests.delete({
            where: {
                id
            }
        });

        return request;
    }),

    search: privateProcedure.input(z.object({
        search: z.string()
    })).query(async req => {
        const { search } = req.input;

        const requests: Request[] = await prisma.requests.findMany({
            where: {
                medicine: {
                    contains: search
                }
            }
        });

        return requests;
    })
})