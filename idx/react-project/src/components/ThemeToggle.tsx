import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = "light" | "dark"

interface Props {
    className: string
}

const ThemeToggle:React.FC<Props> = ({className}) => {

    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem("theme") as Theme);
    });

    const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const root = document.documentElement;


    useEffect(() => {       

        // Remove old classes
        root.classList.remove("light", "dark");

        switch (theme) {
            case "light":
                root.classList.add("light");
                localStorage.setItem("theme", "light");
                break;

            case "dark":
                root.classList.add("dark");
                localStorage.setItem("theme", "dark");
                break;

            default:
                // System
                localStorage.setItem("theme", "system");
                break;
        }
    }, [theme]);
    useEffect(()=>{
        if(systemDarkMode){
            setTheme("dark");
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }else{
            root.classList.add("light");
            localStorage.setItem("theme", "light");
        }
    },[])
    
    const nextTheme = () => {
        setTheme((current) => {            
            if (current === "light") {
                return "dark";
            }else{return "light"};
            ;
        });
    };
    return (
        <button
           onClick={nextTheme}
            aria-label='Toggle Theme'
            className={`relative flex h-10 w-20 items-center rounded-full bg-slate-200 p-1 transition-colors duration-300 dark:bg-slate-700 ${className}`}
        >
            <Sun size={18} className='ml-1 text-yellow-500' />
            <Moon size={18} className='text-slate-700 right-2.5 absolute' />
            <span
                className={`absolute left-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300
        ${theme ==="dark" ? "translate-x-10" : "translate-x-0"}`}
            >
                {theme ==="dark" ? (
                    <Moon size={16} className="text-slate-700" />
                ) : (
                    <Sun size={16} className="text-yellow-500" />
                )}
            </span>
        </button>
    )
}

export default ThemeToggle
