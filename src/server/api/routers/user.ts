import bcrypt from 'bcrypt';
import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import jwt from 'jsonwebtoken'
import { TRPCError } from "@trpc/server";
import type { User } from "~/types";
import { PrismaClient } from '@prisma/client';
import { env } from '~/env.mjs';

const prisma = new PrismaClient()

const JWT_SECRET_KEY: string = env.JWT_SECRET_KEY;

const createToken = (id: string) => {
    const token: string = jwt.sign({ id }, JWT_SECRET_KEY);
    return token;
}

export const userRouter = createTRPCRouter({
    signup: publicProcedure.input(z.object({
        name: z.string(),
        email: z.string(),
        phone: z.number(),
        password: z.string(),
        role: z.enum(["Admin", "User", "Pharmacy"]),
    })).mutation(async req => {
        const { name, email, password, role, phone } = req.input;
        
        if (!name || !email || !password || !role || !phone)
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: "يجب تعبئة كل الحقول"
            });

        const existsEmail: User | null = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existsEmail)
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'يوجد حساب على هذا البريد الالكتروني',
            });

        const existsPhone: User | null = await prisma.user.findUnique({
            where: {
                phone
            }
        })

        if (existsPhone)
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'يوجد حساب على هذا الهاتف',
            });

        const salt: string = await bcrypt.genSalt(10); 
        const hash: string = await bcrypt.hash(password, salt);

        const user: User = await prisma.user.create({
            data: {
                name, email, password: hash, role, phone
            }
        })

        const token: string = createToken(user.id);
        
        return { token };
    }),

    login: publicProcedure.input(z.object({ 
        email: z.string(),
        password: z.string()
    })).mutation(async (req) => {
        const { email, password } = req.input;

        if (!email || !password)
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: "يجب تعبئة كل الحقول"
            });

        const user: User | null = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user)
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: "البريد الالكتروني غير صحيح"
            });

        const match: boolean = await bcrypt.compare(password, user.password); 

        if (!match)
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: "كلمة المرور غير صحيحة"
            });

        const token: string = createToken(user.id);
        
        return { token };
    }),

    data: privateProcedure.query(async req => {
        const id = req.ctx.req.user ? req.ctx.req.user : '';

        const user = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                name: true,
                email: true,
                phone: true
            }
        });

        return user;
    }),

    update: privateProcedure.input(z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.number(),
        password: z.string()
    })).mutation(async req => {
        const { name, email, password, phone } = req.input;
        const id = req.ctx.req.user ? req.ctx.req.user : '';

        if (password) {
            const salt: string = await bcrypt.genSalt(10); 
            const hash: string = await bcrypt.hash(password, salt);

            const user = await prisma.user.update({
                where: {
                    id
                },
                data: {
                    name, email, phone, password: hash
                }
            });

            return user;
        }

        if (!password) {
            const user = await prisma.user.update({
                where: {
                    id
                },
                data: {
                    name, email, phone
                }
            });

            return user;
        }
    }),

    checkPharamcy: privateProcedure.query(async req => {
        const id = req.ctx.req.user ? req.ctx.req.user : '';

        const user: User | null = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (user?.role === "Pharmacy")
            return true;

        return false;
    })
})