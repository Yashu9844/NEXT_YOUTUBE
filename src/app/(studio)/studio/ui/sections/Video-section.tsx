"use client"

import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";


export const VideoSection = () => {
  return(
    <Suspense>
      <ErrorBoundary fallback={<p>Error..</p>}>
      <VideoSectionSuspense/></ErrorBoundary>
    </Suspense>
  )
}


const VideoSectionSuspense = () => {

 const [data] = trpc.studio.getMany.useSuspenseInfiniteQuery({limit:5},{
     getNextPageParam:(lastPage)=>lastPage.nextCursor,
 })

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
};

export default VideoSectionSuspense;