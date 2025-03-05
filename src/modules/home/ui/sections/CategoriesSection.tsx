"use client"

import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react";
import FilterCarousel from "@/components/filter-carousel";
import { useRouter } from "next/navigation";


interface CategoriesSectionProps{
    categoryId?:string;
}


export const CategoriesSectionSuspense =({categoryId}:CategoriesSectionProps)=>{
  return(
    <Suspense fallback={<FilterCarousel isLoading={true} onSelect={()=>{}} data={[]} />}>
     <ErrorBoundary fallback={<div>Failed to load</div>}>
     <CategoriesSection categoryId={categoryId} />
     </ErrorBoundary>
    </Suspense>
  )
}


const CategoriesSection = ({categoryId}:CategoriesSectionProps) => {
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
   const router = useRouter();
      const data = categories.map((category)=>(
        {
          value:category.id,
          label:category.name
        }
      ))


    const onSelect = (value:string|null)=>{

       const url = new URL(window.location.href);

       if(value){
          url.searchParams.set('categoryId',value)
       }else{
          url.searchParams.delete('categoryId')
       }
       router.push(url.toString());

    }



    return (
   <FilterCarousel  onSelect={onSelect} values={categoryId}  data={data} />
  );
};

