
# Guia Completo: Migrar LP para inovandonasuaobra.com.br (Raiz)

## Resumo da Situação

Você quer que a página `/mentoria` do Lovable substitua completamente o site atual em `inovandonasuaobra.com.br`, ficando acessível na **raiz** do domínio.

---

## Opção Recomendada: Domínio Customizado no Lovable

Esta é a forma mais simples e mantém tudo funcionando automaticamente (Edge Functions, SSL, deploys).

### Passo 1: Ajustar a Rota no Código

Antes de conectar o domínio, preciso ajustar o código para que a página de mentoria seja a rota principal (`/`).

**Mudanças necessárias:**
- No `App.tsx`: Trocar a rota da mentoria de `/mentoria` para `/`
- Mover ou remover a página Index atual
- Atualizar links internos e referências

### Passo 2: Conectar Domínio no Lovable

1. No Lovable, clique no nome do projeto (canto superior esquerdo)
2. Vá em **Settings** → **Domains**
3. Clique em **Connect Domain**
4. Digite: `inovandonasuaobra.com.br`

### Passo 3: Configurar DNS no cPanel

O Lovable vai mostrar os registros DNS necessários. No cPanel:

1. Acesse **Zone Editor** ou **DNS Zone Editor**
2. **Delete** todos os registros A existentes para `@` (raiz)
3. **Delete** todos os registros A existentes para `www`
4. **Adicione** os seguintes registros:

| Tipo | Nome | Valor | TTL |
|------|------|-------|-----|
| A | @ | 185.158.133.1 | 3600 |
| A | www | 185.158.133.1 | 3600 |
| TXT | _lovable | (valor fornecido pelo Lovable) | 3600 |

### Passo 4: Aguardar Propagação

- Pode levar de **10 minutos a 72 horas**
- Verifique em: https://dnschecker.org

### Passo 5: Publicar o Projeto

Após o DNS propagar e o Lovable verificar:
1. Clique em **Publish** no Lovable
2. O site estará disponível em `inovandonasuaobra.com.br`

---

## O Que Acontece com as Integrações

### Edge Functions (Supabase)
- **Continuam funcionando automaticamente**
- URL permanece: `https://npthhlpmffjqwivarvpw.supabase.co/functions/v1/`
- Não precisa alterar nada

### RD Station
- **Continua funcionando automaticamente**
- A API key está salva no Supabase (secrets)
- Os eventos de conversão (`checkout-mentoria`) funcionam normalmente

### Hotmart Webhook
- **Precisa atualizar** a URL do webhook no painel da Hotmart
- De: URL atual do Lovable
- Para: `https://npthhlpmffjqwivarvpw.supabase.co/functions/v1/hotmart-webhook`
- (A URL do Supabase NÃO muda, então provavelmente já está correto)

### Google Tag Manager (GTM-KSNCJ6GL)
- **Funciona automaticamente**
- O GTM carrega via JavaScript, independente do domínio
- Os eventos do dataLayer continuam funcionando

### Imagens do WordPress CDN
- **Continuam funcionando**
- As imagens já estão hospedadas em `inovandonasuaobra.com.br/wp-content/uploads/`
- Como você vai substituir o site, precisa manter a pasta `wp-content/uploads` no servidor OU migrar as imagens para outro lugar

---

## Considerações Importantes sobre as Imagens

### Problema Potencial
A página usa imagens do WordPress em URLs como:
```
https://inovandonasuaobra.com.br/wp-content/uploads/2025/...
```

Se você **deletar completamente** o WordPress do servidor, essas imagens vão parar de funcionar.

### Soluções Possíveis

1. **Manter os arquivos de upload** (Recomendado)
   - Antes de deletar o WordPress, faça backup da pasta `wp-content/uploads`
   - Configure o cPanel para servir esses arquivos estáticos junto com o domínio apontando para o Lovable
   - Isso pode ser complexo de configurar

2. **Migrar imagens para CDN externo**
   - Subir as imagens para Cloudinary, imgix, ou Supabase Storage
   - Atualizar as URLs no código

3. **Usar proxy no cPanel**
   - Configurar `.htaccess` para que `/wp-content/uploads/` sirva arquivos locais
   - Resto redireciona para o Lovable

---

## Roteiro Passo a Passo Simplificado

### Etapa 1: Backup
- Fazer backup completo do site WordPress atual
- Baixar toda a pasta `wp-content/uploads` via FTP

### Etapa 2: Ajustar Código (eu faço isso)
- Trocar rota `/mentoria` para `/`
- Atualizar referências internas

### Etapa 3: Conectar Domínio
- Seguir o fluxo no Lovable Settings → Domains

### Etapa 4: Configurar DNS no cPanel
- Adicionar registros A e TXT conforme instruções do Lovable
- Remover registros conflitantes

### Etapa 5: Configurar Arquivos Estáticos (se necessário)
- Se as imagens quebrarem, configurar fallback ou migrar imagens

### Etapa 6: Testar Tudo
- Verificar se a página carrega
- Testar formulário de lead (RD Station)
- Testar clique no CTA de checkout (Hotmart)
- Verificar se as imagens aparecem
- Testar no mobile

### Etapa 7: Atualizar Webhook Hotmart (se necessário)
- Verificar se a URL do webhook está usando o Supabase (não muda)

---

## Resumo das Mudanças de Código Necessárias

| Arquivo | Mudança |
|---------|---------|
| `src/App.tsx` | Trocar rota de `/mentoria` para `/` |
| `index.html` | Atualizar meta tags OG com nova URL |

---

## Checklist Final de Validação

Após a migração, testar:
- [ ] Página carrega em `inovandonasuaobra.com.br`
- [ ] SSL/HTTPS funcionando
- [ ] Imagens carregando corretamente
- [ ] Formulário de lead funciona (enviar teste)
- [ ] Botão de checkout redireciona para Hotmart
- [ ] UTMs sendo capturados corretamente
- [ ] GTM/DataLayer funcionando (verificar console)
- [ ] Mobile responsivo
- [ ] CTA fixo aparece no mobile

---

## Próximo Passo

Deseja que eu faça as alterações de código necessárias (trocar a rota para `/` e atualizar as meta tags)?

Após isso, você pode:
1. Conectar o domínio no Lovable
2. Configurar o DNS no cPanel
3. Publicar
