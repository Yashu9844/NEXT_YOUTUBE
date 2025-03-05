"use client"

import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react";
import FilterCarousel from "@/components/filter-carousel";


interface CategoriesSectionProps{
    categoryId?:string;
}


export const CategoriesSectionSuspense =({categoryId}:CategoriesSectionProps)=>{
  return(
    <Suspense fallback={<div>Loading...</div>}>
     <ErrorBoundary fallback={<div>Failed to load</div>}>
     <CategoriesSection categoryId={categoryId} />
     </ErrorBoundary>
    </Suspense>
  )
}


const CategoriesSection = ({categoryId}:CategoriesSectionProps) => {
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  
      const data = categories.map((category)=>(
        {
          value:category.id,
          label:category.name
        }
      ))

    return (
   <FilterCarousel  values={categoryId}  data={data} />
  );
};

