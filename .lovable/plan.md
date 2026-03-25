

## Plano: Alinhar beneficios da LP com as paginas de produto da Hotmart

### Analise comparativa

**21 Checklists** — A pagina de checkout da Hotmart lista os 21 checklists individualmente (Inicio de Obra, Primeiro dia de obra, Levantamento, Demolicao, Hidraulica, etc.). Na LP atual, eles estao agrupados em 11 itens (ex: "Inicio de Obra e Primeiro Dia", "Levantamento e Demolicao"). Alem disso, a Hotmart destaca o resultado: "Obras mais organizadas. Clientes mais satisfeitos. Voce mais segura, com menos retrabalho e mais tempo livre."

**E-book Domine a Sua Obra** — A pagina da Hotmart estrutura o conteudo em 3 pilares claros:
1. Planejamento de Obra de Interiores na pratica (cronograma e orcamento)
2. Acompanhamento das Etapas da Obra (Cinza, Branca e Colorida)
3. Habilidades tecnicas + habilidades emocionais (comunicacao, imprevistos, controle emocional)

E define "Quem precisa": arquitetas que se sentem perdidas na fase de obra, quem quer se posicionar como lider, quem quer mais organizacao e previsibilidade, quem esta sempre apagando incendio.

### Alteracoes no arquivo `client/src/pages/Materiais.tsx`

**1. Expandir benefits dos Checklists (linhas 85-97)**
Substituir os 11 itens agrupados pelos 21 checklists individuais, exatamente como na Hotmart:
- Inicio de Obra
- Primeiro dia de obra
- Levantamento
- Demolicao
- Hidraulica
- Ar-condicionado
- Eletrica
- Impermeabilizacao
- Construcao
- Revestimentos
- Forro de Gesso
- Portas e Janelas
- Pintura
- Iluminacao
- Piso Vinilico
- Piso de Madeira
- Marcenaria
- Marmoraria
- Vidros (Box e Espelhos)
- Vidros (Fechamento de Varanda)
- Verificacoes Finais

**2. Atualizar description dos Checklists (linha 83)**
Reforcar a mensagem de resultado: "Evite esquecimentos, ganhe tempo e entregue com mais seguranca e profissionalismo. Criados com base em mais de 20 anos de vivencia pratica em obras de interiores."

**3. Atualizar benefits do E-book (linhas 114-121)**
Alinhar com os 3 pilares da Hotmart, mais detalhados:
- Planejamento de Obra na pratica: prioridades, cronograma e orcamento
- Etapas da Obra: Fase Cinza, Branca e Colorida
- Como organizar sua rotina de visita e conferencia
- Comunicacao eficiente com cliente, equipe e fornecedores
- Gestao de imprevistos e como evitar retrabalho
- Habilidades emocionais: controle emocional e postura de lider
- Metodologia exclusiva da Inovando Arquitetura

**4. Atualizar painPoints do E-book (linhas 122-127)**
Alinhar com "Quem precisa desse ebook" da Hotmart:
- Se sente perdida quando comeca a fase de obra
- Quer se posicionar como lider na obra, mas nao sabe como
- Sente que esta sempre apagando incendio, mesmo quando o projeto esta lindo
- Quer mais organizacao, previsibilidade e menos estresse na obra

**5. Atualizar description do E-book (linha 112)**
Usar a descricao da Hotmart: "Um guia completo para todos os profissionais que querem entender, de forma pratica, como entregar uma obra sem dor de cabeca. Descubra a metodologia exclusiva de gerenciamento de obras da Inovando Arquitetura."

**6. Ajustar label da secao de benefits no card dos Checklists (linha 659)**
Mudar de "21 Checklists incluidos" para "Os 21 checklists que voce recebe" para reforcar o entregavel.

**7. Ajustar layout do card de Checklists**
Como serao 21 itens, organizar em 2 colunas no desktop para nao ficar um card muito longo.

### Resumo de impacto
- Arquivo unico alterado: `client/src/pages/Materiais.tsx`
- Dados de produto (PRODUCTS object) + layout do card de checklists
- Nenhuma mudanca estrutural, apenas copy e alinhamento com o entregavel real

