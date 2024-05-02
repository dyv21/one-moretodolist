import React from 'react';

type TaskButtonType = {
    title: string
    onClickHandler?: () => void

}
export const TaskButton = ({title, onClickHandler}: TaskButtonType) => {
    return <button onClick={onClickHandler}>{title}</button>
};

