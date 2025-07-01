import React from 'react'
import '../index.css'

function TodoItem(props) {
    const { todoDetails,deleteTodoItem } = props 
    const { title,id } = todoDetails
    
    const deleteItem = () => {
        deleteTodoItem(id);
    }
    
    return (
        <div className='todoItem-container'>
            <h1 className='todoItem-title'>{title}</h1>
            <button type='button' className='todoItem-delete' onClick={deleteItem}>Delete</button>
        </div>
    )
}

export default TodoItem
