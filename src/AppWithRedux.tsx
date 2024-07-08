import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {TaskType} from "./components/Task/TaskList";
import {AddInputForm} from "./components/AddInputForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {MenuOutlined} from "@mui/icons-material";
import {
  addTodoListAC,
  changeTodoLisFilterAC, changeTodoListTitleAC,
  removeTodolistAC,
} from "./model/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./model/store";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: TaskType[]
}

function AppWithRedux() {

  let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
  let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const dispatch = useDispatch();

  const removeTodolistHandler = useCallback((id: string) => {
    dispatch(removeTodolistAC(id))
  }, [dispatch])
  const addTodoList = useCallback((title: string) => {
    dispatch(addTodoListAC(title))
  }, [dispatch])
  const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
    dispatch(changeTodoLisFilterAC(todolistId, filter))
  }, [dispatch])
  const changeTodoListTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTodoListTitleAC(todolistId, title))
  }, [dispatch])

  const removeTask = useCallback((id: string, todolistId: string) => {
    dispatch(removeTaskAC(id, todolistId))
  }, [dispatch])
  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskAC(title, todolistId))
  }, [dispatch])
  const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
  }, [dispatch])
  const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(id, newTitle, todolistId))
  }, [dispatch])

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

            return (
              <Grid item>
                <Paper elevation={6} sx={{padding: '20px', borderRadius: '0px'}}>
                  <TodoList
                    id={tl.id}
                    title={tl.title}
                    key={tl.id}
                    filter={tl.filter}
                    tasks={tasks[tl.id]}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
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

export default AppWithRedux;
