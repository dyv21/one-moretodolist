import React, {ChangeEvent, memo, useCallback} from 'react';
import {TasksListPropsType} from "../TodoList/TodoList";
import EditableSpan from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {IconButton, List, ListItem} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TaskPropsType = {
  task: TaskType
  todoListId: string
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
  removeTask: (id: string, todolistId: string) => void
}

export const Task = memo((props: TaskPropsType) => {
  const onCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId)
  }
  const onChangeTitleHandler = (titleValue: string) => {
    props.changeTaskTitle(props.task.id, titleValue, props.todoListId);
  }
  const removeTaskHandler = () => {
    props.removeTask(props.task.id, props.todoListId)
  }

  return (
    <ListItem  className={props.task.isDone ? "is-done" : ""}>
      <Checkbox onChange={onCheckBoxChange} defaultChecked={props.task.isDone}/>
      <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
      <IconButton size='small' onClick={removeTaskHandler}>
        <Delete/>
      </IconButton>
    </ListItem>)
})

export const TaskList = memo((props: TasksListPropsType) => {
  return (
    <List>
      {props.tasks.map((task) => {
        return (
          <Task
            task={task}
            key={task.id}
            todoListId={props.todoListId}
            changeTaskStatus={props.changeTaskStatus}
            changeTaskTitle={props.changeTaskTitle}
            removeTask={props.removeTask}
          />)

      })}
    </List>
  );
})

