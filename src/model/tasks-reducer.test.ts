import {TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodoListAC, removeTodolistAC} from "./todolists-reducer";

let startState: TasksStateType

beforeEach(()=> {
  startState = {
    'todoListId1': [
      {id: '1', title: "HTML&CSS", isDone: true},
      {id: '2', title: "JS", isDone: true},
      {id: '3', title: "ReactJS", isDone: false},

    ],
    'todoListId2': [
      {id: '1', title: "Milk", isDone: true},
      {id: '2', title: "Bread", isDone: false},
      {id: '3', title: "Eggs", isDone: true},
    ],
  }
})

test('should remove specific task from correct array', () => {

  const action = removeTaskAC('2', 'todoListId2')

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todoListId1': [
      {id: '1', title: "HTML&CSS", isDone: true},
      {id: '2', title: "JS", isDone: true},
      {id: '3', title: "ReactJS", isDone: false},

    ],
    'todoListId2': [
      {id: '1', title: "Milk", isDone: true},
      {id: '3', title: "Eggs", isDone: true},
    ],
  })
})
test('should add  task to correct array', () => {
  const action = addTaskAC('Juce', 'todoListId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todoListId1'].length).toBe(3)
  expect(endState['todoListId2'].length).toBe(4)
  expect(endState['todoListId2'][0].id).toBeDefined()
  expect(endState['todoListId2'][0].title).toBe('Juce')
  expect(endState['todoListId2'][0].isDone).toBe(false)
})
test('task status should be changed', () => {
  const action = changeTaskStatusAC('2', false, 'todoListId2')
  const endState = tasksReducer(startState, action)

  expect(endState['todoListId2'][0].isDone).toBe(true)
  expect(endState['todoListId2'][1].isDone).toBe(false)
})
test('Title  should be changed', () => {
  const action = changeTaskTitleAC('2', 'New Title', 'todoListId2')
  const endState = tasksReducer(startState, action)

  expect(endState['todoListId1'][0].title).toBe('HTML&CSS')
  expect(endState['todoListId2'][1].title).toBe('New Title')
})
test('New Array should be added', () => {
  const action = addTodoListAC('New TodoList')
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todoListId1' &&  k != 'todoListId2')
  if (!newKey) {
    throw new Error('New key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})
test('Property with todoListID should be deleted', () => {
  const action = removeTodolistAC('todoListId2')
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todoListId2']).not.toBeDefined()
})
