"use client"

import InfinteScroll from "@/components/scroll-infinte";
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

 const [data,query] = trpc.studio.getMany.useSuspenseInfiniteQuery({limit:5},{
     getNextPageParam:(lastPage)=>lastPage.nextCursor,
 })

  return (
    <div>
      {JSON.stringify(data)}
      <InfinteScroll
      hasNextPage={query.hasNextPage}
      isFetchingNextPage={query.isFetchingNextPage}
      fetchNextPage={query.fetchNextPage}
      isManual
      
      
      />
    </div>
  );
};

export default VideoSectionSuspense;