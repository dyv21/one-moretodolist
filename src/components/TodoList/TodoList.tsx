import React from 'react';
import {TaskListTitle} from "../Task/TaskListTitle";
import {TaskInput} from "../Task/TaskInput";
import {TaskList, TasksListPropsType} from "../Task/TaskList";
import {TaskButton} from "../Task/TaskButton";


export const TodoList = (props: TasksListPropsType) => {
  return (
    <div>
      <TaskListTitle title={'What to learn'}/>
      <TaskInput/>

      <TaskList tasks={props.tasks} removeTask={props.removeTask}/>
      <div>
        <TaskButton onClickHandler={ ()=> console.log('All')} title={'All'}/>
        <TaskButton onClickHandler={ ()=> console.log('Active')} title={'Active'}/>
        <TaskButton onClickHandler={ ()=> console.log('Completed')} title={'Completed'}/>
      </div>
    </div>
  );
};

