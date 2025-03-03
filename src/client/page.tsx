"use client"

import { trpc } from "@/trpc/client";

const PageClient = () => {
   
    const [data] = trpc.hello.useSuspenseQuery({text:"yrp"})

  return (
    <div>
       yes buddy {data.greeting}
    </div>
  );
};

export default PageClient;