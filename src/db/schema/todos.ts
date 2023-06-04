import { InferModel } from 'drizzle-orm'
import { pgTable, serial, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core'

export const statusEnum = pgEnum('status', ['TODO', 'COMPLETED'])

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  completedAt: timestamp('completedAt'),
  status: statusEnum('status'),
})

export type Todo = InferModel<typeof todos>
export type NewTodo = InferModel<typeof todos, 'insert'>