import React from 'react';

type TaskListTitleProps = {
  title: string
}
export const TaskListTitle = ({title}: TaskListTitleProps) => <h3>{title}</h3>;
