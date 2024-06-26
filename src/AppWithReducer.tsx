import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from 'uuid'
import {TaskType} from "./components/Task/TaskList";
import {AddInputForm} from "./components/AddInputForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {MenuOutlined} from "@mui/icons-material";
import {
  addTodoListAC,
  changeTodoLisFilterAC, changeTodoListTitleAC,
  removeTodolistAC,
  TodoListActionsType,
  todolistsReducer
} from "./model/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TasksActionsType,
  tasksReducer
} from "./model/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: TaskType[]
}

function AppWithReducer() {

  const todoListId1 = v1()
  const todoListId2 = v1()
  const todoListId3 = v1()

  let [todoLists, dispatchToTodoLists] = useReducer<Reducer<Array<TodoListType>, TodoListActionsType>>(todolistsReducer, [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'completed'},
    {id: todoListId3, title: 'What to read', filter: 'active'},
  ]);

  const [tasksList, dispatchToTasksList] = useReducer<Reducer<TasksStateType, TasksActionsType>>(tasksReducer, {
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
    const action = removeTodolistAC(id)
    dispatchToTodoLists(action)
    dispatchToTasksList(action)
  }
  const addTodoList = (title: string) => {
    const action = addTodoListAC(title)
    dispatchToTodoLists(action)
    dispatchToTasksList(action)
  }
  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    dispatchToTodoLists(changeTodoLisFilterAC(todolistId, filter))
  }
  const changeTodoListTitle = (todolistId: string, title: string) => {
    dispatchToTodoLists(changeTodoListTitleAC(todolistId, title))
  }
  const removeTask = (id: string, todolistId: string) => {
    dispatchToTasksList(removeTaskAC(id, todolistId))
  }
  const addTask = (title: string, todolistId: string) => {
    dispatchToTasksList(addTaskAC(title, todolistId))
  }
  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    dispatchToTasksList(changeTaskStatusAC(taskId, isDone, todolistId))
  }
  const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
    dispatchToTasksList(changeTaskTitleAC(id, newTitle, todolistId))
  }


  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge={"start"} color="inherit" aria-label={'Menu'}>
            <MenuOutlined/>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}>
            OneMoreTodoLIts
          </Typography>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px 0'}}>
          <AddInputForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={10}>
          {todoLists.map((tl) => {
            let tasksForTodolist = tasksList[tl.id];
            if (tl.filter === 'active') {
              tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
            }
            if (tl.filter === 'completed') {
              tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
            }
            return (
              <Grid item>
                <Paper elevation={6} sx={{padding: '20px', borderRadius: '0px'}}>
                  <TodoList
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
                </Paper>
              </Grid>)
          })}
        </Grid>
      </Container>

    </>
  );
}

export default AppWithReducer;
