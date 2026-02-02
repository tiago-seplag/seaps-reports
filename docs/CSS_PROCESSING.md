# Processamento CSS para WeasyPrint

## Problema

WeasyPrint tem compatibilidade limitada com features modernas do Tailwind CSS:
- Não suporta `@layer` directives
- CSS Grid tem suporte parcial
- Não processa `@supports`
- Animações e transitions não funcionam em PDF
- Arbitrary values do Tailwind podem causar problemas

## Solução Implementada

### 1. Processador CSS (`src/utils/cssProcessor.js`)

Realiza limpeza e otimização do CSS:

**Features removidas:**
- ✂️ `@layer` directives
- ✂️ `@supports` queries
- ✂️ Animações e transitions
- ✂️ Pseudo-classes interativas (`:hover`, `:focus`)
- ✂️ `backdrop-filter` e filtros complexos
- ✂️ CSS Variables complexas com `calc()`
- ✂️ `will-change`, `aspect-ratio`

**Conversões aplicadas:**
- 🔄 `display: grid` → `display: table`
- 🔄 `gap` → `margin` (quando apropriado)
- 🔄 Features modernas → Fallbacks compatíveis

### 2. Critical CSS Extraction

Extrai apenas as classes CSS realmente usadas no HTML, reduzindo o tamanho:

```javascript
const optimizedCSS = optimizeCSSForPDF(rawCSS, html);
// Original: ~500KB → Otimizado: ~50KB
```

### 3. Uso

```javascript
// Automático no endpoint POST /
const optimizedCSS = optimizeCSSForPDF(rawCSS, html);
```

## CSS Base para WeasyPrint

Arquivo específico: `src/public/paged-weasyprint.css`

**Suporte a @page rules:**
```css
@page {
  size: A4;
  margin: 5mm 5mm 25mm;
  @bottom-center {
    content: counter(page) "/" counter(pages);
  }
}
```

**Page break controls:**
```css
h1, h2, h3 {
  page-break-after: avoid;
}

table {
  page-break-inside: auto;
}
```

## Benefícios

✅ **Compatibilidade** - CSS limpo e compatível com WeasyPrint  
✅ **Performance** - 90% menos CSS para processar  
✅ **Qualidade** - PDFs sem erros de renderização  
✅ **Manutenção** - Tailwind continua usado no desenvolvimento  
✅ **Debug** - HTML temporário salvo com CSS processado

## Workflow

```
Tailwind CSS (dev)
      ↓
Build CSS (styles.css)
      ↓
cssProcessor.js
  - Remove @layer
  - Remove animations
  - Convert modern features
  - Extract critical CSS
      ↓
Optimized CSS
      ↓
WeasyPrint PDF ✅
```

## Alternativas Consideradas

1. **Inline Styles** - Muito verboso, difícil manutenção
2. **CSS puro** - Perde benefícios do Tailwind
3. **Processor** ✅ - Melhor dos dois mundos

## Dicas

- Use classes Tailwind simples quando possível
- Evite arbitrary values complexos: `[calc(100%-20px)]`
- Teste sempre em desenvolvimento (`/tmp/report-*.html`)
- Adicione regras específicas em `paged-weasyprint.css`

## Troubleshooting

**CSS não aplicado:**
- Verificar logs: `cssProcessor` mostra tamanho antes/depois
- Inspecionar HTML temporário em `/tmp/`

**Quebras de página ruins:**
- Ajustar `page-break-*` em `paged-weasyprint.css`

**Fontes não carregadas:**
- WeasyPrint precisa baixar Google Fonts
- Considere fontes locais para produção
