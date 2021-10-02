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

  const fetchTodos = async () => {
    const res = await axios.get('/todo')
    setTodos(res.data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])


  const handleAddTodo = async (e) => {
    e.preventDefault()
    const res = await axios.post('/todo', newTodo)
    console.log('NEW TODO: ', res)
    setTodos([...todos, res])
    fetchTodos()
    setNewTodo({
      todo: '',
      completed: false
    })
  }

  return (
    <div className="App">
      <h1 style={{ marginBottom: '2rem' }}>TODOS WITH FLASK API</h1>
      {todos.length === 0 ? <h2>Add your first Todo</h2> : (
        todos.map((todo) => (
          <div key={todo.id}>
            <Checker key={todo.id} todo={todo} todos={todos} setTodos={setTodos} fetchTodos={fetchTodos} />
          </div>

        ))
      )}

      <form onSubmit={handleAddTodo}>
        <input
          className='input'
          type='text'
          value={newTodo.todo}
          onChange={(e) => setNewTodo({ ...newTodo, todo: e.target.value })}
          placeholder='Add a new todo'
          required={true}
        />
        <button
          type='submit'
          className='btn'
        >
          Add </button>
      </form>
    </div>
  );
}

export default App;
