import React, { useState } from 'react'

const TodoForm = ({ addTodo }) => {

    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        addTodo(text);
        setText("");
    }

    return (
        <form onSubmit={handleSubmit} className='flex gap-3 flex-wrap'>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task..."
                className="flex-grow px-2 sm:px-4 py-2 rounded-lg w-[50%]  border border-primary-dark dark:border-primary dark:placeholder:text-primary text-primary-dark dark:text-primary"
            />
            <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
                Add
            </button>
        </form>
    )
}

export default TodoForm
