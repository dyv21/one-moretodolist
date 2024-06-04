import React from 'react';
import {Button} from "@mui/material";

type TaskButtonType = {
  title: string
  onClickHandler?: () => void
  variant?: 'text' | 'outlined' | 'contained' | undefined
}
export const Btn = ({title, onClickHandler, variant="text"}: TaskButtonType) => (
  <Button variant={variant} size='small' onClick={onClickHandler}>{title}</Button>
)
