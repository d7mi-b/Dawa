import { createTRPCRouter, privateProcedure } from "../trpc";
import { z } from "zod";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


export const donation_to_requestRouter = createTRPCRouter({
    get: privateProcedure.input(z.object({
        request_id: z.string()
    })).query(async req => {
        const { request_id } = req.input;
        const user_id = req.ctx.req.user ? req.ctx.req.user : '';

        const donation_to_request = await prisma.donation_To_Request.findMany({
            where: {
                request_id,
                user: {
                    role: 'User'
                },
                request: {
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

        return donation_to_request;
    }),

    pharmacies: privateProcedure.input(z.object({
        request_id: z.string()
    })).query(async req => {
        const { request_id } = req.input;

        const donation_to_request = await prisma.donation_To_Request.findMany({
            where: {
                request_id,
                user: {
                    role: 'Pharmacy'
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

        return donation_to_request;
    }),

    add: privateProcedure.input(z.object({
        request_id: z.string(),
    })).mutation(async req => {
        const { request_id } = req.input;
        const user_id = req.ctx.req.user ? req.ctx.req.user : '';

        const donation_to_request = await prisma.donation_To_Request.create({
            data: {
                request_id, user_id, createdAt: new Date()
            }
        })

        return donation_to_request;
    }),

    check: privateProcedure.input(z.object({
        request_id: z.string()
    })).query(async req => {
        const { request_id } = req.input;
        const user_id = req.ctx.req.user ? req.ctx.req.user : '';
        
        const donation_to_request = await prisma.donation_To_Request.findUnique({
            where: {
                request_id_user_id: {
                    request_id, user_id
                },
                user: {
                    role: 'User'
                }
            }
        })

        if (donation_to_request)
            return true;
    
        return false;
    }),

    checkPharmacy: privateProcedure.input(z.object({
        request_id: z.string()
    })).query(async req => {
        const { request_id } = req.input;
        const user_id = req.ctx.req.user ? req.ctx.req.user : '';
        
        const donation_to_request = await prisma.donation_To_Request.findUnique({
            where: {
                request_id_user_id: {
                    request_id, user_id
                },
                user: {
                    role: "Pharmacy"
                }
            }
        })

        if (donation_to_request)
            return true;
    
        return false;
    })
})