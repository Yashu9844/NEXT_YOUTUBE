"use client"

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react"
import Link from "next/link"
import { title } from "process"



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
                        onClick={()=>{}}
                        
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