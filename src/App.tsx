import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from 'uuid'
import {TaskType} from "./components/Task/TaskList";
import {AddInputForm} from "./components/AddInputForm";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: TaskType[]
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


  const [tasksList, setTasksList] = useState<TasksStateType>({
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

  const removeTodolistHandler = (id: string) => {
    setTodoLists(todoLists.filter(todo => todo.id !== id))
    delete tasksList[id];
    setTasksList({...tasksList})
  }

  const removeTask = (id: string, todolistId: string) => {

    let tasks = tasksList[todolistId]
    tasksList[todolistId] = tasks.filter(t => t.id !== id)
    setTasksList({...tasksList})
  }
  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    const newTodoList = todoLists.map(todo => (
      todo.id === todolistId ? {...todo, filter} : todo
    ))
    setTodoLists(newTodoList)
  }

  const addTask = (title: string, todolistId: string) => {
    let newTaskTemplate = {id: v1(), title: title, isDone: false}
    let tasks = tasksList[todolistId]

    tasksList[todolistId] = Array(newTaskTemplate, ...tasks)
    setTasksList({...tasksList})
  }

  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    let tasks = tasksList[todolistId]
    let task = tasks.find(task => task.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasksList({...tasksList})
    }
  }

  const addTodoList = (title: string) => {

    let todoList: TodoListType = {
      id: v1(),
      filter: 'all',
      title: title,
    }
    setTodoLists([todoList, ...todoLists])
    setTasksList({...tasksList, [todoList.id]: []})

  }

  const changeTaskTitle  = (id:string, newTitle:string, todolistId: string) => {
    let tasks = tasksList[todolistId]
    let task = tasks.find(task => task.id === id)

    if (task) {
      task.title = newTitle
      setTasksList({...tasksList})
    }
  }
  const changeTodoListTitle = (todolistId: string, title:string) => {

    let newTodoLists = todoLists.map(todo => (todo.id === todolistId ? {...todo, title} : todo))
    setTodoLists([...newTodoLists])
  }

  return (
    <div className="App">

      <AddInputForm addItem={addTodoList}/>

      {todoLists.map((tl) => {
        let tasksForTodolist = tasksList[tl.id];
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
          removeTodolistHandler={removeTodolistHandler}
          changeTaskTitle={changeTaskTitle}
          changeTodoListTitle={changeTodoListTitle}
        />
      })}
    </div>
  );
}

export default App;
