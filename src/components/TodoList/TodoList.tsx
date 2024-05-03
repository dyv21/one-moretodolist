import React from 'react';
import {TaskListTitle} from "../Task/TaskListTitle";
import {TaskInput} from "../Task/TaskInput";
import {TaskList, TaskPropsType} from "../Task/TaskList";
import {TaskButton} from "../Task/TaskButton";
import {FilterValuesType} from "../../App";

export type TasksListPropsType = {
  tasks: Array<TaskPropsType>
  removeTask: (id: string) => void
  changeFilter: (filter: FilterValuesType) => void
}

export const TodoList = (props: TasksListPropsType) => {
  return (
    <div>
      <TaskListTitle title={'What to learn'}/>
      <TaskInput/>

      <TaskList tasks={props.tasks} removeTask={props.removeTask} changeFilter={props.changeFilter}/>
      <div>
        <TaskButton onClickHandler={() => props.changeFilter('all')} title={'All'}/>
        <TaskButton onClickHandler={() => props.changeFilter('active')} title={'Active'}/>
        <TaskButton onClickHandler={() => props.changeFilter('completed')} title={'Completed'}/>
      </div>
    </div>
  );
};

