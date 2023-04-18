import { useAppDispatch, useAppSelector } from '../../hooksRedux.ts/hooksTypes';
import { Droppable } from 'react-beautiful-dnd';
import { taskModel } from '../model/task';
import TaskItem from '../TaskItem';

import "./styles.scss"

const TaskList = () => {

const tasks = useAppSelector((state) => state.todo.taskList)
const tasksInProgress = useAppSelector((state) => state.todo.inProgress)
const doneTasks = useAppSelector((state) => state.todo.doneTasks)

const dispatch = useAppDispatch();
console.log(tasks)
    return (
      <div className='container'> 
      <Droppable droppableId='TodosList' >
{(provided, snapshot) => (
  <div className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ""}`}
  ref={provided.innerRef}{...provided.droppableProps}>
         <span className="todos__headings">
          Tasks to do
        </span>
      { tasks.map((task : taskModel , index) => (
            <TaskItem 
            key={task.id}
            task={task}
            index={index}
            />
        ))
       }
              {provided.placeholder}
      </div>
)}
    </Droppable>
    <Droppable droppableId='TodosProgress' >
{(provided, snapshot) => (
  <div className={`todos progress ${snapshot.isDraggingOver ? 'dragprogress' : ""}`}
  ref={provided.innerRef}{...provided.droppableProps}>
             <span className="todos__headings">
          Tasks in progress
        </span>
      { tasksInProgress.map((task : taskModel , index) => (
            <TaskItem 
            key={task.id}
            task={task}
            index={index}
            />
        ))
       }
             {provided.placeholder}
      </div>
)}
    </Droppable>
    <Droppable droppableId='TodosRemove' >
      {(provided, snapshot) => (
      <div className={`todos remove ${snapshot.isDraggingOver ? 'dragcomplete' : "" }`}
      ref={provided.innerRef}{...provided.droppableProps}>
             <span className="todos__headings">
          Completed Tasks
        </span>
      { doneTasks.map((task : taskModel , index) => (
            <TaskItem 
            key={task.id}
            task={task}
            index={index}
            />
        ))
       }
              {provided.placeholder}
      </div>
       )}
    </Droppable>
       </div>
    )
}

export default TaskList;