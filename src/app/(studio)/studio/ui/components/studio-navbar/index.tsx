import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

import { AuthButton } from "@/modules/home/ui/auth/ui/component/auth-button"


export const StudioNavBar =()=>{
    return (
       <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50 border-b shadow-md">

      <div className="flex gap-4 items-center w-full ">

        
        <div className="flex items-center flex-shrink-0 ">
            <SidebarTrigger/>
            <Link href={'/studio'}>
             <div className="flex  gap-1 items-center p-4">
                <Image  src={"you.svg"} height={32} width={32}  alt="logo"/>
                <p className="text-xl font-semibold tracking-tight">Studio</p>
             </div>
            
            </Link>
        </div>

 <div className="flex-1"/>
  

  <div className="flex-shrink-0 items-center flex  gap-4">
    <AuthButton/>
  </div>


      </div>


       </nav>
    )
}