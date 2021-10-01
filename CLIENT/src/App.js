import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
import Checker from './components/Checker';

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState({
    todo: '',
    completed: false
  })

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get('/todo')
      setTodos(res.data)
    }
    fetchTodos()
  }, [todos])


  const handleAddTodo = async (e) => {
    e.preventDefault()
    const res = await axios.post('/todo', newTodo)
    console.log('NEW TODO: ', res)
    setTodos([...todos, res])
    setNewTodo({
      todo: '',
      completed: false
    })
  }

  return (
    <div className="App">
      <h1 style={{ marginBottom: '2rem' }}>TODOS WITH FLASK API</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          <Checker key={todo.id} todo={todo} />
        </div>

      ))}
      <form onSubmit={handleAddTodo}>
        <input
          className='input'
          type='text'
          value={newTodo.todo}
          onChange={(e) => setNewTodo({ ...newTodo, todo: e.target.value })}
          placeholder='Enter a new todo'
          required={true}
        />
        <button
          type='submit'
          className='btn'
        >
          Add Todo</button>
      </form>
    </div>
  );
}

export default App;
