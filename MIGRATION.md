# SEAPS Reports - Migração para WeasyPrint

## 📋 Visão Geral

Sistema refatorado para geração de relatórios em PDF usando **WeasyPrint** (Python) em vez de Puppeteer, mantendo a API Node.js/Express.

## 🏗️ Arquitetura

### Componentes

1. **API Node.js** (`src/index.js`)
   - Recebe requisições HTTP
   - Renderiza HTML usando React SSR
   - Delega geração de PDF para Python
   - Retorna PDF ao cliente

2. **Gerador Python** (`src/python/pdf_generator.py`)
   - Recebe HTML via stdin
   - Converte para PDF usando WeasyPrint
   - Retorna PDF via stdout

3. **Utilitário de Comunicação** (`src/utils/pdfGenerator.js`)
   - Gerencia comunicação entre Node.js e Python
   - Usa child_process.spawn
   - Trata erros e logs

## 🚀 Setup

### Desenvolvimento Local

#### 1. Instalar Dependências Node.js
```bash
npm install
```

#### 2. Instalar Dependências Python
```bash
# Usando pip
pip3 install -r requirements.txt

# Ou usando sistema de pacotes (Ubuntu/Debian)
sudo apt-get install python3-weasyprint python3-pip
```

#### 3. Configurar Variáveis de Ambiente
```bash
cp .env.example .env
# Editar .env com suas configurações
```

#### 4. Executar
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

### Docker

```bash
# Build
docker build -t seaps-reports .

# Run
docker run -p 3000:3000 --env-file .env seaps-reports
```

## 📦 Dependências

### Node.js
- express
- react / react-dom
- winston (logging)
- Removido: ~~puppeteer~~

### Python
- WeasyPrint >= 62.3
- Pillow >= 11.1.0

## 🔧 Como Funciona

### Fluxo de Geração de PDF

```
Cliente → POST /
    ↓
Express recebe dados
    ↓
React renderiza HTML (SSR)
    ↓
HTML + CSS inline
    ↓
pdfGenerator.js spawn Python
    ↓
Python recebe JSON via stdin
    ↓
WeasyPrint converte HTML → PDF
    ↓
PDF retornado via stdout
    ↓
Buffer enviado ao cliente
```

### Exemplo de Código

```javascript
// Antes (Puppeteer)
const browser = await puppeteer.launch({...});
const page = await browser.newPage();
await page.setContent(html);
const pdf = await page.pdf({...});

// Depois (WeasyPrint via Python)
const pdf = await generatePDF(html);
```

## 🎯 Vantagens da Migração

1. **Performance**: WeasyPrint é mais leve que Chromium
2. **Recursos**: Menor consumo de memória
3. **Deploy**: Imagem Docker ~300MB menor
4. **CSS Print**: Suporte nativo a @page e media queries
5. **Manutenção**: Menos dependências complexas

## 🔍 Troubleshooting

### Python não encontrado
```bash
# Verificar instalação
which python3

# Se necessário, criar symlink
ln -s /usr/bin/python3 /usr/bin/python
```

### Erro ao gerar PDF
- Verificar logs em `logs/`
- Modo desenvolvimento salva HTML em `/tmp/report-*.html`
- Testar HTML manualmente:
  ```bash
  echo '{"html":"<html>...</html>"}' | python3 src/python/pdf_generator.py > test.pdf
  ```

### Fontes não carregadas
- Verificar se Google Fonts está acessível
- Alternativa: baixar fontes e servir localmente

## 📝 Endpoints

### `POST /`
Gera PDF a partir de dados

**Request:**
```json
{
  "sid": "0006/25",
  "organization": { "name": "..." },
  "property": { "name": "...", "person": {...} },
  ...
}
```

**Response:** PDF binary (application/pdf)

### `GET /view`
Visualiza HTML renderizado (útil para debug)

## 🧪 Testando

```bash
# Testar geração de PDF
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d @test-data.json \
  -o output.pdf

# Visualizar HTML
curl http://localhost:3000/view > output.html
```

## 📚 Referências

- [WeasyPrint Documentation](https://doc.courtbouillon.org/weasyprint/)
- [CSS Paged Media](https://www.w3.org/TR/css-page-3/)
- [Node.js Child Process](https://nodejs.org/api/child_process.html)

## 🔐 Segurança

- Validar entrada antes de renderizar
- Sanitizar HTML se aceitar conteúdo de usuários
- Limitar tamanho de payloads
- Rate limiting recomendado para produção

## 🎨 Customização de CSS

WeasyPrint suporta CSS print media queries:

```css
@page {
  size: A4;
  margin: 2cm;
}

@media print {
  .no-print { display: none; }
}
```

---

**Migração concluída por:** Sistema automatizado
**Data:** Janeiro 2026
**Versão:** 2.0.0
