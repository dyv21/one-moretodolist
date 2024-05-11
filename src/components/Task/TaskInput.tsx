import React, {ChangeEvent, KeyboardEvent} from 'react';
import {TaskButton} from "./TaskButton";

type TaskInputProps = {
  value: string;
  addTask: (value: string, todolistId: string) => void;
  setInputValue: (value: string) => void;
  error: null | string;
  setError: (error: string | null) => void;
  todoListId: string
}

export const TaskInput = (props: TaskInputProps) => {

  const setNewTaskTitle = () => {
    if (props.value.trim() === '') {
      props.setError('Title is required')
      return;
    }
    props.addTask(props.value, props.todoListId)
    props.setInputValue('')
  }

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => props.setInputValue(e.currentTarget.value)
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    props.setError(null)
    if (e.ctrlKey && e.key || e.key === 'Enter') {
      setNewTaskTitle()
    }
  }

  return (
    <div>
      <input value={props.value}
             onChange={onChangeInputHandler}
             onKeyUp={onKeyPressHandler}
             className={props.error ? "error" : ""}/>
      <TaskButton onClickHandler={() => {setNewTaskTitle()}} title={'+'}/>
      {props.error && <div className='error-message'>Field is required</div>}
    </div>
  );
};
