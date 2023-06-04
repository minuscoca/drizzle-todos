import { NextResponse, NextRequest } from 'next/server'
import { todos } from '../../../../db/schema/todos'
import db from '../../../../db/db'
import { eq } from "drizzle-orm"
import { revalidateTag } from 'next/cache'

export type NewStatus = {
  status: 'TODO' | 'COMPLETED'
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  if (!id) return NextResponse.error()
  
  try {
    const selectResult = await db.select().from(todos).where(eq(todos.id, Number(id)))
    return NextResponse.json({ data: selectResult })
  } catch (error) {
    NextResponse.json({ error })
  }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  if (!id) return NextResponse.error()
  
  try {
    const deleteResult = await db.delete(todos).where(eq(todos.id, Number(id)))
    return NextResponse.json({ data: deleteResult })
  } catch (error) {
    NextResponse.json({ error })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const body: NewStatus = await request.json()

  if (!id) return NextResponse.error()
  
  try {
    const updaeResult = await db.update(todos)
      .set({ status: body.status })
      .where(eq(todos.id, Number(id)))
      .returning()
    return NextResponse.json({ data: updaeResult })
  } catch (error) {
    NextResponse.json({ error })
  }
}