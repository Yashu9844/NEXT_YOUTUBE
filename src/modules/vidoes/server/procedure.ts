import { db } from "@/db";
import { videos, videoUpdateSchema } from "@/db/schema";
import { mux } from "@/lib/mux";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"; // Fixed typo
import { and, eq } from "drizzle-orm";



export const videosRouter = createTRPCRouter({


    update:protectedProcedure
    .input(videoUpdateSchema)
    .mutation(async({ctx,input})=>{
        const{id:userId} = ctx.user;

if(!input.id) {
    throw new Error("Video ID is required for update.");
}


    const [updatedVideo] = await db.update(videos).set({
        title:input.title,
        description:input.description,
        categoryId:input.categoryId,
        visibility:input.visibility,
          updatedAt:new Date(),


    }).where(and(
        eq(videos.id,input.id),
        eq(videos.userId,userId)
    ))
    .returning();

    if(!updatedVideo) {
        throw new Error("Video not found or you do not have permission to update it.");}
 

    }),
   



    create: protectedProcedure.mutation(async({ctx})=>{
        const {id:userId} = ctx.user
        

 const upload = await mux.video.uploads.create({
    new_asset_settings:{
        passthrough:userId,
        playback_policy:['public'],
        input:[
            {
                generated_subtitles:[
                    {
                        language_code:'en',
                        name:'English'
                    }
                ]
            }
        ]
        
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
