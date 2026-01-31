

# Formulário no Hero + Otimização para Leads da Imersão

## Contexto

A campanha de Meta Ads será direcionada para pessoas que **já participaram da Imersão** e já estão cadastradas no RD Station. Precisamos:

1. Coletar nome e e-mail para pré-preencher o checkout da Hotmart
2. **Manter os eventos no RD** para que as jornadas de e-mail funcionem
3. Evitar atrito desnecessário na experiência do usuário

## Esclarecimento Importante

O RD Station **não duplica contatos** - quando você envia uma conversão com um e-mail que já existe, ele apenas:
- Adiciona a nova conversão ao histórico do contato
- Atualiza campos se necessário
- Adiciona novas tags

Então **podemos e devemos continuar enviando os eventos** para que o RD identifique:
- Quem iniciou o checkout da mentoria
- Quem abandonou o carrinho
- Quem comprou

## Fluxo de Eventos no RD Station

```text
┌─────────────────────────────────────────────────────────────────┐
│  LEAD JÁ EXISTE NO RD (veio da Imersão)                        │
│  Tags atuais: [checkout-imersao], [comprou-imersao]            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Preenche formulário na /mentoria                           │
│     → Evento: "checkout-mentoria"                               │
│     → RD adiciona tag [checkout-mentoria] ao contato existente  │
│                                                                 │
│  2. Se não comprar em 10 minutos:                               │
│     → Sweeper dispara: "mentoria-...-carrinho-abandonado"       │
│     → RD adiciona tag [carrinho-abandonado-mentoria]            │
│     → Jornada de recuperação inicia                             │
│                                                                 │
│  3. Se comprar:                                                 │
│     → Webhook Hotmart: "mentoria-...-compra-aprovada"           │
│     → RD adiciona tag [comprou-mentoria]                        │
│     → Jornada de onboarding inicia                              │
│     → Jornada de recuperação para (regra de saída)              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Alterações Propostas

### 1. Formulário no Hero (`src/pages/MentoriaLanding.tsx`)

Substituir o botão "QUERO ENTRAR NA MENTORIA" por um formulário inline:

```text
┌─────────────────────────────────────────────┐
│                                             │
│  [  Seu nome completo               ]       │
│                                             │
│  [  Seu melhor e-mail               ]       │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  QUERO ENTRAR NA MENTORIA ──→      │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  🔒 Seus dados estão seguros               │
│                                             │
└─────────────────────────────────────────────┘
```

**Campos:**
- Nome completo (obrigatório)
- E-mail (obrigatório, validação)

**Ao submeter:**
1. Redireciona para `/checkout/mentoria?email=...&name=...&utm_source=...`
2. O CheckoutBridge registra o intent e envia para RD
3. Usuário vai para Hotmart com dados pré-preenchidos

### 2. Atualizar `src/pages/CheckoutBridge.tsx`

O CheckoutBridge já está configurado corretamente! Ele:
- Chama `log-checkout-intent` que envia evento `checkout-mentoria` para RD
- Redireciona para Hotmart com dados pré-preenchidos

**Ajuste necessário:** Garantir que os parâmetros de telefone não são obrigatórios (campanha só coleta nome + email).

### 3. Confirmar Edge Functions (já corretas)

| Edge Function | Evento RD | Quando dispara |
|---------------|-----------|----------------|
| `log-checkout-intent` | `checkout-mentoria` | Ao submeter formulário |
| `abandonment-sweeper` | `mentoria-inovando-na-sua-obra-carrinho-abandonado` | 10 min sem compra |
| `hotmart-webhook` | `mentoria-inovando-na-sua-obra-compra-aprovada` | Compra aprovada |

### 4. Demais CTAs da Página

Os outros botões "Quero entrar na mentoria" (após pricing e testimonials) podem:

**Opção A:** Scroll suave até o formulário do hero
**Opção B:** Abrir modal com o mesmo formulário
**Opção C:** Redirecionar direto para Hotmart (sem coleta)

Recomendo **Opção A** para manter uma única entrada de dados.

## Arquivos a Modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/pages/MentoriaLanding.tsx` | Adicionar formulário no hero + scroll nos outros CTAs |
| `src/pages/CheckoutBridge.tsx` | Tornar `phone` opcional na chamada |

## Benefícios

| Aspecto | Resultado |
|---------|-----------|
| Experiência do usuário | Formulário simples (só 2 campos) |
| Tracking no RD | Todos os eventos continuam funcionando |
| Jornada de abandono | Sweeper identifica quem abandonou |
| Jornada de compra | Webhook identifica quem comprou |
| Hotmart pre-fill | Dados já vão preenchidos |
| Duplicidade | Não existe - RD atualiza contato |

## Detalhes Técnicos

### Validação do Formulário

```tsx
const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
});
```

### Submit Handler

```tsx
const handleFormSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validar
  const result = formSchema.safeParse(formData);
  if (!result.success) { /* mostrar erros */ }
  
  // Montar URL do checkout com UTMs preservados
  const checkoutUrl = new URL("/checkout/mentoria", window.location.origin);
  checkoutUrl.searchParams.set("email", formData.email);
  checkoutUrl.searchParams.set("name", formData.name);
  
  // Preservar UTMs da URL atual
  const currentParams = new URLSearchParams(window.location.search);
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
    .forEach(param => {
      const value = currentParams.get(param);
      if (value) checkoutUrl.searchParams.set(param, value);
    });
  
  // Redirecionar
  window.location.href = checkoutUrl.toString();
};
```

### Pré-preenchimento no Hotmart

O CheckoutBridge já faz isso quando `CONFIG.hotmart.preFillCheckout` está ativo:

```tsx
if (email) checkoutUrl.searchParams.set("email", email);
if (name) checkoutUrl.searchParams.set("name", name);
```

