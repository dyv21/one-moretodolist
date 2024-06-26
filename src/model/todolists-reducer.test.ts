import {
  addTodoListAC,
  changeTodoLisFilterAC,
  changeTodoListTitleAC,
  removeTodolistAC,
  todolistsReducer
} from "./todolists-reducer";
import {v1} from "uuid";
import {TodoListType} from "../AppWithReducer";

let todoListId1: string
let todoListId2: string

let initialState: Array<TodoListType>

beforeEach(() => {
  todoListId1 = v1()
  todoListId2 = v1()

  initialState = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'},
  ]
})


test('correct todolist should be removed', () => {

  const result = todolistsReducer(initialState, removeTodolistAC(todoListId1))
  expect(result.length).toBe(1)
  expect(result[0].id).toBe(todoListId2)
})
test('correct todolist should be added', () => {

  const newTitle = 'New Todolist'
  const endState = todolistsReducer(initialState, addTodoListAC(newTitle))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTitle)
})
test('correct todolist should change its name', () => {

  const newTitle = 'New Todolist'
  const endState = todolistsReducer(initialState, changeTodoListTitleAC(todoListId2, newTitle))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTitle)
})
test('correct filter of todolist should be changed', () => {

  const newFilter = 'completed'
  const endState = todolistsReducer(initialState, changeTodoLisFilterAC(todoListId2, newFilter))

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})
