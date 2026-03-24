

## Plano: Substituir mockups do Hero por novas imagens sem fundo

### O que muda

Substituir as imagens atuais dos mockups (`checklists-mockup.png` e `ebook-mockup.png`) pelas novas imagens enviadas (sem fundo), e reestruturar o layout do Hero, especialmente no mobile.

### Como sera feito

**1. Copiar as novas imagens para o projeto**
- `user-uploads://3d2092c0-...` → `client/src/assets/materiais/checklists-mockup.png` (substituir)
- `user-uploads://ea83a170-...` → `client/src/assets/materiais/ebook-mockup.png` (substituir)

**2. Reestruturar o Hero mobile** (`client/src/pages/Materiais.tsx`)

Nova arquitetura mobile:
```text
┌──────────────────┐
│ [Logo] (top-left) │
│                    │
│  ┌──────┐┌─────┐  │
│  │tablet││phone│  │
│  │check ││ebook│  │
│  └──────┘└─────┘  │
│                    │
│  Headline          │
│  Sub-headline      │
│  [CTA] [CTA]      │
│  badges            │
└──────────────────┘
```

- Logo posicionada no canto superior esquerdo com padding (pt-6 pl-5), fora do bloco de conteudo
- Mockups centralizados abaixo da logo, com o checklist (tablet) levemente maior que o ebook (celular)
- Checklist: `w-[180px]`, Ebook: `w-[140px]` no mobile
- Fade gradient suave na transicao mockups → texto
- Remover a logo duplicada que aparece dentro do bloco de conteudo no mobile

**3. Ajustar o Hero desktop**

- Manter layout lado a lado (conteudo esquerda, mockups direita)
- Checklist um pouco maior: `xl:w-[320px]` (era 300px), proporcionalmente
- Logo permanece no bloco de conteudo (canto superior esquerdo natural)

**4. Ajustes visuais**

- Remover `rotate` das imagens novas (as fotos ja tem perspectiva propria, rotacao adicional ficaria estranho)
- Manter drop-shadow forte para destaque contra fundo escuro
- Manter glow dourado atras dos mockups

### Detalhes tecnicos

- Apenas o arquivo `Materiais.tsx` sera editado (alem da copia dos assets)
- As novas imagens ja vem sem fundo, entao se integram naturalmente ao fundo escuro
- z-index dos mockups permanece abaixo do conteudo textual

