import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import { taskModel } from "../components/model/task"

interface SliceState {
    taskList : taskModel[],
    edit : boolean,
    inProgress : taskModel[],
    doneTasks : taskModel[],
};

const initialState : SliceState = {
    taskList : [],
    edit : false,
    inProgress : [],
    doneTasks : [],
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers : {
        addTask : (state, action: PayloadAction<string>) => {
            const newTask = {
                id : Date.now(),
                text : action.payload,
                isDone : false
                }
            state.taskList.push(newTask)
        },
        changeDone : (state, action : PayloadAction<number>) => {
            let task = state.taskList.find((todo) => todo.id === action.payload);
            if (task){
            task.isDone = !task.isDone
            } else {
            task = state.inProgress.find((todo) => todo.id === action.payload);  
                if (task){
                    task.isDone = !task.isDone
                }                
            }
        },
        deleteTask : (state, action : PayloadAction<number>) => {
          let  foundItem = state.taskList.find((task) => task.id === action.payload)
            if (foundItem === undefined){
               foundItem = state.inProgress.find((task) => task.id === action.payload)
                if (foundItem === undefined){
                   state.doneTasks = state.doneTasks.filter((task) => task.id !== action.payload) 
                }
               state.inProgress = state.inProgress.filter((task) => task.id !== action.payload)
            } 
         state.taskList =  state.taskList.filter((task) => task.id !== action.payload)
     },
        editTaskContent : (state, action : PayloadAction<{id: number, inputTask : string}>) => {
            let task = state.taskList.find((todo) => todo.id === action.payload.id);
            if (task){
            task.text = action.payload.inputTask
            } else {
            task = state.inProgress.find((todo) => todo.id === action.payload.id);  
            if (task){
                task.text = action.payload.inputTask
            }
            }
        },
        handleDrag : (state, action: PayloadAction<{taskToDo : taskModel[], inProgress : taskModel[], doneTasks : taskModel[]}>) => {
            state.taskList = action.payload.taskToDo
            state.inProgress = action.payload.inProgress
            state.doneTasks = action.payload.doneTasks

        }
    }
})
export const {addTask, changeDone, deleteTask, editTaskContent, handleDrag} =  todoSlice.actions;

export default todoSlice; 