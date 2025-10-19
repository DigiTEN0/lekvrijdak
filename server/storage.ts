import { type User, type InsertUser, type Quote, type InsertQuote } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createQuote(quote: InsertQuote): Promise<Quote>;
  getQuotes(): Promise<Quote[]>;
  getQuote(id: string): Promise<Quote | undefined>;
  updateQuoteStatus(id: string, status: string): Promise<Quote | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quotes: Map<string, Quote>;

  constructor() {
    this.users = new Map();
    this.quotes = new Map();
    
    const adminId = randomUUID();
    const adminUser: User = {
      id: adminId,
      email: "info@lekvrijdak.nl",
      password: "lekvrijdak123!",
    };
    this.users.set(adminId, adminUser);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = randomUUID();
    const quote: Quote = {
      id,
      serviceType: insertQuote.serviceType,
      name: insertQuote.name,
      email: insertQuote.email,
      phone: insertQuote.phone,
      postalCode: insertQuote.postalCode,
      typeOpdracht: insertQuote.typeOpdracht || null,
      typeWerkzaamheden: insertQuote.typeWerkzaamheden || null,
      aantalDakgoten: insertQuote.aantalDakgoten || null,
      lengteDakgoten: insertQuote.lengteDakgoten || null,
      oppervlakte: insertQuote.oppervlakte || null,
      uitvoerdatum: insertQuote.uitvoerdatum || null,
      projectOmschrijving: insertQuote.projectOmschrijving,
      status: "Nieuw",
      createdAt: new Date(),
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async getQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values()).sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async updateQuoteStatus(id: string, status: string): Promise<Quote | undefined> {
    const quote = this.quotes.get(id);
    if (!quote) return undefined;
    
    const updatedQuote = { ...quote, status };
    this.quotes.set(id, updatedQuote);
    return updatedQuote;
  }

  async deleteQuote(id: string): Promise<boolean> {
    return this.quotes.delete(id);
  }
}

export const storage = new MemStorage();
