import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  empId: integer().notNull(),
  role: varchar({ length: 255 }).notNull(),
  branch: varchar({ length: 50 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});


export const jobsTable = pgTable("jobs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  branch: varchar({ length: 50 }).notNull(),
  vehicleNumber: varchar({ length: 50 }).notNull(),
  orderNumber: varchar({ length: 30 }).notNull(),
  plannedDuration: integer().notNull(),
  status: varchar({ length: 255 }).notNull(),
  startTime: timestamp().notNull().defaultNow(),
  
});

export type Job = typeof jobsTable.$inferSelect;
export type NewJob = typeof jobsTable.$inferInsert;

