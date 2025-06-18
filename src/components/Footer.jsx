import { useContext } from "react"
import { todoContext } from "../todoContext"

export default function Footer(){

    const {currentTask, setCurrentTask, todoList, setToDoList, darkMode}= useContext(todoContext);

    const activeTasks= todoList.filter((e)=>e.completed===false);
    const numberOfItemsLeft= activeTasks.length;

    const handleClick= (e)=>{
        
        setCurrentTask(e.target.innerText.toLowerCase())
    }
    const clearCompletedTasks= () => {

        const tempArray= todoList.filter((e)=> e.completed===false)
        setToDoList(tempArray);
    }

    return (
        <footer className={`grid grid-cols-2 grid-rows-2 gap-y-3 md:grid-cols-3 md:grid-rows-1 border-t-[1px] ${darkMode ? "border-t-Very-Dark-Grayish-Blue-dark text-Darker-Grayish-Blue" : "border-t-Light-Grayish-Blue-dark text-Dark-Grayish-Blue "}`}>
            <div className={`row-start-1 col-start-1 rounded-bl-md pl-6 py-3 ${darkMode? "bg-Very-Dark-Desaturated-Blue": "bg-white"}`}>
                <p className="text-base">{numberOfItemsLeft} items left</p>
            </div>
            <div className={`row-start-2 col-start-1 col-span-2 flex items-center justify-center gap-5 rounded-md py-3 font-bold md:row-start-1 md:col-start-2 md:col-span-1 md:pt-3 md:py-0 md:pb-3 md:rounded-none ${darkMode? "bg-Very-Dark-Desaturated-Blue": "bg-white"}`}>

                <button className={`cursor-pointer ${darkMode ? "hover:text-Light-Grayish-Blue-dark" :"hover:text-Very-Dark-Grayish-Blue"} ${currentTask==='all'? "text-bright-blue":""}`}
                        onClick={handleClick}
                        role="tab"
                        aria-selected={currentTask==='all'}>All</button>
                <button className={`cursor-pointer ${darkMode ? "hover:text-Light-Grayish-Blue-dark" :"hover:text-Very-Dark-Grayish-Blue"} ${currentTask==='active'? "text-bright-blue":""}`}
                        onClick={handleClick}
                        role="tab"
                        aria-selected={currentTask==='active'}>Active</button>
                <button className={`cursor-pointer ${darkMode ? "hover:text-Light-Grayish-Blue-dark" :"hover:text-Very-Dark-Grayish-Blue"} ${currentTask==='completed'? "text-bright-blue":""}`}
                        onClick={handleClick}
                        role="tab"
                        aria-selected={currentTask==='completed'}>Completed</button>
            </div>
            <div className={`row-start-1 col-start-2 text-end rounded-br-md pr-6 py-3 md:row-start-1 md:col-start-3 ${darkMode? "bg-Very-Dark-Desaturated-Blue": "bg-white"}`}>
                <button className={`cursor-pointer text-base ${darkMode ? "hover:text-Light-Grayish-Blue-dark" :"hover:text-Very-Dark-Grayish-Blue"}`}
                        onClick={clearCompletedTasks}
                        aria-label="clear compelted todos">Clear Completed</button>
            </div>
        </footer>
    )
}