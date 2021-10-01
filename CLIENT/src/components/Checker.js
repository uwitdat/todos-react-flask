import React, { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'


const Checker = ({ todo }) => {
    const [checked, setChecked] = useState(false)

    return (
        <div key={todo.id} className={checked ? 'Todo checked' : 'Todo not-checked'}>
            <h3>{todo.todo}</h3>
            <div className='Todo-check'>
                <input
                    type="checkbox"
                    id="completed"
                    name="completed"
                    value={checked}
                    onChange={() => setChecked(!checked)} />
                {todo.completed ? <p>Done</p> : <p>Not Done</p>}
            </div>
            <p style={{ marginTop: '1rem' }}><AiFillDelete className='Icon' /></p>
        </div>
    )
}

export default Checker
