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

  const changeFilter = (filter: FilterValuesType) => setFilter(filter)

  let tasksForTodolist = tasks
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(task => !task.isDone)
  }

  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(task => task.isDone)
  }

  const addTask = (title: string) => {
    let newTaskTemplate = {id: v1(), title: title, isDone: false}

    setTasks(Array(newTaskTemplate, ...tasksForTodolist))
  }

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const task = tasks.find(task => task.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasks(Array(...tasks))
  }

  return (
    <div className="App">
      <TodoList tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}
                changeTaskStatus={changeTaskStatus}/>
    </div>
  );
}

export default App;
