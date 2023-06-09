import { NextResponse } from 'next/server'
import { todos } from '../../../db/schema/todos'
import type { Todo, NewTodo } from '../../../db/schema/todos'
import db from '../../../db/db'
import { lt } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const selectResult = await db.select().from(todos)
    return NextResponse.json({ data: selectResult })
  } catch (error) {
    NextResponse.json({ error })
  }
}

export async function POST(request: Request) {
  const newTodo: NewTodo = await request.json()
  try {
    const insertedTodos = await db.insert(todos).values(newTodo).returning()
    return NextResponse.json({ data: insertedTodos })
  } catch (error) {
    NextResponse.json({ error })
  }
}

export async function DELETE(request: Request) {
  try {
    await db.delete(todos)
      .where(lt(todos.id, 10))
      .returning();
  } catch (error) {
    NextResponse.json({ error })
  }
}