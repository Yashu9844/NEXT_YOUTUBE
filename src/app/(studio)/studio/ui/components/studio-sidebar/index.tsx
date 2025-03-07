import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { MainSection } from "./main-section"
import { Separator } from "@/components/ui/separator"
import { PersonalSection } from "./personnel-section"
import { LogOutIcon } from "lucide-react"
import Link from "next/link"

export const StudioSidebar=()=>{
    return(
        <Sidebar className="pt-16 z-40  " collapsible="icon">
            <SidebarContent className="bg-background">
                <MainSection/>
                <Separator/>
         <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                   <SidebarMenuButton tooltip={"Exit Studio"} asChild>
                   <Link href={"/"}>
                    <LogOutIcon className="size-5"/>
                      <span className="text-sm">Exit Studio</span>
                    </Link>
                   </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
         </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}