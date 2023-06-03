'use client'

import { ChangeEvent, useRef } from "react"

export default function Home() {
  const inputRef = useRef('')
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    inputRef.current = e.currentTarget.value
    console.log('todo.title:', inputRef.current)
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-6xl m-4">Drizzle Todos</h1>
      <div className="m-4 flex gap-4">
        <input className="text-black pl-2 pr-2 rounded-md" onChange={handleChange} />
        <button className="pl-8 pr-8 pt-2 pb-2 rounded-md bg-gray-500 hover:bg-gray-600 active:bg-gray-700" onClick={e => console.log('add todo:', { title: inputRef.current })}>Add</button>
      </div>
    </main>
  )
}
