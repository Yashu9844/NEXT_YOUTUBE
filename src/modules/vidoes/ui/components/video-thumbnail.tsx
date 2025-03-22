import Image from "next/image";


interface VideoThumbnailProps{
    imageUrl?: string | null;
    previewUrl?: string | null;
    title:string;
}

const VideoThumbnail = ({imageUrl,
    previewUrl,
    title,

}:VideoThumbnailProps) => {
  return (
    <div>
      <div className="relative group">
        <div className="relative aspect-video w-full rounded-xl overflow-hidden">
            <Image src={imageUrl ?? '/placeholder.svg'} alt="TRhumbanil" fill className="h-full w-full object-cover group-hover:opacity-0 " />
            <Image src={previewUrl ?? '/placeholder.svg'} alt="TRhumbanil" fill className="h-full w-full object-cover opacity-0 group-hover:opacity-100 " />
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;