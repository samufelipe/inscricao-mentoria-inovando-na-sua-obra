

## Análise

Concordo com você. As badges **"MATERIAIS DIGITAIS · ACESSO IMEDIATO · GARANTIA 7 DIAS"** estão flutuando sobre os mockups no Hero e competem visualmente com a headline. Removê-las do Hero vai limpar a seção e dar mais destaque à oferta principal.

**Sugestão:** Inserir essas informações como **selos de confiança** logo abaixo do Hero, na seção do banner de urgência ("Oferta por tempo limitado"), ou criar uma mini barra de trust badges entre o Hero e a próxima seção. Isso ficaria mais organizado e reforçaria a segurança no momento certo (próximo aos CTAs ou logo após o primeiro impacto).

## Plano

### 1. Remover badges do Hero
- Remover o bloco `motion.div` com "Materiais Digitais · Acesso Imediato · Garantia 7 Dias" da versão **mobile** (linha ~289) e **desktop** (linha ~453).

### 2. Criar barra de trust badges abaixo do Hero
- Adicionar uma faixa discreta entre o Hero e o banner de urgência (ou integrar ao próprio banner) com os 3 itens: **Materiais Digitais**, **Acesso Imediato**, **Garantia 7 Dias**, usando ícones sutis (ex: download, zap, shield) e estilo consistente com o design da página.

### Arquivo alterado
- `client/src/pages/Materiais.tsx`

