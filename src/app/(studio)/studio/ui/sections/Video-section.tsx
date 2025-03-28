"use client"

import InfinteScroll from "@/components/scroll-infinte";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import VideoThumbnail from "@/modules/vidoes/ui/components/video-thumbnail";
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
          <Link href={`/studio/videos/${video.id}`} legacyBehavior>
              <TableRow
                key={video.id}
                className="cursor-pointer"
                onClick={() => window.location.href = `/studio/videos/${video.id}`}
              >
                <TableCell><div className="flex items-center gap-4">
                  <div className="relative w-36 shrink-0 aspect-video">
                    <VideoThumbnail imageUrl={video.thumbnailUrl} previewUrl={video.previewUrl} title={video.title} duration={video.duration || 0}/>
                  </div>
                  
                  </div></TableCell>
                <TableCell>visibility</TableCell>
                <TableCell>status</TableCell>
                <TableCell>datae</TableCell>
                <TableCell>views</TableCell>
                <TableCell>comments</TableCell>
                <TableCell>likes</TableCell>
              </TableRow></Link>
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