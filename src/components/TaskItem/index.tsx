import { useAppDispatch, useAppSelector } from '../../hooksRedux.ts/hooksTypes';
import { Draggable } from 'react-beautiful-dnd';
import { useEffect, useState, useRef } from 'react';
import { taskModel } from '../model/task';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { changeDone, deleteTask, editTaskContent } from '../../reducers/todoReducer';
import "./styles.scss"

interface Props {
   task : taskModel,
   index : number
}

const TaskItem = ({task, index} : Props) => {
const {id, text, isDone} = task

const inputElem = useRef<HTMLInputElement>(null)
const [inputTask, setInputTask] = useState<string>("")
const [edit, setEdit] = useState<boolean>(false)

useEffect(() => {
   inputElem.current?.focus()}, [edit]
)

const dispatch = useAppDispatch();

const handleDone = (id : number) => {
   dispatch(changeDone(id))
}
const handleDelete = (id : number) => {
   dispatch(deleteTask(id))
}
const handleEdit = (isDone : boolean) => {
   if (!edit && !isDone) {
    setEdit(!edit)
   }
  }
const handleContent = (e :React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()
   dispatch(editTaskContent({id, inputTask}))
   setEdit(!edit)
}

    return (
      <Draggable draggableId={task.id.toString()} index={index}>
      { (provided, snapshot) => (
     <form className={`todoItem ${snapshot.isDragging ? 'drag' : ""}`} 
      onSubmit={handleContent}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}> 
         { edit ?
         <input
            ref={inputElem}
            className='todoItem__input'
            type="text" 
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
            /> :
         task.isDone ? 
          <span className="todoItem__p todoItem__p--done">{text}</span>
           :
         <span className="todoItem__p">{text}</span>
         }
      <div className="icons"> 
         <span className="icon"><AiFillEdit onClick={() => handleEdit(isDone)}/>  </span>
         <span className="icon"><AiFillDelete onClick={() => handleDelete(id)}/></span>
         <span className="icon"><MdDone onClick={() => handleDone(id)}/></span>
      </div> 
      </form>
      )}
      </Draggable>
    )
}

export default TaskItem;