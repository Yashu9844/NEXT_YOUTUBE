"use client"
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useEffect, useState } from "react";



interface FilterCarouselProps{
    values?:string;
    isLoading?:boolean;
    onSelect?:(value:string | null)=>void;
    data:{
        value:string;
        label:string;
    }[];

}


const FilterCarousel = ({
    values,
    isLoading,
    onSelect,
    data,
  }: FilterCarouselProps
) => {
  const [api,setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

    useEffect(()=>{
        if (!api) {
            return
          }
       
          setCount(api.scrollSnapList().length)
          setCurrent(api.selectedScrollSnap() + 1)

          api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
          })
    },[api])


  return (
    <div className="relative w-full">
        <div 
        className={cn('absolute left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none',
            current===1 && 'hidden'
        )}
        />
        <Carousel 
        opts={{
            dragFree: true,
            align:"start"
        }}
        className="w-full px-12"
        >
          <CarouselContent className="-ml-3">
          <CarouselItem className="pl-3 basis-auto">
            <Badge className="text-sm rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap " variant={values === null ? 'default':'secondary'}>
                All
            </Badge>
           </CarouselItem>
           {data.map((item)=>(
            <CarouselItem key={item.value} className="pl-3 basis-auto">
                  <Badge className="text-sm rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap " variant={values === item.value ? 'default':'secondary'}>
                {item.label}
            </Badge>
            </CarouselItem>
           ))}

          </CarouselContent>
            <CarouselPrevious className="left-0 z-20"/>
            <CarouselNext className="right-0 z-20"/>

        </Carousel>
        <div 
        className={cn('absolute right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none',
            current=== count && 'hidden'
        )}
        />
    </div>
  );
};

export default FilterCarousel;{
    
}