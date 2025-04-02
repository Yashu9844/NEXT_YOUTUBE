import { formatDuration } from "@/lib/utils";
import Image from "next/image";


interface VideoThumbnailProps{
    imageUrl?: string | null;
    previewUrl?: string | null;
    duration:number | null;
    title:string;
}

const VideoThumbnail = ({imageUrl,
    previewUrl,
    title,
    duration

}:VideoThumbnailProps) => {
  return (
    <div>
      <div className="relative group">
        <div className="relative aspect-video w-full rounded-xl overflow-hidden">
            <Image src={imageUrl ?? '/placeholder.svg'} alt={title} fill className="h-full w-full object-cover group-hover:opacity-0 " />
            <Image 
            unoptimized={!!previewUrl}
            src={previewUrl ?? '/placeholder.svg'} alt={title} fill className="h-full w-full object-cover opacity-0 group-hover:opacity-100 " />
        </div>
<div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
{formatDuration(duration ?? 0)}</div>

      </div>
    </div>
  );
};

export default VideoThumbnail;