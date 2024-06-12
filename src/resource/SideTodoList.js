import React, { useState, useEffect } from 'react';
import '../css/SideTodoList.css';

const TodoList = ({ userId }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        // Load the todo list from localStorage when the component mounts
        const storedTodos = localStorage.getItem(`todoList-${userId}`);
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, [userId]);

    const handleAddTodo = (event) => {
        if (event.key === 'Enter' && event.target.value.trim() !== '') {
            const newTodos = [...todos, event.target.value.trim()];
            setTodos(newTodos);
            localStorage.setItem(`todoList-${userId}`, JSON.stringify(newTodos));
            event.target.value = '';
        }
    };

    const handleRemoveTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
        localStorage.setItem(`todoList-${userId}`, JSON.stringify(newTodos));
    };

    const handleEditTodo = (index, value) => {
        const newTodos = todos.map((todo, i) => (i === index ? value : todo));
        setTodos(newTodos);
        localStorage.setItem(`todoList-${userId}`, JSON.stringify(newTodos));
    };

    return (
        <div className='todo-box'>
            <div className='title-box'>
                <img className='meticon' src='./img/TodoList.png' alt='Met Icon'/>
                <span className='mettitle'>TO DO LIST</span>
            </div>
            <input
                type="text"
                className='top-input'
                placeholder="할일을 입력하세요"
                onKeyDown={handleAddTodo}
            />
            <ul className='todo-ul'>
                {todos.map((todo, index) => (
                    <li key={index} className='todo-li'>
                        <input
                            type="text"
                            value={todo}
                            onChange={(e) => handleEditTodo(index, e.target.value)}
                        />
                        <button className='todo-button' onClick={() => handleRemoveTodo(index)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
