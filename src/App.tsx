import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from 'uuid'

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

  let [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Reast API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false}
  ])

  const removeTask = (id: string) => setTasks(tasks.filter(task => task.id != id))

  const [filter, setFilter] = useState<FilterValuesType>('all')

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter)

  }
  let tasksForTodolist = tasks
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(task => !task.isDone)
  }

  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(task => task.isDone)
  }

  return (
    <div className="App">
      <TodoList
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
