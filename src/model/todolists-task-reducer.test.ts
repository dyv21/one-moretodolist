import {TasksStateType, TodoListType} from "../App";
import {addTodoListAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ID should be equal', () => {
  const startTaskState: TasksStateType = {}
  const startTodoListState: Array<TodoListType> = []

  const action = addTodoListAC('New ToDoLIst')

  const endTaskState = tasksReducer(startTaskState, action)
  const endTodoListState = todolistsReducer(startTodoListState, action)

  const keys = Object.keys(endTaskState)
  const idFromTask = keys[0]
  const idFromTodoList = endTodoListState[0].id

  expect(idFromTask).toBe(action.payload.todoListId)
  expect(idFromTodoList).toEqual(action.payload.todoListId)
})