"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form } from "@/components/ui/form";
import { videoCreateSchema, videoUpdateSchema } from "@/db/schema";
import { trpc } from "@/trpc/client";
import { DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormSectionProps {
  videoId: string;
}

export const FormSection =({videoId}:FormSectionProps)=>{


  return (
    <Suspense fallback={<FormSectionSkeleton />}>

      <ErrorBoundary fallback={<p>Error</p>}>
        <FormSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  )
}
const FormSectionSkeleton = () => {
  return (
    <div className="">returning..</div>
  )
}

const FormSectionSuspense = ({videoId}:FormSectionProps) => {

const [video] = trpc.studio.getOne.useSuspenseQuery({id: videoId});
console.log(video);


const form = useForm<z.infer<typeof videoUpdateSchema>>({
  defaultValues:(video)



})
const onSubmit =async (data:z.infer<typeof videoUpdateSchema>)=>{
  console.log(data)
}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
      <div className="flex items-center justify-between mb-6">
      <div className="">
        <h1 className="text-2xl font-bold">Video details</h1>
        <p className="text-sm text-muted-foreground">Manage your video details</p>
      </div>
      <div className="flex items-center gap-x-2">
 <Button type="submit" disabled={false}>
Save
 </Button>
 <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant={"ghost"} size={"icon"}>
        <MoreVerticalIcon/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" >
                 <DropdownMenuItem className="flex items-center gap-x-2 p-2 cursor-pointer">
                  <TrashIcon className="size-4 mr-2" />
                  Delete
                 </DropdownMenuItem>
    </DropdownMenuContent>
 </DropdownMenu>

      </div>
    </div>
      </form>
    </Form>
  );
};

export default FormSection;