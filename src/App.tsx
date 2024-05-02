import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";



function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Reast API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false}
    ])

    const removeTask = (id:number) => {
        tasks = tasks.filter(task => task.id != id)
        console.log(tasks)
        setTasks(tasks)
    };

    return (
        <div className="App">
            <TodoList tasks={tasks} removeTask={removeTask} />
        </div>
    );
}

export default App;
