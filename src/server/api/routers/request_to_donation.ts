import { prisma } from "~/server/db";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { z } from "zod";


export const requestsToDonationRouter = createTRPCRouter({
    get: privateProcedure.input(z.object({
        donation_id: z.string()
    })).query(async req => {
        const { donation_id } = req.input;
        const user_id = req.ctx.req.user ? req.ctx.req.user : '';

        const request_to_donation = await prisma.request_To_Donation.findMany({
            where: {
                donation_id,
                donation: {
                    user_id
                }
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                    }
                }
            }
        })

        return request_to_donation;
    }),

    add: privateProcedure.input(z.object({
        donation_id: z.string()
    })).mutation(async req => {
        const { donation_id } = req.input;
        const user_id = req.ctx.req.user ? req.ctx.req.user : '';

        const request_to_donation = await prisma.request_To_Donation.create({
            data: {
                donation_id, user_id, createdAt: new Date()
            }
        })

        return request_to_donation;
    }),

    check: privateProcedure.input(z.object({
        donation_id: z.string()
    })).query(async req => {
        const { donation_id } = req.input;
        const user_id = req.ctx.req.user ? req.ctx.req.user : '';
        
        const request_to_donation = await prisma.request_To_Donation.findUnique({
            where: {
                donation_id_user_id: {
                    donation_id, user_id
                }
            }
        })

        if (request_to_donation)
            return true;
    
        return false;
    })
})