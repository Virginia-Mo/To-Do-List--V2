import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import InputField from '../InputField';
import TaskList from '../TaskList';
import { handleDrag } from '../../reducers/todoReducer';
// import { OnDragEnd } from '../../selectors/dragndrop';
import './styles.scss';
import { useAppDispatch, useAppSelector } from '../../hooksRedux.ts/hooksTypes';



function App() {
  const dispatch = useAppDispatch()
  const taskToDo = useAppSelector((state) => state.todo.taskList)
  const inProgress = useAppSelector((state) => state.todo.inProgress)
  const doneTasks = useAppSelector((state) => state.todo.doneTasks)

  const onDragEnd = (result: DropResult) => {
    const {source, destination } = result;

    if (!destination) {
      return
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }
   let addItem;
   let active = [...taskToDo];
   let progress = [...inProgress];
   let complete = [...doneTasks];
  
   if (source.droppableId === "TodosList") {
     addItem = active[source.index];
     active.splice(source.index, 1);
   } else if (source.droppableId === "TodosProgress") {
     addItem = progress[source.index];
     progress.splice(source.index, 1);
   } else {
     addItem = complete[source.index];
    complete.splice(source.index, 1);
   }
  
   if (destination.droppableId === "TodosList") {
    active.splice(destination.index, 0, {...addItem, isDone: false});
  } else if (destination.droppableId === "TodosProgress") {
    progress.splice(destination.index, 0, {...addItem, isDone: false});
  }else {
    complete.splice(destination.index, 0, {...addItem, isDone: true});
  } 
   dispatch(handleDrag({taskToDo: active, inProgress : progress, doneTasks: complete}))

  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
        <h1>My To do list</h1>
        <InputField />
        <TaskList />
    </div>
    </DragDropContext>
  );
}

export default App;
