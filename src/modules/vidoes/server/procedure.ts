import { db } from "@/db";
import { videos } from "@/db/schema";
import { mux } from "@/lib/mux";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"; // Fixed typo



export const videosRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async({ctx})=>{
        const {id:userId} = ctx.user
        

 const upload = await mux.video.uploads.create({
    new_asset_settings:{
        passthrough:userId,
        playback_policy:['public'],
        
    },
    cors_origin:'*' // set ypoui url in production
 })


        const [video] = await db.insert(videos).values(
            {
                userId,
                title:'Untitled',
                muxStatus:'waiting',
                muxUploadId:upload.id,
            }
        )

        .returning();

        return {
            video:video,
            url:upload.url
        }

    })
})
