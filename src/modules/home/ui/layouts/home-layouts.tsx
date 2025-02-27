import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeNavBar } from "../components/home-navbar";
import { HomeSidebar } from "../components/home-sidebar";


interface LayoutProps{
    children:React.ReactNode;
}


export const HomeLayout = ({ children }: LayoutProps) => {
    return (
      <SidebarProvider>

        <div className="p-4 w-full">
         <HomeNavBar/>
        <div className="flex min-h-screen pt-[4rem]">
          <HomeSidebar/>
<main className="flex-1 overflow-y-auto"> {children}</main>

        </div>
        </div>
       

      </SidebarProvider>
    );
  };

