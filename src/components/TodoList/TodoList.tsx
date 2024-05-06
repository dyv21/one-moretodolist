import React, {useState} from 'react';
import {TaskListTitle} from "../Task/TaskListTitle";
import {TaskInput} from "../Task/TaskInput";
import {TaskList, TaskPropsType} from "../Task/TaskList";
import {TaskButton} from "../Task/TaskButton";
import {FilterValuesType} from "../../App";

export type TasksListPropsType = {
  tasks: Array<TaskPropsType>
  removeTask: (id: string) => void
  changeTaskStatus: (taskId: string, isDone:boolean) => void
}

export type TodoListPropsType = {
  tasks: Array<TaskPropsType>
  removeTask: (id: string) => void
  changeFilter: (filter: FilterValuesType) => void
  addTask: (title:string) => void
  changeTaskStatus: (taskId: string, isDone:boolean) => void
}

export const TodoList = (props: TodoListPropsType) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <div>
      <TaskListTitle title={'What to learn'}/>
      <TaskInput addTask={props.addTask} setInputValue={setInputValue} value={inputValue}/>
      <TaskList tasks={props.tasks} removeTask={props.removeTask} changeTaskStatus={props.changeTaskStatus}/>
      <div>
        <TaskButton onClickHandler={() => props.changeFilter('all')} title={'All'}/>
        <TaskButton onClickHandler={() => props.changeFilter('active')} title={'Active'}/>
        <TaskButton onClickHandler={() => props.changeFilter('completed')} title={'Completed'}/>
      </div>
    </div>
  );
};

