


import { db } from '@/db';
import { videos } from '@/db/schema';
import { mux } from '@/lib/mux';

import {
    VideoAssetCreatedWebhookEvent,
    VideoAssetDeletedWebhookEvent,
    VideoAssetErroredWebhookEvent,
    VideoAssetReadyWebhookEvent,
    VideoAssetTrackReadyWebhookEvent
} from '@mux/mux-node/resources/webhooks'
import { eq } from 'drizzle-orm';

import { headers } from 'next/headers';



const SIGNIN_SECRET =process.env.MUX_WEBHOOK_SECRET;

type WebhookEvent = 
    | VideoAssetCreatedWebhookEvent
    | VideoAssetReadyWebhookEvent
    | VideoAssetErroredWebhookEvent
    | VideoAssetTrackReadyWebhookEvent
    |VideoAssetDeletedWebhookEvent


export const POST = async(request:Request)=>{
    console.log("SIGNIN_SECRET:", process.env.MUX_WEBHOOK_SECRET);

    console.log("Webhook received!");
   if(!SIGNIN_SECRET){
    throw new Error('sign in screat not found');
   }

   const headerPayload = await headers();
   const muxSignature = headerPayload.get('mux-signature');


    if(!muxSignature){
        return new Response('No signatature is found ' ,{status:401});
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    mux.webhooks.verifySignature(
        body,{
            "mux-signature":muxSignature
        },
        SIGNIN_SECRET,
    )

    switch(payload.type as WebhookEvent['type']){
        case "video.asset.created":{

            const data = payload.data as VideoAssetCreatedWebhookEvent['data'];

            if(!data.upload_id){
                return new Response('No upload id found',{status:400});
            }

            await db
            .update(videos)
            .set({
                muxAssetId: data.id,
                muxStatus: data.status
            })
            .where(eq(videos.muxUploadId, data.upload_id));
            break;
        }
           
        case "video.asset.ready" : {
            const data = payload.data as VideoAssetReadyWebhookEvent['data'];

            const playbackId = data.playback_ids?.[0].id;

            if(!data.upload_id){
                return new Response('No upload id found',{status:400});
            }
            if(!playbackId){
                return new Response('No playback id found',{status:400});
            }

            const thumbnailUrl = `http://image.mux.com/${playbackId}/thumbnail.jpg`;
            const previewUrl = `http://image.mux.com/${playbackId}/animated.gif`;
             const duration = data.duration ? Math.round(data.duration * 1000) : 0
            await db
            .update(videos)
            .set({
                muxAssetId: data.id,
                muxStatus: data.status,
                muxPlaybackId: playbackId,
                thumbnailUrl,
                previewUrl,
                duration

            })
            .where(eq(videos.muxUploadId,data.upload_id))
           break; 
        }

        case  "video.asset.errored": {

            const data = payload.data as VideoAssetErroredWebhookEvent['data'];

            if(!data.upload_id){
                return new Response('No upload id found',{status:400});
            }

            await db
            .update(videos)
            .set({
                muxStatus: data.status
            })
            .where(eq(videos.muxUploadId,data.upload_id));
            break;
        }



        case "video.asset.deleted":{

           const data = payload.data as VideoAssetDeletedWebhookEvent['data'];

           if(!data.upload_id){
            return new Response('No upload id found',{status:400});
           }
         console.log('deleted video');
           await db.delete(videos).where(eq(videos.muxUploadId,data.upload_id));
       break;
        }
       

        case "video.asset.track.ready": {

        const data = payload.data as VideoAssetTrackReadyWebhookEvent['data'] & {
             asset_id : string;
        };

        if(!data.asset_id){
                return new Response('No asset id found',{status:400});
    
        }
 
        const status = data.status;
        const trackId = data.id;
        const assestId = data.asset_id;

        await db.update(videos).set({
            muxTrackId: trackId,
            muxTrackStatus: status
        })
        .where(eq(videos.muxAssetId,assestId));
               console.log("done reading");
        break;

        }
    }
return new Response('Webhook created successfully',{status:201})

};