import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from 'uuid'

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {

  const todoListId1 = v1()
  const todoListId2 = v1()
  const todoListId3 = v1()

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'completed'},
    {id: todoListId3, title: 'What to read', filter: 'active'},
  ]);


  const [tasksObj, setTasksObj] = useState({
    [todoListId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Reast API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false}
    ],
    [todoListId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Bread", isDone: false},
      {id: v1(), title: "Eggs", isDone: true},
      {id: v1(), title: "Sugar", isDone: true},
    ],
    [todoListId3]: [
      {id: v1(), title: "Tolstoy", isDone: true},
      {id: v1(), title: "Agata", isDone: false},
      {id: v1(), title: "HAbr", isDone: false},
      {id: v1(), title: "Pikabu ", isDone: true},
    ],
  })

  const removeTask = (id: string, todolistId: string) => {

    let tasks = tasksObj[todolistId]
    tasksObj[todolistId] = tasks.filter(t => t.id !== id)
    setTasksObj({...tasksObj})
  }
  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    setTodoLists(todoLists.map(t => (t.id === todolistId ? {...t, filter} : t)))
  }

  const addTask = (title: string, todolistId: string) => {
    let newTaskTemplate = {id: v1(), title: title, isDone: false}
    let tasks = tasksObj[todolistId]

    tasksObj[todolistId] = Array(newTaskTemplate, ...tasks)
    setTasksObj({...tasksObj})
  }

  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(task => task.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasksObj({...tasksObj})
    }

  }

  return (
    <div className="App">
      {todoLists.map((tl) => {
        let tasksForTodolist = tasksObj[tl.id];
        if (tl.filter === 'active') {
          tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
        }

        if (tl.filter === 'completed') {
          tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
        }
        return <TodoList
          id={tl.id}
          title={tl.title}
          key={tl.id}
          tasks={tasksForTodolist}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask={addTask}
          changeTaskStatus={changeTaskStatus}
          filter={tl.filter}
        />
      })}
    </div>
  );
}

export default App;
