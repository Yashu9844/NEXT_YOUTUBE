


import { db } from '@/db';
import { videos } from '@/db/schema';
import { mux } from '@/lib/mux';

import {
    VideoAssetCreatedWebhookEvent,
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
    }
return new Response('Webhook created successfully',{status:201})

};