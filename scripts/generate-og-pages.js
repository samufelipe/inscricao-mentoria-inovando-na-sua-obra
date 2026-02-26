import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist', 'public');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('❌ dist/public/index.html not found. Run vite build first.');
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf-8');

const ogTags = `
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Além da Tendência - Evento Presencial" />
    <meta property="og:description" content="Evento presencial exclusivo para arquitetos e designers de interiores. Palestras, networking e conteúdo prático para transformar sua carreira e seus projetos." />
    <meta property="og:image" content="https://www.inovandonasuaobra.com.br/images/alem-da-tendencia/og-logo.png" />
    <meta property="og:url" content="https://www.inovandonasuaobra.com.br/alem-da-tendencia" />
    <meta property="og:site_name" content="Além da Tendência" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Além da Tendência - Evento Presencial" />
    <meta name="twitter:description" content="Evento presencial exclusivo para arquitetos e designers de interiores. Palestras, networking e conteúdo prático para transformar sua carreira e seus projetos." />
    <meta name="twitter:image" content="https://www.inovandonasuaobra.com.br/images/alem-da-tendencia/og-logo.png" />`;

// Inject OG tags after <head>
html = html.replace('<head>', `<head>${ogTags}`);

// Replace title
html = html.replace(/<title>.*?<\/title>/, '<title>Além da Tendência - Evento Presencial</title>');

// Replace favicon
html = html.replace(
  /(<link rel="icon"[^>]*>)/,
  '<link rel="icon" href="/favicon-alem-da-tendencia.png" type="image/png" />'
);

const outPath = path.join(distDir, 'alem-da-tendencia.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('✅ Generated alem-da-tendencia.html with OG meta tags');
