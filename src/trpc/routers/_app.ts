import { z } from 'zod';
import {  createTRPCRouter, preotectedProcedure } from '../init';
export const appRouter = createTRPCRouter({
  hello: preotectedProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      console.log({dbUser:opts.ctx.user})
      return {
        greeting: `hello ${opts.input.text}`,
       
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;