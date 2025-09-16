import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo }) => {
    return (
        <div className='mt-6'>

            <div>
                {todos.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-300 text-center mt-10">
                        No tasks found
                    </p>
                ) : (
                    <ul>
                        {todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                toggleTodo={toggleTodo}
                                deleteTodo={deleteTodo}
                                editTodo={editTodo}
                            />
                        ))}
                    </ul>
                )}
            </div>

        </div>
    )
}

export default TodoList
