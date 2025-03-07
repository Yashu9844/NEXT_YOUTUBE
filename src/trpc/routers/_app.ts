
import { categoriesRouter } from '@/modules/categories/server/procedures';
import {  createTRPCRouter } from '../init';
import { studioRouter } from '@/app/(studio)/studio/server/procedures';
import { videosRouter } from '@/modules/vidoes/server/procedure';
export const appRouter = createTRPCRouter({
   videos:videosRouter,
   studio:studioRouter,
   categories:categoriesRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;