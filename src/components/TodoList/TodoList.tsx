import React from 'react';
import {AddInputForm} from "../AddInputForm";
import {TaskList, TaskType} from "../Task/TaskList";
import {Button} from "../Button";
import {FilterValuesType} from "../../App";
import EditableSpan from "../Task/EditableSpan";

export type TasksListPropsType = {
  tasks: Array<TaskType>,
  removeTask: (id: string, todolistId: string) => void,
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
  todoListId: string
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void,
}

export type TodoListPropsType = {
  tasks: Array<TaskType>,
  removeTask: (id: string, todolistId: string) => void,
  changeFilter: (filter: FilterValuesType, todoListId: string) => void,
  addTask: (title: string, todolistId: string) => void,
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
  filter: FilterValuesType,
  id: string,
  title: string
  removeTodolistHandler: (id: string) => void,
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void,
  changeTodoListTitle: (todolistId: string, newTitle: string) => void,
}

export const TodoList = (props: TodoListPropsType) => {

  const onChangeAllHandler = () => props.changeFilter('all', props.id)
  const onChangeActiveHandler = () => props.changeFilter('active', props.id)
  const onChangeCompletedHandler = () => props.changeFilter('completed', props.id)

  const addTaskCallBack = (title: string) =>  props.addTask(title, props.id)

  const onChangeTitleHandler = (title:string) => {

    props.changeTodoListTitle(props.id, title)
  }

  return (
    <div>
      <div className="todolist-title-container">
        <h3><EditableSpan title={props.title} onChange={onChangeTitleHandler}/></h3>
        <Button title={'x'} onClickHandler={() => props.removeTodolistHandler(props.id)}/>
      </div>

      <AddInputForm addItem={addTaskCallBack}/>
      {props.tasks.length === 0 && <p>Список пуст</p>}
      <TaskList
        tasks={props.tasks}
        removeTask={props.removeTask}
        changeTaskStatus={props.changeTaskStatus}
        changeTaskTitle={props.changeTaskTitle}
        todoListId={props.id}
      />
      <div>
        <Button onClickHandler={onChangeAllHandler} title={'All'} className={props.filter === 'all' ? "active-filter" : ''}/>
        <Button onClickHandler={onChangeActiveHandler} title={'Active'} className={props.filter === 'active' ? "active-filter" : ''}/>
        <Button onClickHandler={onChangeCompletedHandler} title={'Completed'} className={props.filter === 'completed' ? "active-filter" : ''}/>
      </div>
    </div>
  );
};

