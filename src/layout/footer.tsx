/**
 * Rodapé de todas as páginas: o `paged.css` tira estes dois blocos do fluxo
 * (`position: running(...)`) e os põe no `@bottom-left` e `@bottom-right`.
 */
export function Footer() {
  return (
    <>
      <div className="logo-footer">
        <img
          src="https://www.seplag.mt.gov.br/documents/d/seplag/logo_seplag-png"
          alt="seplag-logo"
        />
      </div>
      <div className="footer">
        <p>SEAPS</p>
        <p>Secretaria Adjunta de Patrimônio e Serviços</p>
      </div>
    </>
  );
}
