import Image from "next/image";
import {UserAvatar, UserButton, UserProfile } from "@clerk/nextjs";
import ThemeToggle from "@/components/ui/Themetoggle";

export default function Home() {
  return (
    <div >
      <UserButton />
      <ThemeToggle />
    </div>    
  )
}
