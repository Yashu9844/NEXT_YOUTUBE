

import PageClient from "@/client/page";
import { HydrateClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

const Home = async () => {

  void trpc.hello.prefetch({text:"yrp"})
  return (
   <HydrateClient>
    <Suspense fallback="loading...">
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <PageClient/>
  </ErrorBoundary>
    </Suspense>
   </HydrateClient>
  );
};

export default Home;