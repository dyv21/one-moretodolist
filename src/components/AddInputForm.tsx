import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';

import {IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";

type InputProps = {
  addItem: (value: string) => void;
}

export const AddInputForm = (props: InputProps) => {

  let [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);


  const setNewInputValue = () => {
    if (inputValue.trim() === '') {
      setError('Title is required')
      return;
    }
    props.addItem(inputValue);
    setInputValue('');
  }

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.ctrlKey && e.key || e.key === 'Enter') {
      setNewInputValue()
    }
  }

  return (
    <div>
      <TextField
        size='small'
        value={inputValue} onChange={onChangeInputHandler}
        onKeyUp={onKeyPressHandler}
        label={'Enter text'}
        error={!!error}
        helperText={error}
      />
      <IconButton size='small' onClick={() => setNewInputValue()}>
        <Add color="primary"/>
      </IconButton>
    </div>
  );
};
