


import HomeView from "@/modules/home/ui/views/HomeView";
import { HydrateClient, trpc } from "@/trpc/server";
 
interface PageProps{
  searchParams:Promise<{
    categoryId?:string;
  }>
}

export const dynamic = 'force-dynamic'
const Home = async ({searchParams}:PageProps) => {

  const {categoryId} = await searchParams;

  void trpc.categories.getMany.prefetch()
  return (
   <HydrateClient>
   <HomeView  categoryId={categoryId} />
   </HydrateClient>
  );
};

export default Home;