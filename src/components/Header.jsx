import { useContext } from "react"
import { todoContext } from "../todoContext"

export default function Header(){

    const{darkMode, setDarkMode}= useContext(todoContext);
    return (
        <header className="flex justify-between items-center mb-10">
            <h1 className="tracking-[12px] text-white font-bold text-3xl">TODO</h1>
            <button className="cursor-pointer" 
                onClick={()=>setDarkMode((previous)=>!previous)}
                aria-label="switch theme to dark or light">
                <img className="w-7 h-7" src={` ${darkMode? "/images/icon-sun.svg": "/images/icon-moon.svg"}`} alt="theme switcher" />
            </button>
        </header>
    )
}