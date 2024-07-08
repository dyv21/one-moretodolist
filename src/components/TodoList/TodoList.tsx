import React, {memo, useCallback, useMemo} from 'react';
import {AddInputForm} from "../AddInputForm";
import {TaskList, TaskType} from "../Task/TaskList";
import {FilterValuesType} from "../../App";
import EditableSpan from "../Task/EditableSpan";
import {Grid, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Btn} from "../Btn";

export type TasksListPropsType = {
  tasks: Array<TaskType>,
  removeTask: (id: string, todolistId: string) => void,
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
  todoListId: string
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void,
}

export type TodoListPropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (todoListId: string, filter: FilterValuesType) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
  removeTodolistHandler: (id: string) => void
  changeTodoListTitle: (todolistId: string, newTitle: string) => void
}

export const TodoList = memo((props: TodoListPropsType) => {
  const onChangeAllHandler = useCallback(() => props.changeFilter(props.id, 'all'), [props.changeFilter, props.id])
  const onChangeActiveHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props.changeFilter, props.id])
  const onChangeCompletedHandler = useCallback(() => props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id])
  const addTaskCallBack = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])
  const onChangeTitleHandler = useCallback((title: string) => props.changeTodoListTitle(props.id, title), [props.changeTodoListTitle, props.id])

  let tasks = props.tasks

  tasks = useMemo(() => {
    if (props.filter === 'active') {
      tasks = props.tasks.filter(task => !task.isDone)
    }
    if (props.filter === 'completed') {
      tasks = props.tasks.filter(task => task.isDone)
    }
    return tasks
  }, [props.tasks, props.filter])

  return (
    <div>
      <Grid container>
        <h3><EditableSpan title={props.title} onChange={onChangeTitleHandler}/></h3>
        <IconButton size='small' onClick={() => props.removeTodolistHandler(props.id)}>
          <Delete/>
        </IconButton>
      </Grid>

      <AddInputForm addItem={addTaskCallBack}/>
      {tasks && tasks.length === 0 && <p>Task List is empty</p>}
      <TaskList
        tasks={tasks}
        removeTask={props.removeTask}
        changeTaskStatus={props.changeTaskStatus}
        changeTaskTitle={props.changeTaskTitle}
        todoListId={props.id}
      />
      <div>
        <Btn title={"All"} onClick={onChangeAllHandler} variant={props.filter === 'all' ? "contained" : 'text'}/>
        <Btn title={"Active"} onClick={onChangeActiveHandler}
             variant={props.filter === 'active' ? "contained" : 'text'}/>
        <Btn title={"Completed"} onClick={onChangeCompletedHandler}
             variant={props.filter === 'completed' ? "contained" : 'text'}/>
      </div>
    </div>
  );
});

