import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "~/server/db";

export const messagesRouter = createTRPCRouter({
    send: publicProcedure.input(z.object({
        name: z.string(),
        email: z.string().email(),
        message: z.string()
    })).mutation(async req => {
        const { name, email, message } = req.input;

        const m = await prisma.messages.create({
            data: {
                name, email, message, createdAt: new Date()
            }
        })

        return m;
    })
})