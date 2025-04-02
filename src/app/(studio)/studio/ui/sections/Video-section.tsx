"use client";

import InfinteScroll from "@/components/scroll-infinte";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { snakeCaseToTitle } from "@/lib/utils";
import VideoThumbnail from "@/modules/vidoes/ui/components/video-thumbnail";
import { trpc } from "@/trpc/client";
import { formatDate } from "date-fns";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const VideoSection = () => {
  return (
    <Suspense>
      <ErrorBoundary fallback={<p>Error..</p>}>
        <VideoSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

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
                  <TableCell className="w-[120px] text-left">{video.visibility}</TableCell>

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
