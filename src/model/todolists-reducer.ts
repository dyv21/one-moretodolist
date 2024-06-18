import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";

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

type ActionsType =
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

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(todo => todo.id !== action.payload.id)
    }
    case 'ADD-TODOLIST': {
      const newTodoListName = {
        id: v1(),
        title: action.payload.title,
        filter: 'all',
      }
      return [...state, newTodoListName]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const newTodoTitle = state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
      return [...newTodoTitle]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const newTodoList = state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
      return [...newTodoList]
    }

    default:
      throw new Error(`Unknown action type ${action}`)
  }
}