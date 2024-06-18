import {todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {TodoListType} from "../App";


test('REMOVE TODOLIST', () => {

  const todoListId1 = v1()
  const todoListId2 = v1()

  const initialState: Array<TodoListType> = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'},
  ]

  const action = {
    type: 'REMOVE-TODOLIST',
    payload: {
      id: todoListId1
    }
  } as const

  const result = todolistsReducer(initialState, action)

  expect(result.length).toBe(1)
  expect(result[0].id).toBe(todoListId2)
})
test('correct todolist should be added', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: Array<TodoListType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ]

  const action = {
    type: 'ADD-TODOLIST',
    payload: {title: 'New Todolist'}
  } as const

  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(action.payload.title)
})
test('correct todolist should change its name', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: Array<TodoListType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ]

  const action = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      id: todolistId2,
      title: 'New Todolist',
    },
  } as const
  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(action.payload.title)
})
test('correct filter of todolist should be changed', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: Array<TodoListType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ]

  const action = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
      id: todolistId2,
      filter: 'completed',
    },
  } as const
  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(action.payload.filter)
})