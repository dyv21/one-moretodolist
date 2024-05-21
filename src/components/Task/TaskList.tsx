import React, {ChangeEvent} from 'react';
import {Button} from "../Button";
import {TasksListPropsType} from "../TodoList/TodoList";
import EditableSpan from "./EditableSpan";

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
            <Button onClickHandler={() => props.removeTask(id, props.todoListId)} title={'x'}/>
          </li>)

      })}

    </ul>
  );
};

