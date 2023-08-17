import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { utapi } from "uploadthing/server";

export const uploadthingRouter = createTRPCRouter({
    delete: privateProcedure.input(z.object({
        image: z.string(),
    })).mutation(async req => {
        const { image } = req.input;

        if (image && typeof image.split('/')[image.split('/').length - 1] === 'string')
            await utapi.deleteFiles(image.split('/')[image.split('/').length - 1]!);
    })
})