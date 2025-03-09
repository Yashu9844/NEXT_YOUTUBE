import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

import { useEffect } from "react";
import { Button } from "./ui/button";

interface InfinteScrollProps {
    isManual?:boolean;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage:()=>void;
}

const InfinteScroll = (
    {isManual=false,hasNextPage,isFetchingNextPage,fetchNextPage}:InfinteScrollProps
) => {

   const {targetRef , isIntersecting} = useIntersectionObserver({
    threshold:0.5,
    rootMargin:"100px"
   })

   useEffect(()=>{
    if (!isManual && isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }

   },[hasNextPage,isIntersecting,isFetchingNextPage,isManual])

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <div ref={targetRef} className="h-1" />
      {hasNextPage ? (
        <Button
        variant={"secondary"}
        disabled={isFetchingNextPage || !hasNextPage}
        onClick={()=>fetchNextPage()}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground" >
            You have reached the end of the list
        </p>
      )}
    </div>
  );
};

export default InfinteScroll;