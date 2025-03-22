import Image from "next/image";


interface VideoThumbnailProps{
    imageUrl?: string | null;
}

const VideoThumbnail = ({imageUrl}:VideoThumbnailProps) => {
  return (
    <div>
      <div className="relative">
        <div className="relative aspect-video w-full rounded-xl overflow-hidden">
            <Image src={imageUrl ?? '/placeholder.svg'} alt="TRhumbanil" fill className="h-full w-full object-cover  " />
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;