"use client"

import InfinteScroll from "@/components/scroll-infinte";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { trpc } from "@/trpc/client";
import Link from "next/link";
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

 const [videos,query] = trpc.studio.getMany.useSuspenseInfiniteQuery({limit:5},{
     getNextPageParam:(lastPage)=>lastPage.nextCursor,
 })

  return (
    <div>
     <div className="border-y">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-6 w-[510px]">Video</TableHead>
            <TableHead >Visibility</TableHead>
            <TableHead >Status</TableHead>
            <TableHead >Date</TableHead>
            <TableHead  className="text-right">Views</TableHead>
            <TableHead className="text-right" >Contents</TableHead>
            <TableHead className="text-right pr-6" >Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {videos?.pages.flatMap((page) => page.items).map((video) => (
              <TableRow
                key={video.id}
                className="cursor-pointer"
                onClick={() => window.location.href = `/studio/videos/${video.id}`}
              >
                <TableCell>{video.title}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
     </div>
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