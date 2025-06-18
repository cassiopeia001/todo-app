import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import TodoList from './components/TodoList'
import Footer from './components/Footer.jsx'
import { todoContext } from './todoContext.js'
import {v4 as uuidv4} from 'uuid'
import { DndContext } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

function App() {
  
  const [darkMode, setDarkMode]= useState(false);
  const [todoList, setToDoList]= useState([
    {
      id: uuidv4(),
      task: 'Complete online Javascript course',
      completed : true
    },
     {
      id: uuidv4(),
      task: 'Jog around the park',
      completed : false
    }, 
     {
      id: uuidv4(),
      task: '10 minutes meditation',
      completed : false
    }, 
     {
      id: uuidv4(),
      task: 'Read for one hour',
      completed : false
    }, 
     {
      id: uuidv4(),
      task: 'Pick up groceries',
      completed : false
    }, 
     {
      id: uuidv4(),
      task: 'Complete todo app on Frontend Mentor',
      completed : false
    }
  ]);
  const[currentTask, setCurrentTask]= useState('all');

  const handleOnDragEnd =(e) =>{
    if (!e.over) return
    
    if (e.active.id != e.over.id){

      setToDoList((todoList)=>{

        const oldIndex= todoList.findIndex(item=> item.id===e.active.id);
        const newIndex= todoList.findIndex(item=> item.id=== e.over.id)
        return arrayMove(todoList, oldIndex, newIndex)
      });
    }
  }
  const defaultAnnouncements = {
    onDragStart({active}) {
      return `Picked up a todo item ${active.id}.`;
    },
    onDragOver({active, over}) {
      if (over) {
        return `Todo item ${active.id} was moved over droppable area ${over.id}.`;
      }

      return `Todo item ${active.id} is no longer over a droppable area.`;
    },
    onDragEnd({active, over}) {
      if (over) {
        return `Todo item ${active.id} was dropped over droppable area ${over.id}`;
      }

      return `Todo item ${active.id} was dropped.`;
    },
    onDragCancel({active}) {
      return `Dragging was cancelled. Todo item ${active.id} was dropped.`;
    },
}


  return (
    <DndContext onDragEnd={handleOnDragEnd} accessibility={defaultAnnouncements}>
      <div className={`min-h-screen w-full overflow-x-hidden relative z-0 font-josefin text-lg ${darkMode ? "bg-Very-Dark-Blue": "bg-Very-Light-Gray"}`}>
        <picture className='block h-[40%] w-full -z-10 absolute inset-0'>
          <source media="(min-width: 640px)" srcSet={`${darkMode? "/images/bg-desktop-dark.jpg": "/images/bg-desktop-light.jpg"}`}/>
          <source media="(max-width: 640px)" srcSet={`${darkMode? "/images/bg-mobile-dark.jpg": "/images/bg-mobile-light.jpg"}`}/>
          <img className='w-full h-full object-cover' src="/todo-app/images/bg-desktop-light.jpg" alt="background image" />
        </picture>
        <div className='h-full w-full flex flex-col items-center justify-center px-5 z-50'>
          <div className='w-full flex flex-col  py-10 md:w-[90%] lg:w-2/3 xl:w-1/2'>
            <todoContext.Provider value= {{darkMode, setDarkMode, todoList, setToDoList, currentTask, setCurrentTask}}>
              <Header />
              <TodoList />
              <Footer />
              <p className={`text-center mt-10 text-base ${darkMode ? "text-Darker-Grayish-Blue": "text-Dark-Grayish-Blue "}`}>Drag and drop to reorder list</p>
            </todoContext.Provider>
          </div>
        </div>
      </div>
    </DndContext>
  )
}

export default App
