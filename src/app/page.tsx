import TodoCreator from "./components/TodoCreator"
import type { Todo } from '../db/schema/todos'
import { todos } from '../db/schema/todos'
import db from '../db/db'

async function getTodos(): Promise<Todo[]> {
  const selectResult = await db.select().from(todos)
  return selectResult
}

async function TodoList() {
  const data = await getTodos()
  return (
    <div>
      <h1>Todo List</h1>
      {data.map((todo) => <div key={todo.id}>{todo.title}</div>)}
    </div>
  )
}

export default async function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-6xl m-4">Drizzle Todos</h1>
      <TodoCreator />
      {/* @ts-expect-error */}
      <TodoList />
    </main>
  )
}
