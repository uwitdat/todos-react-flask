import React, { useState, useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios'


const Checker = ({ todo, todos, setTodos, fetchTodos }) => {
    const [checked, setChecked] = useState(false)
    const [editTodo, setEditTodo] = useState({
        id: todo.id,
        todo: todo.todo,
        completed: todo.completed
    })



    const handleDeleteTodo = async (id) => {
        const res = await axios.delete(`todo/${id}`)
        console.log('DELETED TODO:', res)
        setTodos([...todos.filter(todo => todo.id !== id)])
        fetchTodos()
    }


    const handleEditTodo = async (e, id) => {
        e.preventDefault()
        setEditTodo({ ...editTodo, completed: checked })
        const res = await axios.put(`todo/${id}`, editTodo)
        console.log('EDITED TODO', res)
        setTodos([...todos, res])
        fetchTodos()
    }

    return (
        <div key={todo.id} className={todo.completed ? 'Todo checked' : 'Todo not-checked'}>
            <h3>{todo.todo}</h3>
            <div className='Todo-check'>
                <input
                    type="checkbox"
                    id="completed"
                    checked={todo.completed ? true : false}
                    name="completed"
                    value={checked}
                    onChange={() => setChecked(!checked)}
                    onClick={(e) => handleEditTodo(e, todo.id)}
                />
                {todo.completed ? <><p>Done</p><span style={{ marginLeft: '.5rem', color: 'green' }}>&#10004;</span></> : <><p>Not Done</p><span style={{ marginLeft: '.5rem', color: 'red' }}>&#10005;</span></>}
            </div>
            <p style={{ marginTop: '1rem' }}><AiFillDelete className='Icon' onClick={() => handleDeleteTodo(todo.id)} /></p>
        </div>
    )
}

export default Checker
