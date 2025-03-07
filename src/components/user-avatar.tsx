import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cva, VariantProps } from "class-variance-authority";

const avatarVariants = cva("", {
  variants: {
    size: {
      default: "h-9 w-9",
      xs: "h-4 w-4",
      sm: "h-6 w-6",
      lg: "h-12 w-12",
      xl: "h-[160px] w-[160px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});


interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
    imageUrl: string;
    name: string;
    className?: string;
    onClick?:()=>void;
}


export const UserAvatar = ({
    className,
    imageUrl,
    name,
    onClick,
  size,
}:UserAvatarProps)=>{

return(
    <Avatar className={cn(avatarVariants({size,className}))   } onClick={onClick}>
        <AvatarImage src={imageUrl} alt={name}/>
    </Avatar>
)

}
