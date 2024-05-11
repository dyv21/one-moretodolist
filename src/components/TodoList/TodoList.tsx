import React, {ChangeEvent, useState} from 'react';
import {TaskListTitle} from "../Task/TaskListTitle";
import {TaskInput} from "../Task/TaskInput";
import {TaskList, TaskPropsType} from "../Task/TaskList";
import {TaskButton} from "../Task/TaskButton";
import {FilterValuesType, TodoListType} from "../../App";

export type TasksListPropsType = {
  tasks: Array<TaskPropsType>,
  removeTask: (id: string, todolistId: string) => void,
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
  todoListId: string
}

export type TodoListPropsType = {
  tasks: Array<TaskPropsType>,
  removeTask: (id: string, todolistId: string) => void,
  changeFilter: (filter: FilterValuesType, todoListId: string) => void,
  addTask: (title: string, todolistId: string) => void,
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
  filter: FilterValuesType,
  id: string,
  title: string
  removeTodolistHandler: (id:string) => void,
}

export const TodoList = (props: TodoListPropsType) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onChangeAllHandler = () => props.changeFilter('all', props.id)
  const onChangeActiveHandler = () => props.changeFilter('active', props.id)
  const onChangeCompletedHandler = () => props.changeFilter('completed', props.id)


  return (
    <div>
      <div className="todolist-title-container">
        <TaskListTitle title={props.title}/>
        <TaskButton title={'x'} onClickHandler={()=> props.removeTodolistHandler(props.id)} />
      </div>

      <TaskInput
        addTask={props.addTask}
        setInputValue={setInputValue}
        value={inputValue} error={error}
        setError={setError} todoListId={props.id}/>
      <TaskList
        tasks={props.tasks}
        removeTask={props.removeTask}
        changeTaskStatus={props.changeTaskStatus}
        todoListId={props.id}/>
      <div>
        <TaskButton
          onClickHandler={onChangeAllHandler}
          title={'All'}
          className={props.filter === 'all' ? "active-filter" : ''}/>
        <TaskButton
          onClickHandler={onChangeActiveHandler}
          title={'Active'}
          className={props.filter === 'active' ? "active-filter" : ''}/>
        <TaskButton
          onClickHandler={onChangeCompletedHandler}
          title={'Completed'}
          className={props.filter === 'completed' ? "active-filter" : ''}/>
      </div>
    </div>
  );
};

