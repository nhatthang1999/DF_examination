'use client'

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export default function DarkLightTheme(){

    const { setTheme } = useTheme()

    const handlechange = (e:any) => {
        setTheme(e ? 'dark' : 'light')
    }

    return(
        <div className="flex justify-center align-center gap-x-3">
            <span className="text-base">Light</span>
            <Switch onCheckedChange={handlechange}/>
            <span className="text-base">Dark</span>
        </div>
    )
}