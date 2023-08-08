import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const usersTable = pgTable("usersauth", {
  id: serial("id").unique(),
  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 80 }).unique().notNull().primaryKey(),
  passwordHash: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("createdat").defaultNow().notNull(),
  phone: varchar("phone", { length: 30 }),
});

// const insertUserSchema = createInsertSchema(usersTable);
// const selectUserSchema = createSelectSchema(usersTable);

export const db = drizzle(sql);
