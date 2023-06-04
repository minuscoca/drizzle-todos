'use client'

async function handleDeleteAll() {
  await fetch('/api/todos', { method: 'DELETE' })
}

export default function DeleteAllTodosButton() {
  return (
    <button onClick={handleDeleteAll}>Delete All</button>
  )
}