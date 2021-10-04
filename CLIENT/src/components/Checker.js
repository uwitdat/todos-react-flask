import React, { useState, useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios'

const Checker = ({ todo, todos, setTodos, fetchTodos }) => {

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

    useEffect(() => {
        const handleEdit = async () => {
            if (todo.id === undefined) {
                return
            } else {
                const res = await axios.put(`todo/${todo.id}`, editTodo)
                console.log('EDITED TODO:', res)
                fetchTodos()
            }
        }
        handleEdit()

    }, [editTodo])


    return (
        <div key={todo.id} className={editTodo.completed ? 'Todo checked' : 'Todo not-checked'}>
            <h3>{todo.todo}</h3>
            <p className='date-added'>{todo.date_added}</p>
            <div className='Todo-check'>
                <form>
                    <input
                        type="checkbox"
                        id="completed"
                        checked={editTodo.completed ? true : false}
                        name="completed"
                        value={editTodo.completed}
                        onChange={() => setEditTodo({ ...editTodo, completed: !editTodo.completed })}
                    />
                </form>
                {todo.completed ? <><p>Done</p><span style={{ marginLeft: '.5rem', color: 'green' }}>&#10004;</span></> : <><p>Not Done</p><span style={{ marginLeft: '.5rem', color: 'red' }}>&#10005;</span></>}
            </div>
            <p style={{ marginTop: '.5rem' }}><AiFillDelete className='Icon' onClick={() => handleDeleteTodo(todo.id)} /></p>
        </div>
    )
}

export default Checker
