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
                {todo.completed ? <><p>Done</p><span style={{ marginLeft: '.5rem', color: 'green' }}>&#10004;</span></> : <><p>Not Done</p><span style={{ marginLeft: '.5rem', color: 'red' }}>&#10005;</span></>}
            </div>
            <p style={{ marginTop: '1rem' }}><AiFillDelete className='Icon' /></p>
        </div>
    )
}

export default Checker
