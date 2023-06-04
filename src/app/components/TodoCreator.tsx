'use client'

import { useRef, ChangeEvent, useState } from 'react'
import type { NewTodo } from '../../db/schema/todos'

export default function TodoCreator() {
  const inputRef = useRef('')
  const [key, setKey] = useState(0)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    inputRef.current = e.currentTarget.value
  }

  async function handleAddTodo() {
    const newTodo: NewTodo = { title: inputRef.current }
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
    })
    inputRef.current = ''
    setKey(prev => prev + 1)
  }

  return (
    <div className="m-4 flex gap-4">
      <input key={key} className="text-black pl-2 pr-2 rounded-md" onChange={handleChange} />
      <button className="pl-8 pr-8 pt-2 pb-2 rounded-md bg-gray-500 hover:bg-gray-600 active:bg-gray-700" onClick={handleAddTodo}>Add</button>
    </div>
  )
}
