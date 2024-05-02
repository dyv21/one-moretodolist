import React from 'react';

type TaskButtonType = {
  title: string
  onClickHandler?: (id:number)=>void

}
export const TaskButton = ({title, onClickHandler}:TaskButtonType) => {
  return <button onClick={()=>onClickHandler}>{title}</button>
};

