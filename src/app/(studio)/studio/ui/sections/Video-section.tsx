"use client";

import InfinteScroll from "@/components/scroll-infinte";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { snakeCaseToTitle } from "@/lib/utils";
import VideoThumbnail from "@/modules/vidoes/ui/components/video-thumbnail";
import { trpc } from "@/trpc/client";
import { formatDate } from "date-fns";
import { Globe2Icon, LockIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const VideoSection = () => {
  return (
    <Suspense fallback={<VideoSectionSkeleton/>}>
      <ErrorBoundary fallback={<p> Error</p>} >
        <VideoSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const VideoSectionSkeleton=()=>{
  return (
  
            <div className="border-y">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-6 w-[510px]">Video</TableHead>
            <TableHead className="w-[120px] text-left">Visibility</TableHead>
            <TableHead className="w-[120px] text-left">Status</TableHead>
            <TableHead className="w-[150px] text-left">Date</TableHead>
            <TableHead className="w-[100px] text-right">Views</TableHead>
            <TableHead className="w-[120px] text-right">Comments</TableHead>
            <TableHead className="w-[100px] text-right pr-6">Likes</TableHead>
          </TableRow>
        </TableHeader>

<TableBody>
    {Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={index}>
        <TableCell className="pl-6">
         <div className="flex items-center gap-4">
         <Skeleton className="h-36 w-36" />
         <div className="h-20 w-36">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[150px]" />
         </div>
         </div>
        </TableCell>
      </TableRow>
    ))}

</TableBody>
      </Table>
    </div>

  )
}


const VideoSectionSuspense = () => {
  const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery({ limit: 5 }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });


  return (
    <div>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Video</TableHead>
              <TableHead className="w-[120px] text-left">Visibility</TableHead>
              <TableHead className="w-[120px] text-left">Status</TableHead>
              <TableHead className="w-[150px] text-left">Date</TableHead>
              <TableHead className="w-[100px] text-right">Views</TableHead>
              <TableHead className="w-[120px] text-right">Comments</TableHead>
              <TableHead className="w-[100px] text-right pr-6">Likes</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {videos?.pages.flatMap((page) => page.items).map((video) => (
              <Link href={`/studio/videos/${video.id}`} legacyBehavior key={video.id}>
                <TableRow
                  className="cursor-pointer"
                  onClick={() => window.location.href = `/studio/videos/${video.id}`}
                >
                  {/* Video Thumbnail + Title */}
                  <TableCell className="pl-6 w-[510px]">
                    <div className="flex items-center gap-4">
                      <div className="relative w-36 shrink-0 aspect-video">
                        <VideoThumbnail 
                          imageUrl={video.thumbnailUrl} 
                          previewUrl={video.previewUrl} 
                          title={video.title} 
                          duration={video.duration || 0} 
                        />
                      </div>
                      <div className="flex flex-col gap-y-1 overflow-hidden">
                        <span className="text-sm line-clamp-1">{video.title}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1">{video.description || "No description"}</span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Visibility */}
                  <TableCell className="w-[120px] text-left ">
                 <div className="flex items-center">
                 {
                      video.visibility === 'private' ? (
                        <LockIcon className="size-4 mr-2"/>
                      ) : (
                        <Globe2Icon className="size-4 mr-2"/>
                      )
                    }
                    
                    
                    {snakeCaseToTitle(video.visibility)}</div></TableCell>

                  {/* Status */}
                  <TableCell className="w-[120px] text-left">
                    <div className="flex items-center">
                      <span className="text-xs line-clamp-1">{snakeCaseToTitle(video.muxStatus || 'error')}</span>
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="w-[150px] truncate overflow-hidden text-ellipsis whitespace-nowrap text-left">
                    {formatDate(new Date(video.createdAt), 'd MMM yyyy')}
                  </TableCell>

                  {/* Views */}
                  <TableCell className="w-[100px] text-right">views</TableCell>

                  {/* Comments */}
                  <TableCell className="w-[120px] text-right">comments</TableCell>

                  {/* Likes */}
                  <TableCell className="w-[100px] text-right pr-6">likes</TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Infinite Scroll */}
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
