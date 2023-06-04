'use client'

import { eq } from "drizzle-orm"
import db from '../../db/db'
import type { Todo } from '../../db/schema/todos'
import { todos } from '../../db/schema/todos'
import { useTransition } from 'react'
import { useRouter } from "next/navigation"

function TodoStatus({ isCompleted }: { isCompleted: boolean }) {
  if (isCompleted) return <p className="pl-2 pr-2 rounded-md bg-gray-400">Completed</p>
  return <p className="pl-2 pr-2 rounded-md bg-gray-400">Todo</p>
}

export default function TodoCard(props: { data: Todo, index: number }) {
  const router = useRouter()
  const { data: todo, index } = props
  const isCompleted = Boolean(todo.status === 'COMPLETED')
  const [isPending, startTransition] = useTransition()

  async function handleUpdateTodo() {
    await fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: isCompleted ? 'TODO' : 'COMPLETED' })
    })

    startTransition(() => {
      // * https://beta.nextjs.org/docs/data-fetching/mutating
      // * Refresh the current route:
      // * Makes a new request to the server for the route
      // * Re-fetches data requests and re-renders Server Components
      // * Sends the updated React Server Component payload to the client
      // * The client merges the payload without losing unaffected
      // * client-side React state or browser state
      router.refresh()

      // * Note: If fetch requests are cached, the updated data will
      // * produce the same result.
    })
  }

  return (
    <li
      className='flex gap-2 p-2 pl-6 pr-6 hover:bg-gray-600 rounded-md cursor-pointer'
      onClick={handleUpdateTodo}
    >
      <p>{index + 1}.</p>
      <p className="'flex-1 w-full">{todo.title}</p>
      <TodoStatus isCompleted={isCompleted} />
    </li>
  )
}