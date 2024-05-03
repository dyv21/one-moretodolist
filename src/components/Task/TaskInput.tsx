import React from 'react';
import {TaskButton} from "./TaskButton";

export const TaskInput = () => {
  return (
    <div>
      <input/>
      <TaskButton onClickHandler={() => console.log('+')} title={'+'}/>
    </div>
  );
};
