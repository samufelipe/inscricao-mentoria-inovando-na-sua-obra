

## Plano: Corrigir a LP da Mentoria - Imagens, Fontes e Erros

### Problemas Identificados

Encontrei 3 problemas criticos que explicam porque a LP esta "completamente diferente":

### 1. Imagens Nao Carregam (Problema de Caminho)

As 20 imagens estao salvas em `client/public/images/mentoria/`, mas o Vite esta configurado com o `root` na raiz do projeto (nao em `client/`). O Vite serve arquivos estaticos da pasta `public/` relativa ao root - ou seja, ele procura em `<raiz>/public/`, que esta **vazia**.

**Solucao:** Mover todas as 20 imagens de `client/public/images/mentoria/` para `public/images/mentoria/` na raiz do projeto (ou ajustar o `publicDir` no vite.config.ts).

A abordagem mais segura e criar a pasta `public/images/mentoria/` no root e copiar os arquivos, pois a pasta `client/public/` ja e usada pela outra pagina (Alem da Tendencia) e alterar o config pode afetar o funcionamento geral.

### 2. Classe de Fonte Incorreta (font-montserrat nao existe)

O CSS (`index.css`) define Montserrat como `--font-display`, que gera a classe Tailwind `font-display`. Porem, o `Home.tsx` usa `font-montserrat` em **todos os 13 titulos** - essa classe nao existe no Tailwind e e ignorada silenciosamente.

**Solucao:** Trocar todas as 55 ocorrencias de `font-montserrat` por `font-display` no `Home.tsx`.

### 3. Erro do Servidor de Desenvolvimento

A preview mostra um "Internal Server Error" relacionado a modulos do Vite. Isso pode ser resolvido apos corrigir as dependencias e caminhos.

### Verificacao da Integracao Hotmart

A integracao com Hotmart esta **corretamente implementada**:
- Formulario Hero: redireciona para `https://pay.hotmart.com/Y93975016X?off=22jnl093` com nome, email e telefone
- Botao Cartao (Pricing): `https://pay.hotmart.com/Y93975016X?off=22jnl093`
- Botao Boleto (Pricing): `https://pay.hotmart.com/Y93975016X?off=et69m72o`

Nenhuma alteracao necessaria nos links de checkout.

### Alteracoes Necessarias

| Arquivo | Acao |
|---|---|
| `public/images/mentoria/` (20 arquivos) | Criar pasta na raiz e mover/copiar as 20 imagens de `client/public/images/mentoria/` |
| `client/src/pages/Home.tsx` | Substituir todas as 55 ocorrencias de `font-montserrat` por `font-display` |

### Detalhes Tecnicos

**Imagens a mover (20 arquivos):**
logo.png, hero-photo.png, skills.png, audience.png, how-works.png, module1.png, module2.png, module3.png, module4.png, bonus1.png, bonus2.png, revenue1.png, revenue2.png, testimonial1.png, testimonial2.png, testimonial3.png, testimonial4.png, guarantee.png, garantia-mobile.png, about.png

**Substituicoes de fonte em Home.tsx:**
Linha 141, 167, 184, 218, 241, 260, 280, 356, 393, 431, 462 (e todas as demais ocorrencias) - trocar `font-montserrat` por `font-display`.

Os caminhos `src` das imagens (`/images/mentoria/xxx.png`) no Home.tsx permanecem iguais - so precisamos que a pasta `public/` esteja no local correto para o Vite servir.

### Resultado Esperado

Apos essas correcoes:
- Todas as 20 imagens carregarao corretamente
- Titulos usarao a fonte Montserrat Bold conforme o design original
- A LP ficara visualmente identica aos screenshots originais
- Links Hotmart continuam funcionando normalmente

