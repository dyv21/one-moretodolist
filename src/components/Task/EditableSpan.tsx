import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
  title: string,
  onChange: (value: string) => void,
}

const EditableSpan = ({title, onChange}: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false);
  let [inputValue, setInputValue] = useState<string>('');

  const activateEditMode = () => {
    setInputValue(title);
    setEditMode(true);
  }
  const activateViewMode = () => {
    setEditMode(false);
    onChange(inputValue)
  }

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value);

  return editMode
    ? <TextField size={'small'} color={"success"} value={inputValue} onBlur={activateViewMode}
                 onChange={onChangeTitleHandler} autoFocus/>
    : <span onDoubleClick={activateEditMode}>{title}</span>

}

export default EditableSpan;

