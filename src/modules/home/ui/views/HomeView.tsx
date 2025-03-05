import { CategoriesSectionSuspense } from "../sections/CategoriesSection";


interface HomeViewProps{
    categoryId?:string;
}


const HomeView = ({categoryId}:HomeViewProps) => {


  return (
    <div  className="max-w-[2400px]  mx-auto flex flex-col gap-y-6 mb-10 px-4 pt-2.5">
      <CategoriesSectionSuspense categoryId={categoryId} />
    </div>
  );
};

export default HomeView;