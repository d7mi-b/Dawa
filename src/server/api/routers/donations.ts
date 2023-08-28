import { prisma } from "~/server/db";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import type { Donation } from "~/types";


export const donationRouter = createTRPCRouter({
    get: publicProcedure.query(async () => {
        const donations: Donation[] = await prisma.donations.findMany();

        return donations;
    }),

    user: privateProcedure.query(async req => {
        const user_id = req.ctx.req.user ? req.ctx.req.user : "";

        const donations: Donation[] = await prisma.donations.findMany({
            where: {
                user_id
            }
        })

        return donations;
    }),

    checkOwner: privateProcedure.input(z.object({
        id: z.string()
    })).query(async req => {
        const { id } = req.input;
        const user_id = req.ctx.req.user ? req.ctx.req.user : '';

        const donation: Donation | null = await prisma.donations.findUnique({
            where: {
                id, user_id
            }
        });

        if (donation)
            return true;

        return false;
    }),

    donation: privateProcedure.input(z.object({
        id: z.string()
    })).query(async req => {
        const { id } = req.input;

        const donation: Donation | null = await prisma.donations.findUnique({
            where: {
                id
            }
        })

        return donation;
    }),

    add: privateProcedure.input(z.object({
        medicine: z.string(),
        description: z.string(),
        image: z.string(),
        quantity: z.string(),
        expiry_Date: z.date(),
        city: z.string(),
        neighborhood: z.string(),
    })).mutation(async (req) => {
        const { medicine, description, image, quantity, expiry_Date, city, neighborhood } = req.input;
        const user_id = req.ctx.req.user ? req.ctx.req.user : '';

        const donation: Donation = await prisma.donations.create({
            data: {
                medicine, description, image, quantity, expiry_Date, city, neighborhood, createdAt: new Date(), user_id
            }
        })

        return donation;
    }),

    delete: privateProcedure.input(z.object({
        id: z.string(),
    })).mutation(async req => {
        const { id } = req.input;
        
        const donation: Donation = await prisma.donations.delete({
            where: {
                id
            }
        });

        return donation;
    }),

    search: publicProcedure.input(z.object({
        search: z.string()
    })).query(async req => {
        const { search } = req.input;

        const donations: Donation[] = await prisma.donations.findMany({
            where: {
                medicine: {
                    contains: search
                }
            }
        });

        return donations;
    })
})