import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {

  let [tasks, setTasks] = useState([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false},
    {id: 4, title: "Rest API", isDone: false},
    {id: 5, title: "GraphQL", isDone: false}
  ])

  const removeTask = (id: number) => setTasks(tasks.filter(task => task.id != id))

  const [filter, setFilter] = useState<FilterValuesType>('All')

  const changeFilter = (filter: FilterValuesType) => setFilter(filter)

  if (filter === 'Active') {
    tasks = tasks.filter(task => !task.isDone)
  }

  if (filter === 'Completed') {
    tasks = tasks.filter(task => task.isDone)
  }

  return (
    <div className="App">
      <TodoList
        tasks={tasks}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
