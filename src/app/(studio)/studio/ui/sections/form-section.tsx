"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { videoCreateSchema, videoUpdateSchema } from "@/db/schema";
import VideoPlayer from "@/modules/vidoes/ui/components/video-player";
import { trpc } from "@/trpc/client";
import { DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";


import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
const utils = trpc.useUtils();
const [video] = trpc.studio.getOne.useSuspenseQuery({id: videoId});
const [categories] = trpc.categories.getMany.useSuspenseQuery();
const update = trpc.videos.update.useMutation({
  onSuccess: () => {
    utils.studio.getMany.invalidate();
    utils.studio.getOne.invalidate({ id: videoId });
    toast.success("Video details updated successfully");
  },
  onError: (error) => {
    toast.error("Something went wrong");
  },
})

console.log(video);


const form = useForm<z.infer<typeof videoUpdateSchema>>({
  defaultValues:(video)



})
const onSubmit = (data:z.infer<typeof videoUpdateSchema>)=>{
  update.mutateAsync(data);
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
 <Button type="submit" disabled={update.isPending}>
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
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="span-y-8 lg:col-span-3">
        <FormField
        control={form.control}
        name="title"
        render={({field})=>(
         <FormItem>
          <FormLabel>Title</FormLabel>
        <FormControl >
          <Input {...field}
          placeholder="Add title to your video"/>
        </FormControl>
        <FormMessage/>
         </FormItem>
        )}
        />



<FormField
        control={form.control}
        name="description"
        render={({field})=>(
         <FormItem>
          <FormLabel>Description</FormLabel>
        <FormControl >
          <Textarea {...field}
          value={field.value ?? ""}
          placeholder="Add description to your video"
          rows={10}
          className="resize-none pr-10"
          />
        </FormControl>
        <FormMessage/>
         </FormItem>
        )}

        />



        <FormField
        control={form.control}
        name="categoryId"
        render={({field})=>(
         <FormItem>
          <FormLabel>Category</FormLabel>
       <Select
       onValueChange={field.onChange}
       defaultValue={field.value ?? undefined}
       >
       <FormControl >
         <SelectTrigger>
          <SelectValue  placeholder="Select the value" />
         </SelectTrigger>
         </FormControl> 
         <SelectContent>
         {categories.map((category)=>(
           <SelectItem key={category.id} value={category.id}>
           {category.name}
         </SelectItem>
         ))}
         </SelectContent>
       </Select>
        <FormMessage/>
         </FormItem>
        )}
        />
       
       
      </div>
      
 <div className="flex flex-col gap-y-8 lg:col-span-2">
  <div className="flex flex-col gap-4 bg-[#F9F9F9] rounded-xl overflow-hidden h-fit">
    <div className="assspect-video overflow-hidden relative">
      <VideoPlayer
      playbackId={video.muxPlaybackId}
      thumbnailUrl={video.thumbnailUrl}
      />
    </div>
  </div>
 </div>


    </div>
      </form>
    </Form>
  );
};

export default FormSection;