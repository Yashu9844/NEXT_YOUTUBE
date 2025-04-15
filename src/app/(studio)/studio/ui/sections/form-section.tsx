"use client";

import { trpc } from "@/trpc/client";

interface FormSectionProps {
  videoId: string;
}

const FormSection = ({videoId}:FormSectionProps) => {

const [video] = trpc.studio.getOne.useSuspenseQuery({id: videoId});
console.log(video);


  return (
    <div>
      {JSON.stringify(video)}
    </div>
  );
};

export default FormSection;