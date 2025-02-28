"use client"

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useAuth } from "@clerk/clerk-react"
import { useClerk } from "@clerk/nextjs"
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react"
import Link from "next/link"




const items = [
    {
      title: "Home",
      url: "#",
      icon: HomeIcon,
    },
    {
      title: "Subsrciptions",
      url: "/feed/subscriptions",
      icon: PlaySquareIcon,
      auth:true
    },
    {
      title: "Trending",
      url: "/feed/tranding",
      icon: FlameIcon,
    },
   
  ]

  

export const MainSection =()=>{

  const {userId,isSignedIn} = useAuth()
  const clerk = useClerk()

    return (
      <SidebarGroup>
         <SidebarGroupContent>
            <SidebarMenu>
                {items.map((items)=>(
                    <SidebarMenuItem key={items.title}>
                        <SidebarMenuButton
                        tooltip={items.title}
                        asChild
                        isActive={false}
                        onClick={(e)=>{
                          if(!isSignedIn && items.auth){
                            e.preventDefault();
                            return clerk.openSignIn();
                          }
                        }}
                        
                        >
                      <Link href={items.url} className="flex items-center gap-4">
                      <items.icon/>
                      <span>{items.title}</span>
                      </Link>

                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
         </SidebarGroupContent>
      </SidebarGroup>
    )
}