/** Telefone com DDD: `(65) 3613-0000` ou `(65) 9 9999-8888`. `--` se vazio. */
export function formatPhone(value: string | null | undefined): string {
  const phone = value?.replace(/\D/g, "");
  if (!phone) return "--";

  return phone.length <= 10
    ? phone.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2")
    : phone
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{1})(\d{4})(\d)/, "$1 $2-$3")
        .slice(0, 16);
}

/**
 * Data no fuso de Mato Grosso: o servidor roda em UTC, e um checklist
 * finalizado às 22h em Cuiabá já seria o dia seguinte em UTC.
 */
export function formatDate(value: Date | null | undefined): string {
  if (!value) return "--";
  return value.toLocaleDateString("pt-BR", { timeZone: "America/Cuiaba" });
}
