import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: text("rating").notNull(),
  releaseDate: text("release_date"),
  isUpcoming: boolean("is_upcoming").default(false),
  developer: text("developer"),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id").notNull(),
  author: text("author").notNull(),
  content: text("content").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  likes: integer("likes").default(0),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  newsletter: boolean("newsletter").default(false),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGameSchema = createInsertSchema(games).pick({
  title: true, 
  description: true,
  category: true,
  imageUrl: true,
  rating: true,
  releaseDate: true,
  isUpcoming: true,
  developer: true,
});

export const insertCommentSchema = createInsertSchema(comments).pick({
  gameId: true,
  author: true,
  content: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
  newsletter: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;

export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
