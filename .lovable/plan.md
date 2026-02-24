

## Correção: Dados chegando vazios na planilha do Google Sheets

### Problema

O `mode: "no-cors"` com `fetch` POST para o Google Apps Script causa um redirect 302. O navegador segue o redirect mas converte o POST em GET, **perdendo o body** com os dados. Por isso Nome, Email e WhatsApp chegam vazios na planilha.

### Solução (2 partes)

---

#### Parte 1: Alteração no projeto (feita automaticamente)

**Arquivo: `client/src/lib/google-sheets.ts`**

Trocar de POST com body para **GET com query parameters na URL**. Os parâmetros na URL sobrevivem ao redirect 302. Também usar nomes em minúsculo para coincidir com o que o Apps Script procura via `e.parameter.nome`.

Código final:

```typescript
export async function sendToGoogleSheets(data: {
  name: string;
  email: string;
  whatsapp: string;
  fonte?: string;
}) {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyN9dac97y_fLGRuuu2DIrHO2KJwxSDwV4CiMh16g31mvBqivpQSNoKeSdO-oCd8nrEvw/exec";

  try {
    const now = new Date();
    const brDate = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false,
    }).format(now);

    const params = new URLSearchParams({
      "data_hora": brDate,
      "nome": data.name,
      "email": data.email,
      "whatsapp": data.whatsapp,
      "fonte": data.fonte || "Landing Page",
    });

    await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
      method: "GET",
      mode: "no-cors",
    });

    console.log("Dados enviados para o Google Sheets com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar para o Google Sheets:", error);
  }
}
```

---

#### Parte 2: Atualização no Google Apps Script (feita manualmente por voce)

A funcao `doGet` atual nao processa dados. Voce precisa substituir ela por uma versao que salva os dados, igual ao `doPost`. Copie e cole o codigo completo abaixo no Apps Script, **substituindo todo o conteudo atual**:

```text
// ============================================================================
// SCRIPT DE INTEGRACAO: LANDING PAGE -> GOOGLE SHEETS
// ============================================================================

function doPost(e) {
  return processRequest(e);
}

function doGet(e) {
  return processRequest(e);
}

function processRequest(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('Página1');

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      header = header.toLowerCase();

      if (header === 'data/hora' || header === 'data' || header === 'timestamp') {
        return e.parameter.data_hora || new Date();
      }

      var val = e.parameter[header] || e.parameter[normalizeKey(header)] || '';

      if (!val) {
        if (header.includes('nome')) val = e.parameter.nome || e.parameter.name || '';
        else if (header.includes('email')) val = e.parameter.email || '';
        else if (header.includes('whats') || header.includes('telef') || header.includes('celular'))
          val = e.parameter.whatsapp || e.parameter.telefone || e.parameter.phone || '';
        else if (header.includes('fonte') || header.includes('origem'))
          val = e.parameter.fonte || 'Landing Page';
      }

      return val;
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function normalizeKey(key) {
  return key.toLowerCase().replace(/\s/g, '');
}
```

**Apos colar o codigo, voce precisa:**

1. Salvar (icone de disquete)
2. Ir em **Implantar > Nova implantacao**
3. Tipo: App da Web
4. Executar como: Eu / Quem pode acessar: Qualquer pessoa
5. Clicar em **Implantar**
6. Se a URL mudar, me envie a nova URL para eu atualizar no codigo

### Resumo

| Acao | Quem faz | Motivo |
|------|----------|--------|
| Trocar POST por GET com params na URL | Lovable (automatico) | Params na URL sobrevivem ao redirect 302 |
| Usar nomes em minusculo nos params | Lovable (automatico) | Apps Script procura `e.parameter.nome` |
| Atualizar `doGet` no Apps Script | Voce (manualmente) | Atual `doGet` nao salva dados |
| Nova implantacao do Apps Script | Voce (manualmente) | Necessario para ativar nova versao |

