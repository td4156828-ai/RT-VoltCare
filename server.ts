import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API route for support chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are the 24/7 expert support assistant for "RT VoltCare", an electrical services provider in Barasat, Madhyamgram, and surrounding areas of North 24 Parganas. 
          Your goals:
          1. Provide professional, helpful, and technically accurate answers about electrical problems, safety, and services.
          2. Represent the business owners: Tanmoy Debnath and Rahul Mahato.
          3. Emphasize that "RT VoltCare" provides fast, reliable, and affordable services.
          4. If a problem sounds dangerous (e.g., sparks, burning smell, total power loss, water on electrical lines), advise the customer to turn off the main switch and call the expert team immediately at 8013026363.
          5. Be polite and patient. Answer in the language the user speaks (English or Bengali).
          6. Mention that we provide services like House Wiring, MCB Box Setup, Light & Fan Installation, Socket Replacement, Water Pump Connection, Fault Detection, and Inverter Line setup.
          7. Our main contact number is 8013026363. We are available 24/7.
          8. If the user asks for a physical visit, suggest they call the number provided.`,
        },
        history: history || [],
      });

      const result = await chat.sendMessage({ message });
      res.json({ text: result.text });
    } catch (error) {
      console.error("Chat Error:", error);
      res.status(500).json({ error: "Failed to get response from AI support" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
