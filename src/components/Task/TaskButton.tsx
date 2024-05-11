import React from 'react';

type TaskButtonType = {
  title: string
  onClickHandler?: () => void
  className?: string
}
export const TaskButton = ({title, onClickHandler, className}: TaskButtonType) => (
  <button className={className} onClick={onClickHandler}>{title}</button>
)

