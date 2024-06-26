import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../AppWithReducer";

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  payload: {
    id: string
  }
}

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  payload: {
    title: string
    todoListId: string
  }
}

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  payload: {
    id: string
    title: string
  }
}

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  payload: {
    id: string
    filter: FilterValuesType
  }
}

export type TodoListActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType


let todoListId1 = v1()
let todoListId2 = v1()


const initialState: Array<TodoListType> = [
  {id: todoListId1, title: 'What to learn', filter: 'all'},
  {id: todoListId2, title: 'What to buy', filter: 'all'},
]

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
}
export const addTodoListAC = (title: string): AddTodolistActionType => {
  return {type: 'ADD-TODOLIST', payload: {title, todoListId: v1()}} as const

}
export const changeTodoListTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}} as const
}

export const changeTodoLisFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}} as const
}

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: TodoListActionsType): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.payload.id)
    }
    case 'ADD-TODOLIST': {
      const newTodoList: TodoListType = {
        id: action.payload.todoListId,
        title: action.payload.title,
        filter: 'all',
      }
      return [newTodoList, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const newTodoList = state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
      return [...newTodoList]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const newTodoList = state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
      return [...newTodoList]
    }

    default:
      throw new Error(`Unknown action type ${action}`)
  }
}