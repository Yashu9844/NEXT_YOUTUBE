"use client"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { HistoryIcon, ListVideo, ListVideoIcon, ThumbsUpIcon } from "lucide-react"
import Link from "next/link"

const items = [
    {
      title: "History",
      url: "/playlist/history",
      icon: HistoryIcon,
      auth:true
    },
    {
      title: "Liked Videos",
      url: "/playlist/liked",
      icon: ThumbsUpIcon,
      auth:true
    },
    {
      title: "All playlists",
      url: "/playlists",
      icon: ListVideoIcon,
      auth:true
    },
   
  ]


export const PersonalSection =()=>{

    return (
        <SidebarGroup>
            <SidebarGroupLabel>You</SidebarGroupLabel>
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