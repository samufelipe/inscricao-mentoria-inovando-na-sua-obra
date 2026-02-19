

## Plano Definitivo: Corrigir o Erro 404 na Vercel

### Causa Raiz (Diagnostico Preciso)

O Vite esta configurado para gerar o build na pasta `dist/public`:

```text
vite.config.ts -> outDir: "dist/public"
```

Mas a Vercel, ao detectar um projeto Vite, assume automaticamente que a pasta de saida e `dist`. Como o `index.html` compilado esta em `dist/public` mas a Vercel procura em `dist`, ela nao encontra nada e retorna 404 para todas as rotas.

O `vercel.json` atual tem apenas regras de rewrite, mas nao informa a Vercel onde esta o build.

### Solucao (1 unica alteracao)

Adicionar `"outputDirectory": "dist/public"` ao `vercel.json` para que a Vercel saiba exatamente onde encontrar os arquivos compilados.

### Arquivo a Alterar

| Arquivo | Alteracao |
|---|---|
| `vercel.json` | Adicionar `"outputDirectory": "dist/public"` |

O arquivo ficara assim:

```json
{
  "outputDirectory": "dist/public",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Resultado Esperado

Apos essa alteracao e um novo deploy na Vercel:
- A rota `/` mostrara o placeholder "Inovando na Sua Obra"
- A rota `/alem-da-tendencia` mostrara a LP do evento completa
- Qualquer outra rota mostrara a pagina 404 do projeto

### Proximo Passo do Usuario

Apos o deploy funcionar, fazer um novo deploy na Vercel (nao precisa limpar cache, basta redeploy normal).

