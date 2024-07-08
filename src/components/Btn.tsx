import React, {memo} from 'react';
import {Button} from "@mui/material";

type BtnType = {
  title: string
  onClick: ()=> void
  variant: 'contained' | 'text'
}

export const Btn = memo(({title, variant, onClick}:BtnType )=> {
  return <Button onClick={onClick} variant={variant}>{title}</Button>
})

