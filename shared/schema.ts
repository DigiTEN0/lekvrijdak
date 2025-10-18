import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const quotes = pgTable("quotes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  serviceType: text("service_type").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  postalCode: text("postal_code").notNull(),
  typeOpdracht: text("type_opdracht"),
  typeWerkzaamheden: text("type_werkzaamheden"),
  aantalDakgoten: text("aantal_dakgoten"),
  lengteDakgoten: text("lengte_dakgoten"),
  oppervlakte: text("oppervlakte"),
  uitvoerdatum: text("uitvoerdatum"),
  projectOmschrijving: text("project_omschrijving").notNull(),
  status: text("status").notNull().default("Nieuw"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
  status: true,
}).extend({
  name: z.string().min(2, "Naam is verplicht"),
  email: z.string().email("Ongeldig e-mailadres"),
  phone: z.string().min(10, "Telefoonnummer is verplicht"),
  postalCode: z.string().min(4, "Postcode is verplicht"),
  projectOmschrijving: z.string().min(10, "Beschrijf uw project in minimaal 10 tekens"),
});

export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;

export const serviceTypes = [
  "Dakdekken",
  "Dakgoten",
  "Daklekkage",
  "Dakonderhoud",
  "Dakpannen",
  "Dakreparatie",
  "EPDM dakbedekking",
  "Platte daken",
  "Schoorstenen",
  "Stormschade",
] as const;

export const quoteStatuses = ["Nieuw", "In behandeling", "Offerte verstuurd", "Voltooid", "Afgewezen"] as const;
