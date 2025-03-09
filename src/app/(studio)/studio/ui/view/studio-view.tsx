import VideoSection from "../sections/Video-section";

const StudioView = () => {
  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Channel Content</h1>
        <p className="text-sm text-muted-foreground">Manage your channel
          content</p>
      </div>
      <VideoSection/>
    </div>
  );
};

export default StudioView;