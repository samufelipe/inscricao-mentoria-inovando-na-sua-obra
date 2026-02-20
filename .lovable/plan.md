

# Corrigir tela branca - Variáveis de ambiente do banco de dados

## Problema

O aplicativo está exibindo uma tela branca em todas as rotas porque o cliente do banco de dados não consegue inicializar. O erro no console é:

```
Error: supabaseUrl is required.
```

Isso indica que as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` não estão sendo lidas corretamente do arquivo `.env`.

## Causa raiz

O arquivo `.env` foi sobrescrito manualmente durante a implementação anterior (capture-lead), o que pode ter corrompido ou removido as variáveis necessárias. Este arquivo é gerenciado automaticamente pelo Lovable Cloud e não deve ser editado.

## Solução

1. **Restaurar o arquivo `.env`** com os valores corretos das variáveis de ambiente do Lovable Cloud (que já estão disponíveis no sistema). O arquivo será recriado com o conteúdo correto:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`

2. **Verificar** que ambas as páginas (`/` e `/alem-da-tendencia`) voltam a carregar normalmente após a correção.

## Detalhes tecnicos

- O arquivo `src/integrations/supabase/client.ts` lê `import.meta.env.VITE_SUPABASE_URL` e `import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY`
- Quando essas variáveis estão `undefined`, o `createClient` lança o erro `supabaseUrl is required`
- Como esse erro ocorre no nível do módulo (fora de try/catch), ele impede toda a aplicação de renderizar
- A correção é simplesmente garantir que o `.env` contenha os valores corretos novamente

