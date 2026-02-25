import express from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Route-specific OG meta tags for /alem-da-tendencia
  app.get("/alem-da-tendencia", (req, res) => {
    const indexPath = path.join(staticPath, "index.html");
    let html = fs.readFileSync(indexPath, "utf-8");

    const host = req.get("host") || "inovandonasuaobra.com.br";
    const protocol = req.protocol || "https";
    const ogImageUrl = `${protocol}://${host}/images/alem-da-tendencia/og-logo.png`;
    const pageUrl = `${protocol}://${host}/alem-da-tendencia`;

    const ogTags = `
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Além da Tendência - Evento Presencial" />
    <meta property="og:description" content="Evento presencial exclusivo para arquitetos e designers de interiores. Palestras, networking e conteúdo prático para transformar sua carreira e seus projetos." />
    <meta property="og:image" content="${ogImageUrl}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:site_name" content="Além da Tendência" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Além da Tendência - Evento Presencial" />
    <meta name="twitter:description" content="Evento presencial exclusivo para arquitetos e designers de interiores. Palestras, networking e conteúdo prático para transformar sua carreira e seus projetos." />
    <meta name="twitter:image" content="${ogImageUrl}" />`;

    // Replace <title> with event-specific title
    html = html.replace(
      /<title>.*?<\/title>/,
      `<title>Além da Tendência - Evento Presencial</title>`
    );

    // Inject OG tags after <head>
    html = html.replace("<head>", `<head>${ogTags}`);

    // Change favicon for this route
    html = html.replace(
      /(<link rel="icon"[^>]*>)/,
      `<link rel="icon" href="/favicon-alem-da-tendencia.png" type="image/png" />`
    );

    res.send(html);
  });

  // Handle client-side routing - serve index.html for all routes (domain principal inalterado)
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
