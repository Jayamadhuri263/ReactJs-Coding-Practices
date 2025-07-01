import React,{useState} from 'react'
import './index.css'
import TodoItem from './Todo Item'

const initialTodosList = [
    { id: 1, title: 'Book the ticket for today evening', },
    { id: 2, title: 'Rent the movie for tomorrow movie night', },
    { id: 3, title: 'Confirm the slot for the yoga session tomorrow morning', },
    { id: 4, title: 'Drop the parcel at Bloomingdale', },
    { id: 5, title: 'Order fruits on Big Basket', },
    { id: 6, title: 'Fix the production issue', },
    { id: 7, title: 'Confirm my slot for Saturday Night', },
    { id: 8, title: 'Get essentials for Sunday car wash', },
]

function SimpleTodos() {
    const [todosList, setTodosList] = useState(initialTodosList)
    
    const deleteTodoItem = id => {
        setTodosList(todosList.filter(todo => todo.id !== id))
    }

  return (
    <div className='simple-todos-container'>
      <div className='simple-todos-mini-container'>
              <h1 className='simple-todos-heading'>Simple Todos</h1>
              <div className='simple-todos-list-container'>
                  {todosList.map(todoItem => (
                      <TodoItem key={todoItem.id} todoDetails={todoItem} deleteTodoItem={deleteTodoItem} />
                  ))}
              </div>
      </div>
    </div>
  )
}

export default SimpleTodos
