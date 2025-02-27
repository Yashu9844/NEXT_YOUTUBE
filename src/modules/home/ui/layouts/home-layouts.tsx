import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeNavBar } from "../components/home-navbar";


interface LayoutProps{
    children:React.ReactNode;
}


export const HomeLayout = ({ children }: LayoutProps) => {
    return (
      <SidebarProvider>

        <div className="p-4 bg-blue-500 w-full">
         <HomeNavBar/>
        <div className="">
        {children}
        </div>
        </div>
       

      </SidebarProvider>
    );
  };

