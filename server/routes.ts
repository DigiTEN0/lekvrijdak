import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteSchema } from "@shared/schema";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { z } from "zod";

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: "Niet geautoriseerd" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  const PgSession = connectPgSimple(session);

  app.use(
    session({
      store: new PgSession({
        conObject: {
          connectionString: process.env.DATABASE_URL,
        },
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET || "lekvrijdak-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(validatedData);
      res.json(quote);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validatie fout", details: error.errors });
      } else {
        res.status(500).json({ error: "Server fout" });
      }
    }
  });

  app.get("/api/quotes", isAuthenticated, async (req, res) => {
    try {
      const quotes = await storage.getQuotes();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ error: "Server fout" });
    }
  });

  app.patch("/api/quotes/:id/status", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: "Status is verplicht" });
      }

      const updatedQuote = await storage.updateQuoteStatus(id, status);
      
      if (!updatedQuote) {
        return res.status(404).json({ error: "Offerte niet gevonden" });
      }

      res.json(updatedQuote);
    } catch (error) {
      res.status(500).json({ error: "Server fout" });
    }
  });

  app.delete("/api/quotes/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await storage.deleteQuote(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Offerte niet gevonden" });
      }

      res.json({ message: "Offerte succesvol verwijderd" });
    } catch (error) {
      res.status(500).json({ error: "Server fout" });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "E-mail en wachtwoord zijn verplicht" });
      }

      const user = await storage.getUserByEmail(email);

      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Ongeldige inloggegevens" });
      }

      req.session.userId = user.id;
      
      res.json({ message: "Succesvol ingelogd", user: { id: user.id, email: user.email } });
    } catch (error) {
      res.status(500).json({ error: "Server fout" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Uitloggen mislukt" });
      }
      res.json({ message: "Succesvol uitgelogd" });
    });
  });

  app.get("/api/admin/check", isAuthenticated, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ error: "Gebruiker niet gevonden" });
      }
      res.json({ user: { id: user.id, email: user.email } });
    } catch (error) {
      res.status(500).json({ error: "Server fout" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
