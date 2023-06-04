// import { sql } from '@vercel/postgres'
// import { drizzle } from 'drizzle-orm/vercel-postgres'
// import { migrate } from 'drizzle-orm/postgres-js/migrator'

// const db = drizzle(sql)

// migrate(db as any, { migrationsFolder: "src/db/migrations" })
//   .then(() => {
//     console.log('Migrations complete!')
//     process.exit(0)
//   })
//   .catch((error) => {
//     console.error('Migrations failed!', error)
//     process.exit(1)
//   })

import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
 
// for migrations
const migrationClient = postgres("postgres://default:lGzNY4ikbA5o@ep-withered-feather-753322-pooler.us-east-1.postgres.vercel-storage.com/verceldb?sslmode=require", { max: 1 })
migrate(drizzle(migrationClient), { migrationsFolder: "src/db/migrations"})
 
// for query purposes
// const queryClient = postgres("postgres://default:lGzNY4ikbA5o@ep-withered-feather-753322-pooler.us-east-1.postgres.vercel-storage.com/verceldb?sslmode=require")
// const db: PostgresJsDatabase = drizzle(queryClient)