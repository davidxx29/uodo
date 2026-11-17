"use client"

import {
  LaptopIcon,
  Moon01Icon,
  Sun01Icon,
  SunMoonIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const themes = [
  { value: "light", label: "Light", icon: Sun01Icon },
  { value: "dark", label: "Dark", icon: Moon01Icon },
  { value: "system", label: "System", icon: LaptopIcon },
]

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme() 
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Change theme"
          />
        }
      >
        <HugeiconsIcon icon={SunMoonIcon} strokeWidth={2} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
        
          value={theme ?? "system"}
          onValueChange={(value: string) => setTheme(value)}
        >
          {themes.map(({ value, label, icon }) => (
            <DropdownMenuRadioItem className={cn("cursor-pointer", theme === value && "bg-primary text-primary-foreground")} key={value} value={value}>
              <HugeiconsIcon icon={icon} strokeWidth={2} />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}