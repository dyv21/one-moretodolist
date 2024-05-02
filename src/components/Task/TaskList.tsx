import React from 'react';
import {TaskButton} from "./TaskButton";


export type TaskPropsType = {
  id: number
  title: string
  isDone: boolean
}


export type TasksListPropsType = {
  tasks: Array<TaskPropsType>
  removeTask: (id:number) => void
}

export const TaskList = (props: TasksListPropsType) => {
  return (
    <ul>
      {props.tasks.map(task => (
        <li key={task.id}>
          <input type="checkbox" checked={task.isDone}/>
          <span>{task.title}</span>
          <button onClick={() => props.removeTask(task.id)} >x</button>
        </li>
      )
      )}
    </ul>
  );
};

