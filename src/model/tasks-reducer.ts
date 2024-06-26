import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  payload: {
    id: string
    todolistId: string
  }
}
export type AddTaskActionType = {
  type: 'ADD-TASK'
  payload: {
    title: string
    todolistId: string
  }
}
export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  payload: {
    id: string
    isDone: boolean
    todolistId: string
  }
}
export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  payload: {
    id: string
    title: string
    todolistId: string
  }
}

export type TasksActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

const todoListId1 = v1()
const todoListId2 = v1()

const initialState: TasksStateType = {
  [todoListId1]: [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Reast API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false}
  ],
  [todoListId2]: [
    {id: v1(), title: "Milk", isDone: true},
    {id: v1(), title: "Bread", isDone: false},
    {id: v1(), title: "Eggs", isDone: true},
    {id: v1(), title: "Sugar", isDone: true},
  ],
}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', payload: {id, todolistId}} as const
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {type: 'ADD-TASK', payload: {title, todolistId}} as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', payload: {id, isDone: false, todolistId}} as const
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', payload: {id, title, todolistId}} as const
}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const todoListId = action.payload.todolistId
      return {
        ...state,
        [todoListId]: state[todoListId].filter(t => t.id !== action.payload.id)
      }
    }
    case 'ADD-TASK': {
      const todoListId = action.payload.todolistId
      const newTaskList = state[todoListId]
      const newTaskTemplate = {id: v1(), title: action.payload.title, isDone: false}
      return {
        ...state,
        [todoListId]: Array(newTaskTemplate, ...newTaskList)
      }
    }
    case 'CHANGE-TASK-STATUS': {
      const todoListId = action.payload.todolistId
      return {
        ...state,
        [todoListId]: state[todoListId]
          .map(t => t.id === action.payload.id ? {...t, isDone: action.payload.isDone} : t)
      }
    }
    case 'CHANGE-TASK-TITLE': {
      const todoListId = action.payload.todolistId
      return {
        ...state,
        [todoListId]: state[todoListId]
          .map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
      }
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.payload.todoListId]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      let copyState = {...state}
      delete copyState[action.payload.id]
      return copyState
    }

    default:
      throw Error('Unknown action type')
  }
}