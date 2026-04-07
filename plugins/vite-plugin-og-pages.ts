import fs from 'fs';
import path from 'path';

/**
 * Vite plugin that generates route-specific HTML files with OG meta tags
 * and canonical URLs after the build completes.
 */
export default function generateOgPages() {
  return {
    name: 'generate-og-pages',
    closeBundle() {
      const distDir = path.resolve('dist', 'public');
      const indexPath = path.join(distDir, 'index.html');

      if (!fs.existsSync(indexPath)) {
        console.warn('⚠️ dist/public/index.html not found, skipping OG page generation.');
        return;
      }

      const baseHtml = fs.readFileSync(indexPath, 'utf-8');

      // ── HOME (index.html) — inject OG tags + canonical ──
      {
        let html = baseHtml;
        const ogTags = `
    <link rel="canonical" href="https://www.inovandonasuaobra.com.br/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Mentoria Inovando Sua Obra | Gerenciamento de Obras de Interiores" />
    <meta property="og:description" content="Domine o gerenciamento de obra de interiores de maneira lucrativa e eficiente. Mentoria completa com mais de 250 obras gerenciadas." />
    <meta property="og:image" content="https://www.inovandonasuaobra.com.br/images/mentoria/og-mentoria.png" />
    <meta property="og:url" content="https://www.inovandonasuaobra.com.br/" />
    <meta property="og:site_name" content="Inovando na Sua Obra" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Mentoria Inovando Sua Obra | Gerenciamento de Obras de Interiores" />
    <meta name="twitter:description" content="Domine o gerenciamento de obra de interiores de maneira lucrativa e eficiente. Mentoria completa com mais de 250 obras gerenciadas." />
    <meta name="twitter:image" content="https://www.inovandonasuaobra.com.br/images/mentoria/og-mentoria.png" />`;
        html = html.replace('<head>', `<head>${ogTags}`);
        fs.writeFileSync(indexPath, html, 'utf-8');
        console.log('✅ Updated index.html with Home OG meta tags');
      }

      // ── ALÉM DA TENDÊNCIA ──
      {
        let html = fs.readFileSync(indexPath, 'utf-8');
        const ogTags = `
    <link rel="canonical" href="https://www.inovandonasuaobra.com.br/alem-da-tendencia" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Além da Tendência - Evento Presencial" />
    <meta property="og:description" content="Evento presencial durante a semana da Expo Revestir. Palestras, networking e muito conteúdo de qualidade para transformar seu escritório e seus projetos." />
    <meta property="og:image" content="https://www.inovandonasuaobra.com.br/images/alem-da-tendencia/og-logo.png" />
    <meta property="og:url" content="https://www.inovandonasuaobra.com.br/alem-da-tendencia" />
    <meta property="og:site_name" content="Além da Tendência" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Além da Tendência - Evento Presencial" />
    <meta name="twitter:description" content="Evento presencial durante a semana da Expo Revestir. Palestras, networking e muito conteúdo de qualidade para transformar seu escritório e seus projetos." />
    <meta name="twitter:image" content="https://www.inovandonasuaobra.com.br/images/alem-da-tendencia/og-logo.png" />`;
        html = html.replace('<head>', `<head>${ogTags}`);
        html = html.replace(/<title>.*?<\/title>/, '<title>Além da Tendência - Evento Presencial</title>');
        html = html.replace(
          /(<link rel="icon"[^>]*>)/,
          '<link rel="icon" href="/favicon-alem-da-tendencia.png" type="image/png" />'
        );
        const outPath = path.join(distDir, 'alem-da-tendencia.html');
        fs.writeFileSync(outPath, html, 'utf-8');
        console.log('✅ Generated alem-da-tendencia.html with OG meta tags');
      }

      // ── MATERIAIS ──
      {
        let html = fs.readFileSync(indexPath, 'utf-8');
        const ogTags = `
    <link rel="canonical" href="https://www.inovandonasuaobra.com.br/materiais" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Materiais para Obra | Inovando na Sua Obra" />
    <meta property="og:description" content="21 Checklists de Obra + Manual de Gerenciamento da Sua Obra. Ferramentas práticas para arquitetas que querem obras mais organizadas, sem retrabalho e com mais segurança." />
    <meta property="og:image" content="https://www.inovandonasuaobra.com.br/images/materiais/og-materiais.png" />
    <meta property="og:url" content="https://www.inovandonasuaobra.com.br/materiais" />
    <meta property="og:site_name" content="Inovando na Sua Obra" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Materiais para Obra | Inovando na Sua Obra" />
    <meta name="twitter:description" content="21 Checklists de Obra + Manual de Gerenciamento da Sua Obra. Ferramentas práticas para arquitetas que querem obras mais organizadas, sem retrabalho e com mais segurança." />
    <meta name="twitter:image" content="https://www.inovandonasuaobra.com.br/images/materiais/og-materiais.png" />`;
        html = html.replace('<head>', `<head>${ogTags}`);
        html = html.replace(/<title>.*?<\/title>/, '<title>Materiais para Obra | Inovando na Sua Obra</title>');
        const outPath = path.join(distDir, 'materiais.html');
        fs.writeFileSync(outPath, html, 'utf-8');
        console.log('✅ Generated materiais.html with OG meta tags');
      }
    },
  };
}
