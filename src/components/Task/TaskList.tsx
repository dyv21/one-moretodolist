import React, {ChangeEvent} from 'react';
import {TaskButton} from "./TaskButton";
import {TasksListPropsType} from "../TodoList/TodoList";

export type TaskPropsType = {
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

        return <li key={id} className={isDone ? "is-done" : ""}>
          <input onChange={onCheckBoxChange} type="checkbox" checked={isDone}/>
          <span>{title}</span>
          <TaskButton onClickHandler={() => props.removeTask(id, props.todoListId)} title={'x'}/>
        </li>
      })}
    </ul>
  );
};

