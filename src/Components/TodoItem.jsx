import React, { useState } from 'react'
import { MdSave, MdEdit, MdDelete } from "react-icons/md";

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const handleEdit = () => {
        if (isEditing && newText.trim()) {
            editTodo(todo.id, newText);
        }
        setIsEditing(!isEditing);
    };

    return (
        <li className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 my-2 shadow-sm">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 accent-green-500 cursor-pointer"
                />
                {isEditing ? (
                    <input
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none"
                    />
                ) : (
                    <span
                        className={`text-gray-900 dark:text-white ${todo.completed ? "line-through text-gray-400" : ""
                            }`}
                    >
                        {todo.text}
                    </span>
                )}
            </div>
            <div className="flex gap-2">
                <button
                    onClick={handleEdit}
                    className="text-yellow-500 hover:text-yellow-600 hover:scale-120 transition cursor-pointer"
                >
                    {isEditing ? <MdSave size={23} /> : <MdEdit size={23}/>
}
                </button>
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-600 hover:scale-120 transition cursor-pointer"
                >
                    <MdDelete size={23}/>
                </button>
            </div>
        </li>
    )
}

export default TodoItem
