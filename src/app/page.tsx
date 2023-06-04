import TodoCreator from "./components/TodoCreator"
import type { Todo } from '../db/schema/todos'
import { todos } from '../db/schema/todos'
import db from '../db/db'
import TodoCard from './components/TodoCard'

async function getTodos(): Promise<Todo[]> {
  const selectResult = await db.select().from(todos)
  return selectResult
}



async function TodoList() {
  const data = await getTodos()

  return (
    <div className="bg-gray-500 w-full rounded-md p-2">
      {
        data.length > 0
          ? data.map((todo, index) => <TodoCard key={todo.id} index={index} data={todo} />)
          : <p>Empty</p>
      }
    </div>
  )
}

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-6xl m-4">Drizzle Todos</h1>
      <TodoCreator />
      <TodoList />
    </main>
  )
}
