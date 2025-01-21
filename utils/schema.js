import { serial, text, varchar, timestamp ,integer, pgTable} from "drizzle-orm/pg-core";


export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  mockId: varchar("mockId").notNull(),
});


export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef:varchar("mockId").notNull(),
  question:varchar("question").notNull(),
  correctAns:text("answer").notNull(),
  userAns:text("userAns"),
  feedback:text("feedback"),
  rating:varchar("rating"),
  userEmail:varchar("userEmail"),
  createdAt: varchar("createdAt"),
});
