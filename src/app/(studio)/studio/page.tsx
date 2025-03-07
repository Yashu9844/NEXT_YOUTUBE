import { HydrateClient, trpc } from "@/trpc/server";
import StudioView from "./ui/view/studio-view";

const Page =async () => {
 
 void trpc.studio.getMany.prefetchInfinite({limit: 5})
  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
};

export default Page;