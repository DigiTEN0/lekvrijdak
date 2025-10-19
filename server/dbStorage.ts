import { db } from "./db";
import { users, quotes, type User, type InsertUser, type Quote, type InsertQuote } from "@shared/schema";
import { eq } from "drizzle-orm";
import { IStorage } from "./storage";

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const result = await db.insert(quotes).values(insertQuote).returning();
    return result[0];
  }

  async getQuotes(): Promise<Quote[]> {
    return await db.select().from(quotes).orderBy(quotes.createdAt);
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    const result = await db.select().from(quotes).where(eq(quotes.id, id));
    return result[0];
  }

  async updateQuoteStatus(id: string, status: string): Promise<Quote | undefined> {
    const result = await db
      .update(quotes)
      .set({ status })
      .where(eq(quotes.id, id))
      .returning();
    return result[0];
  }
}

export const storage = new DbStorage();
