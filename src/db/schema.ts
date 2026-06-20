import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users table mapping Firebase UID to local integer ID
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Resume analyses table containing the full AI parsed JSON result
export const resumeAnalyses = pgTable('resume_analyses', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  fileName: text('file_name').notNull(),
  analysisResult: text('analysis_result').notNull(), // JSON string representing CareerAnalysisResult
  createdAt: timestamp('created_at').defaultNow(),
});

// Chat messages table storing personalized career advice history
export const chatMessages = pgTable('chat_messages', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  role: text('role').notNull(), // 'user' or 'assistant'
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  resumeAnalyses: many(resumeAnalyses),
  chatMessages: many(chatMessages),
}));

export const resumeAnalysesRelations = relations(resumeAnalyses, ({ one }) => ({
  user: one(users, {
    fields: [resumeAnalyses.userId],
    references: [users.id],
  }),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  user: one(users, {
    fields: [chatMessages.userId],
    references: [users.id],
  }),
}));
