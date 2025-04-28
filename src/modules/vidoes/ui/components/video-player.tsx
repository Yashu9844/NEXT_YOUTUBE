interface VideoPlayerProps{
    playbackId?:string | null | undefined;
    thumbnailUrl?:string|null | undefined;
    autoPlay?:boolean;
    onPlay?:()=>void;
}



const VideoPlayer = ({playbackId,thumbnailUrl,autoPlay,onPlay}:VideoPlayerProps) => {

if(!playbackId){
    return null;
}
    
  return (
    <div>
      VideoPlayar
    </div>
  );
};

export default VideoPlayer;