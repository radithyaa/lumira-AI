import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const userProfile = pgTable(
  "user_profile",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    age: integer("age").notNull(),
    interest: text("interest").notNull(),
    dreamJob: text("dream_job").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => ({
    userProfileUserIdIdx: uniqueIndex("user_profile_user_id_idx").on(
      table.userId
    ),
  })
);

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(user, {
    fields: [userProfile.userId],
    references: [user.id],
  }),
}));
