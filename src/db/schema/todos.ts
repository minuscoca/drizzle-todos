import { InferModel } from 'drizzle-orm'
import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})

export type Todo = InferModel<typeof todos>
export type NewTodo = InferModel<typeof todos, 'insert'>