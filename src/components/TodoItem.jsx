import { useContext } from "react";
import { todoContext } from '../todoContext.js';
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

export default function TodoItem({item}){

    const {todoList, setToDoList, darkMode}= useContext(todoContext);
    const{attributes, listeners, setNodeRef, transform, transition}= useSortable({id: item.id});
    const style= {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const deleteTask = () => {

        const modifiedArray= todoList.filter((element)=> element.id !=item.id)
        setToDoList(modifiedArray)
    }
    const completeTask= ()=>{

        const modifiedArray= todoList.map((element)=>{

            if (element.id=== item.id){
                return {...element, completed: !element.completed}
            }
            return element
        })
        setToDoList(modifiedArray);
        
    }

    return(
        <li key={item.id} 
            ref={setNodeRef} 
            style={style} 
            className='pb-3 cursor-pointer'>
            <div className="flex justify-between items-center gap-1 px-6 min-w-0">
                <div className="flex gap-4 min-w-0">
                    <button className={`flex items-center justify-center shrink-0 rounded-full border-[1px]  w-6 h-6 cursor-pointer hover:border-gradient-from ${item.completed ? "bg-gradient-to-r from-gradient-from to-gradient-to border-none" : "bg-none" } ${darkMode ? "border-Darkest-Grayish-Blue": "border-Light-Grayish-Blue"}`}
                            onClick={completeTask}
                            aria-label={item.completed? "Mark as incomplete": "Mark as complete"}
                            aria-pressed={item.completed}>
                            
                        { item.completed && <img className="z-20" src="/images/icon-check.svg" alt="check button"/>}
                            
                    </button>
                    <p className={`break-words whitespace-normal min-w-0 w-full  ${item.completed ?  darkMode? "line-through text-Very-Dark-Grayish-Blue": "line-through text-Light-Grayish-Blue": darkMode? " text-Light-Grayish-Blue-dark": "text-Very-Dark-Grayish-Blue"} `}
                        {...attributes} 
                        {...listeners} >{item.task}</p>
                </div>
                <button className="cursor-pointer shrink-0"
                        onClick={deleteTask}
                        aria-label="delete todo from the list">
                    <img src="/images/icon-cross.svg" alt="delete button" />
                </button>
            </div>
        </li>
    )
}