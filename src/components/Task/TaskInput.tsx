import React, {ChangeEvent, KeyboardEvent} from 'react';
import {TaskButton} from "./TaskButton";

type TaskInputProps = {
  value: string;
  addTask: (value: string) => void;
  setInputValue: (value: string) => void;
}

export const TaskInput = (props: TaskInputProps) => {

  const setNewTaskTitle = () => {
    props.addTask(props.value)
    props.setInputValue('');
  }

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => props.setInputValue(e.currentTarget.value)
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      setNewTaskTitle()
    }
  }


  return (
    <div>
      <input value={props.value} onChange={onChangeInputHandler} onKeyUp={onKeyPressHandler}/>
      <TaskButton onClickHandler={() => {setNewTaskTitle()}} title={'+'}/>
    </div>
  );
};
