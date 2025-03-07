import { db } from "@/db";
import { videos } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"; // Fixed typo
import { and, desc, eq, lt, or } from "drizzle-orm";
import { z } from "zod";

export const studioRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.string().uuid(),
            updatedAt: z.string(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;
      const { id: userId } = ctx.user;

      const data = await db
        .select()
        .from(videos)
        .where(
          and(
            eq(videos.userId, userId),
            cursor
              ? or(
                  lt(videos.updatedAt, new Date(cursor.updatedAt)), // Convert string to Date
                  and(eq(videos.updatedAt, new Date(cursor.updatedAt)), lt(videos.id, cursor.id))
                )
              : undefined
          )
        )
        .orderBy(desc(videos.updatedAt), desc(videos.id))
        .limit(limit + 1); // Fixed syntax error

      const hasMore = data.length > limit;
      const items = hasMore ? data.slice(0, -1) : data; // Remove the extra item if pagination is required

const lastItem = items[items.length - 1]; // Get the last item
const nextCursor = hasMore ?
    {
        id:lastItem.id,
        updatedAt:lastItem.updatedAt.toISOString(),


    } : null;


      return { items, nextCursor }; // Return both items and pagination status
    }),
});
