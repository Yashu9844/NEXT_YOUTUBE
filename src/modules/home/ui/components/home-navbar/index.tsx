import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import SearchInput from "./SearchInput"
import { AuthButton } from "../../auth/ui/component/auth-button"

export const HomeNavBar =()=>{
    return (
       <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50">

      <div className="flex gap-4 items-center w-full ">

        
        <div className="flex items-center flex-shrink-0 ">
            <SidebarTrigger/>
            <Link href={'/'}>
             <div className="flex  gap-1 items-center p-4">
                <Image  src={"you.svg"} height={32} width={32}  alt="logo"/>
                <p className="text-xl font-semibold tracking-tight">NewTube</p>
             </div>
            
            </Link>
        </div>

 {/* Search Bar */}
 
  <div className="flex-1 flex justify-center max-w-[720px] mx-auto ">
    <SearchInput/>
  </div>

  <div className="flex-shrink-0 items-center flex  gap-4">
    <AuthButton/>
  </div>


      </div>


       </nav>
    )
}