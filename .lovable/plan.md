

# Correções e Ajustes na LP "Além da Tendência"

## 1. Hero: Remover a foto do abraço (heroLeft)

Remover a imagem `heroLeft` (duas pessoas se abraçando) do hero, mantendo apenas 3 imagens: `heroFar`, `heroMain` e `heroRight`. Ajustar o posicionamento para que a composição fique equilibrada com 3 camadas.

## 2. Seção "O Conceito": Remover imagem e restaurar elementos originais

A imagem grande (`heroMain`) que foi colocada na coluna direita da seção será removida. No lugar, será restaurado o conteúdo conceitual original -- a citação estilizada com aspas e elementos visuais que complementam o texto, sem usar imagem.

## 3. Seção "Para Quem É": Restaurar os cards de perfil

Os 3 cards descritivos de público-alvo (ex: Arquitetas, Designers, Engenheiras) sumiram quando a montagem de fotos foi adicionada. Serão restaurados abaixo da montagem `AudienceMontageV2`.

## 4. Correção dos erros de build

- `variant="white"` não existe no `ArchitecturalSection` -- substituir por `"light"`.
- `SpeakerCard` usa props `description` e `socialProof`, não `topic` e `bio` -- corrigir as props.

---

## Detalhes Técnicos

### Arquivo editado:
- `client/src/pages/AlemDaTendencia.tsx`

### Mudanças específicas:

```text
HERO (linhas 67-108):
  - Remover import de heroLeft (linha 19)
  - Remover bloco da imagem heroLeft (linhas 79-87)
  - Ajustar heroFar para w-[35%] e heroMain para w-[60%] desktop

SEÇÃO O CONCEITO (linhas 258-269):
  - Remover o bloco <motion.div> com a imagem heroMain
  - Substituir por citação estilizada com elementos visuais (aspas decorativas, borda lateral)

SEÇÃO PARA QUEM É (linhas 273-296):
  - Após o <AudienceMontageV2 />, adicionar grid com 3 cards de perfil:
    - Arquitetas e Designers de Interiores
    - Engenheiras e Gestoras de Obra  
    - Empreendedoras do Design

ERROS DE BUILD:
  - Linhas 279, 307, 376: variant="white" → variant="light" (com text color override)
  - Linhas 313-326: SpeakerCard props topic→removido, bio→description, adicionar socialProof
```

