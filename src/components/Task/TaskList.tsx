import React from 'react';
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
      {props.tasks.map(task => (
          <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <TaskButton onClickHandler={() => props.removeTask(task.id)} title={'x'}/>
          </li>
        )
      )}
    </ul>
  );
};

