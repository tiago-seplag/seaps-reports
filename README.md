# seaps-reports

Gera os PDFs do SEAPS. Recebe um JSON, renderiza um componente React com
Tailwind em HTML e converte em PDF com o WeasyPrint (Python).

```
POST /reports/:type  ──► schema (Zod) ──► React + Tailwind ──► HTML ──► WeasyPrint ──► PDF
```

## Rodando

```bash
npm install
python3 -m venv venv && venv/bin/pip install -r requirements.txt
cp .env.example .env          # e ajuste PYTHON_BIN=venv/bin/python
npm run dev                   # tailwind --watch + servidor em http://localhost:8080
```

Abra `http://localhost:8080/reports/checklist/preview` para ver o relatório
com o `sample.json` no navegador (o Paged.js simula as páginas). O PDF de
verdade sai do WeasyPrint, que não é um navegador: confira no PDF antes de
dar por pronto.

| Comando             | O que faz                                          |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Servidor com reload e CSS em modo watch             |
| `npm test`          | Testes (o de PDF real só roda se achar o WeasyPrint) |
| `npm run typecheck` | `tsc --noEmit`                                      |
| `npm run build`     | `dist/` (JS + `styles.css`) para produção           |
| `npm start`         | Roda o `dist/`                                      |

Variáveis: veja [.env.example](.env.example). `BUCKET_URL` é obrigatória.

## Rotas

| Rota                            | Descrição                                                  |
| ------------------------------- | ---------------------------------------------------------- |
| `POST /reports/:type`           | Gera o PDF. 400 se o JSON não passa no schema, 404 se o tipo não existe |
| `POST /`                        | O mesmo que `POST /reports/checklist` (o que o seaps-api chama hoje) |
| `GET /reports/:type/preview`    | HTML com o `sample.json` (fora de produção)                 |
| `GET /health`                   | `ok`                                                        |

## Estrutura

```
src/
  app.tsx, server.ts     rotas e listen
  env.ts                 variáveis de ambiente (Zod)
  reports/
    index.ts             registro dos relatórios
    define-report.ts     o contrato de um relatório
    checklist/           um relatório: schema, componente, sample, regras
  layout/                documento HTML e rodapé comuns a todos os PDFs
  ui/                    componentes genéricos (Card, Label, Line, tabela, ícones)
  pdf/                   React -> HTML e HTML -> PDF
  lib/                   logger, cn, formatação
  styles/paged.css       @page (A4, rodapé, numeração) + entrada do Tailwind
python/html_to_pdf.py    WeasyPrint: HTML no stdin, PDF no stdout
```

## Criando um novo tipo de PDF

1. Crie `src/reports/<tipo>/` (copiar `checklist/` é o jeito mais rápido) com:
   - `schema.ts`: o Zod do JSON que vai chegar. Só os campos que o PDF usa.
   - `report.tsx`: o componente; recebe `data` já validado e tipado.
   - `sample.json`: um payload de exemplo (alimenta o preview e os testes).
   - `index.ts`:
     ```ts
     export const vistoria = defineReport({
       schema: vistoriaSchema,
       name: (data) => `vistoria-${data.id}`, // nome do arquivo e <title>
       Component: VistoriaReport,
       sample,
     });
     ```
2. Registre em `src/reports/index.ts`: `export const reports = { checklist, vistoria };`
3. Pronto: `POST /reports/vistoria` e `GET /reports/vistoria/preview` já
   existem, e o teste de `src/reports/reports.test.ts` passa a validar o
   sample e renderizar o novo relatório.

O rodapé, a numeração de páginas e o CSS vêm do layout comum
(`src/layout/document.tsx` e `src/styles/paged.css`). Componentes que só um
relatório usa ficam na pasta dele (`checklist/components/`); os que servem a
mais de um vão para `src/ui/`.

## Cuidados com o WeasyPrint

- **Tailwind fica no v3.** O CSS do v4 (cascade layers, `oklch`, `@property`)
  não é suportado pelo WeasyPrint.
- Não tem JavaScript: o componente precisa produzir o HTML final.
- Flexbox funciona com limitações; grid e tabelas são mais previsíveis.
- Quebra de página: `break-before-page` e `break-inside-avoid` (classes do
  Tailwind) funcionam.
- Avisos do WeasyPrint (ex.: foto que não carregou) aparecem no log como
  `warn`; os do reset do Tailwind são filtrados em `python/html_to_pdf.py`.
