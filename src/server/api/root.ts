import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { requestRouter } from "./routers/request";
import { donationRouter } from "./routers/donations";
import { donation_to_requestRouter } from "./routers/donation_to_request";
import { requestsToDonationRouter } from "./routers/request_to_donation";
import { uploadthingRouter } from "./routers/uploadthing";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  request: requestRouter,
  donation: donationRouter,
  donation_to_request: donation_to_requestRouter,
  request_to_donation: requestsToDonationRouter,
  uploadthing: uploadthingRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
