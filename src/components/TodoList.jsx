import { useContext, useMemo, useRef } from 'react'
import TodoItem from './TodoItem.jsx'
import { todoContext } from '../todoContext.js'
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid'
import { SortableContext, useSortable } from '@dnd-kit/sortable';

export default function TodoList(){

    const [input, setInput]= useState("");
    const {todoList, setToDoList, darkMode, currentTask}= useContext(todoContext);


    const getFilteredTodos =(filter, list)=>{
        switch (filter){
            
            case "active": 
                return list.filter((e)=>e.completed===false); break;
            case "completed":
                return list.filter((e)=>e.completed===true); break;
            default :
             return list; break;    
        }
    }

    const filteredTodos= useMemo (()=>{

       return getFilteredTodos(currentTask, todoList);
    },[currentTask, todoList]);
    
    function addTask(e){

        e.preventDefault()

        if (input.trim()==="") return

        const newTask= {
            id: uuidv4(),
            task: input,
            completed: false
        }
        setToDoList((prevList)=>[...prevList, newTask]);
        setInput("");
    }

    return (
        <main className='flex flex-col gap-4'>
            <form className={`flex gap-4 items-center  py-4 px-6 rounded-md  ${darkMode? "bg-Very-Dark-Desaturated-Blue": "bg-white"}`} 
                  onSubmit={addTask}>
                    <div className='w-fit flex items-center'>
                        <div type='button' className={`rounded-full border-[1px]  w-6 h-6 ${darkMode ? "border-Darkest-Grayish-Blue": "border-Light-Grayish-Blue"}`}></div>
                    </div>
                <input className={`focus:outline-none placeholder:text-Dark-Grayish-Blue ${darkMode? "placeholder:text-Darker-Grayish-Blue text-Light-Grayish-Blue-dark" : "placeholder:text-Dark-Grayish-Blue text-Very-Dark-Blue"}`}
                       type="text" 
                       placeholder="Create new todo..."
                       value={input}
                       onChange={(e)=> setInput(e.target.value)}
                       aria-label='add a new to do'/>
            </form>
            <ul className={`rounded-t-md flex flex-col gap-3 pt-4 divide-y  ${darkMode? "bg-Very-Dark-Desaturated-Blue divide-Very-Dark-Grayish-Blue-dark": "bg-white divide-Light-Grayish-Blue-dark"}`}>
                <SortableContext items={todoList.map((item)=> item.id)}>
                    {
                        filteredTodos.length> 0 ?   
                        
                            (
                                filteredTodos.map((task, index)=>(
                                    
                                        <TodoItem key={task.id} item={task} />
                                )) 
                                
                                )
                        : (
                            <li className="text-center text-Dark-Grayish-Blue">No Tasks To Show</li>
                            )
                        }
                    </SortableContext>
                
            </ul>
        </main>
    )
}