'use client'

import {Button} from "@/components/ui/button";
import {useTheme} from "next-themes";
import {Moon, Sun} from "lucide-react";

const ThemeToggle = () => {
    const {resolvedTheme, setTheme} = useTheme();

    const themeToggle = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    }

    return (
        <Button
            variant="outline" size="icon"
            onClick={themeToggle}
        >
            {resolvedTheme === "dark" ? (
                <Sun/>
            ) : (
                <Moon/>
            )}
        </Button>
    )
}
export default ThemeToggle
