import fs from 'fs';
import path from 'path';

/**
 * Vite plugin that generates alem-da-tendencia.html with OG meta tags
 * after the build completes. This ensures crawlers (WhatsApp, LinkedIn, etc.)
 * see the correct preview for the /alem-da-tendencia route.
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

      let html = fs.readFileSync(indexPath, 'utf-8');

      const ogTags = `
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

      // ── Materiais page ──
      let materiaisHtml = fs.readFileSync(indexPath, 'utf-8');

      const materiaisOgTags = `
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

      materiaisHtml = materiaisHtml.replace('<head>', `<head>${materiaisOgTags}`);
      materiaisHtml = materiaisHtml.replace(/<title>.*?<\/title>/, '<title>Materiais para Obra | Inovando na Sua Obra</title>');

      const materiaisOutPath = path.join(distDir, 'materiais.html');
      fs.writeFileSync(materiaisOutPath, materiaisHtml, 'utf-8');
      console.log('✅ Generated materiais.html with OG meta tags');
    },
  };
}
