import logger from "./logger";

/**
 * Processa CSS do Tailwind para ser compatível com WeasyPrint
 * Remove features modernas não suportadas e otimiza para PDF
 * @param {string} css - CSS original
 * @returns {string} CSS processado e compatível
 */
export const processCSSForWeasyPrint = (css) => {
  try {
    let processedCSS = css;

    // 1. Remover @layer directives (não suportado pelo WeasyPrint)
    processedCSS = processedCSS.replace(/@layer\s+[^{]+\{/g, "");
    processedCSS = processedCSS.replace(/\}\s*\/\*\s*@layer\s*\*\//g, "");

    // 2. Remover @supports (não necessário para PDF)
    processedCSS = processedCSS.replace(/@supports[^{]+\{[\s\S]*?\}\s*\}/g, "");

    // 3. Remover animações e transitions (não funcionam em PDF)
    processedCSS = processedCSS.replace(
      /(animation|transition|transform):[^;]+;/g,
      ""
    );
    processedCSS = processedCSS.replace(/@keyframes[^{]+\{[\s\S]*?\}\s*\}/g, "");

    // 4. Remover pseudo-classes interativas
    processedCSS = processedCSS.replace(
      /(\.|#)[^{]*:(hover|focus|active|visited)[^{]*\{[^}]*\}/g,
      ""
    );

    // 5. Simplificar CSS Variables complexas
    // Manter apenas variáveis essenciais, remover as muito complexas
    processedCSS = processedCSS.replace(
      /--tw-[a-z-]+:\s*[^;]*calc\([^)]+\)[^;]*;/g,
      ""
    );

    // 6. Remover backdrop-filter e filters complexos
    processedCSS = processedCSS.replace(
      /(backdrop-filter|filter):[^;]+blur[^;]+;/g,
      ""
    );

    // 7. Converter modern CSS para compatível
    // will-change não é suportado
    processedCSS = processedCSS.replace(/will-change:[^;]+;/g, "");

    // 8. Remover aspect-ratio (pode causar problemas)
    processedCSS = processedCSS.replace(/aspect-ratio:[^;]+;/g, "");

    // 9. Limpar espaços em branco excessivos
    processedCSS = processedCSS.replace(/\n\s*\n/g, "\n");
    processedCSS = processedCSS.replace(/^\s+/gm, "");

    // 10. Remover comentários
    processedCSS = processedCSS.replace(/\/\*[\s\S]*?\*\//g, "");

    // 11. Converter algumas features modernas para fallbacks
    processedCSS = convertModernFeatures(processedCSS);

    logger.info(
      `CSS processado: ${css.length} → ${processedCSS.length} bytes`
    );

    return processedCSS;
  } catch (error) {
    logger.error(`Erro ao processar CSS: ${error.message}`);
    // Retornar CSS original em caso de erro
    return css;
  }
};

/**
 * Converte features CSS modernas para equivalentes compatíveis
 * @param {string} css - CSS a converter
 * @returns {string} CSS convertido
 */
const convertModernFeatures = (css) => {
  let converted = css;

  // Converter grid moderno para table quando possível
  // (WeasyPrint tem suporte limitado a CSS Grid)
  converted = converted.replace(
    /display:\s*grid;/g,
    "display: table; width: 100%;"
  );

  // Converter gap para margin quando em flexbox
  converted = converted.replace(
    /\.gap-(\d+)\s*\{[^}]*gap:\s*([^;]+);/g,
    (match, num, value) => {
      return match.replace(/gap:[^;]+;/, `margin: ${value};`);
    }
  );

  return converted;
};

/**
 * Extrai apenas os estilos críticos usados no HTML
 * @param {string} html - HTML do documento
 * @param {string} css - CSS completo
 * @returns {string} CSS filtrado com apenas classes usadas
 */
export const extractCriticalCSS = (html, css) => {
  try {
    // Extrair todas as classes do HTML
    const classRegex = /class="([^"]+)"/g;
    const usedClasses = new Set();
    let match;

    while ((match = classRegex.exec(html)) !== null) {
      const classes = match[1].split(/\s+/);
      classes.forEach((cls) => {
        if (cls) usedClasses.add(cls);
      });
    }

    // Filtrar CSS para manter apenas classes usadas
    const cssLines = css.split("\n");
    const criticalCSS = [];
    let keepBlock = false;
    let currentBlock = "";

    cssLines.forEach((line) => {
      // Se é uma regra CSS (começa com . ou # ou tag)
      if (line.match(/^[\s]*[.#a-zA-Z]/)) {
        // Verificar se alguma classe usada está nesta regra
        const hasUsedClass = Array.from(usedClasses).some((cls) =>
          line.includes(`.${cls}`)
        );
        keepBlock = hasUsedClass || line.match(/^[a-z]+[\s{]/); // Manter tags genéricas
        currentBlock = line;
      } else {
        currentBlock += "\n" + line;
      }

      if (keepBlock) {
        criticalCSS.push(line);
      }

      if (line.includes("}")) {
        keepBlock = false;
        currentBlock = "";
      }
    });

    const result = criticalCSS.join("\n");
    logger.info(
      `Critical CSS: ${usedClasses.size} classes, ${css.length} → ${result.length} bytes`
    );

    return result;
  } catch (error) {
    logger.error(`Erro ao extrair critical CSS: ${error.message}`);
    return css;
  }
};

/**
 * Processa CSS completo: limpa + extrai critical + otimiza
 * @param {string} css - CSS original
 * @param {string} html - HTML do documento (opcional, para critical CSS)
 * @returns {string} CSS otimizado para WeasyPrint
 */
export const optimizeCSSForPDF = (css, html = null) => {
  // 1. Processar para compatibilidade com WeasyPrint
  let optimized = processCSSForWeasyPrint(css);

  // 2. Se HTML fornecido, extrair apenas critical CSS
  if (html) {
    optimized = extractCriticalCSS(html, optimized);
  }

  return optimized;
};
