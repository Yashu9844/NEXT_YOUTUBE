"use client"
import ResponisveModal from "@/components/responisve-dialog";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

const StudioUploadModal = () => {
  const utils = trpc.useUtils()

  const create = trpc.videos.create.useMutation({
    onSuccess:()=>{
      toast.success("Video created successfully")
      utils.studio.getMany.invalidate()
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  });

  return (
  <>
      <ResponisveModal
      title="upload the video"
      open={!!create.data}
      onOpenChange={()=>create.reset()}
      
      >
        asdnansdl
      </ResponisveModal>


    <Button variant={"secondary"} onClick={()=>create.mutate()} disabled={create.isPending}>
{create.isPending?<Loader2Icon className="animate-spin"/>:<PlusIcon/>}
      Create
    </Button></>
  );
};

export default StudioUploadModal;