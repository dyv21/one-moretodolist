import React, {ChangeEvent} from 'react';
import {Btn} from "../Btn";
import {TasksListPropsType} from "../TodoList/TodoList";
import EditableSpan from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}


export const TaskList = (props: TasksListPropsType) => {

  return (
    <ul>
      {props.tasks.map(({id, title, isDone}) => {
        const onCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
          props.changeTaskStatus(id, e.currentTarget.checked, props.todoListId)
        }
        const onChangeTitleHandler = (titleValue:string) => {
          props.changeTaskTitle(id, titleValue, props.todoListId);
        }

        return (
          <li key={id} className={isDone ? "is-done" : ""}>
            <input onChange={onCheckBoxChange} type="checkbox" checked={isDone}/>
            <EditableSpan title={title} onChange={onChangeTitleHandler}/>
            <IconButton size='small' onClick={() => props.removeTask(id, props.todoListId)}>
              <Delete/>
            </IconButton>
          </li>)

      })}

    </ul>
  );
};

