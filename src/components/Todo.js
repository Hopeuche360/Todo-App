import React, {useState} from 'react';
import './Todo.css';

function Task({task, index, completeTask, deleteTask}) {
    return (
        <div className="task" style={{textDecoration : task.completed ? "line-through" : ""}}>
            {task.title}
            <button onClick={() => deleteTask(index)}>X</button>
            <button onClick={() => completeTask(index)}>Done</button>
        </div>
    );
}

function CreateTask({newTask}) {
    const [value, setValue] = useState("");
    
    const handleSubmit = event => {
        event.preventDefault();
        if (!value) return;
            newTask(value);
            setValue("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="text" value={value} placeholder="Create New Task"
                onChange={event => setValue(event.target.value)}
            />
        </form>
    );
}

export default function Todo() {
    const [tasks, setTasks] = useState([
        {title: "Write my Agile assignment", completed: true},
        {title: "Study React", completed: true},
        {title: "complete my task", completed: false}
    ]);

    const newTask = title => {
        const addTask = [...tasks, {title, completed: false}];
        setTasks(addTask);
    }

    const completeTask = index => {
        const newTask = [...tasks];
        newTask[index].completed = true;
        setTasks(newTask);
    }

    const deleteTask = index => {
        const newTask = [...tasks];
        newTask.splice(index, 1);
        setTasks(newTask); 
    }

    return (
        <div className="todo-container">
            <div className="header">Hope's To-Do List</div>
            <div className="task">{tasks.map((task, index) => (<Task task={task} index={index} completeTask={completeTask} deleteTask={deleteTask} key={index}/>))}</div>
            <div className="create-task"><CreateTask newTask={newTask}/></div>
        </div>
        
    );
}


