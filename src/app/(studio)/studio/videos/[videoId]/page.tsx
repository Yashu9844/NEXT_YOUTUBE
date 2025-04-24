import { HydrateClient, trpc } from "@/trpc/server";

import VideoView from "../../ui/view/video-view";


export const dynamic = "force-dynamic"; // Force dynamic rendering for this page

interface PageProps{
    params:Promise<{videoId:string}>
}

const Page =async ({params}:PageProps) => {

 const {videoId} = await params;

   void trpc.studio.getOne.prefetch({id:videoId})

   
  return (
    <HydrateClient>
      <VideoView videoId={videoId} />
    </HydrateClient>
  );
};

export default Page;