import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
 
const db = drizzle(sql)
 
migrate(db as any, { migrationsFolder: "drizzle" })

export default db 