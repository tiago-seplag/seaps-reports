import { Footer } from "../ui/footer";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Bad, Good, NA, Regular } from "../ui/icons";
import { TableCell, TableHead } from "../ui/table/table";
import { Indicator } from "../ui/indicator";
import { Line } from "../ui/line";

const Report = ({ data }) => {
  const formatPhone = (str) => {
    if (str) {
      const phone = str.replace(/\D/g, ""); // remove caracteres não numéricos

      return phone.length <= 10
        ? phone
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2")
        : phone
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{1})(\d{4})(\d)/, "$1 $2-$3")
            .slice(0, 16);
    }

    return "--";
  };

  return (
    <>
      <h1 className="text-center text-3xl/8 font-bold">
        CHECKLIST MANUTENÇÃO PREDIAL
      </h1>
      <p className="text-center text-sm">
        Decreto Nº 1387, De 25 de Março de 2025
      </p>
      <Card className={"mb-2"}>
        <Line>
          <Label title={"ÓRGÃO"}>{data.organization?.name}</Label>
          <Label title={"UNIDADE ADMINISTRATIVA"}>{data.property?.name}</Label>
        </Line>
        <Line>
          <Label title={"RESPONSÁVEL PELA UNIDADE"}>
            {data.property.person?.name}
          </Label>
        </Line>
        <Line>
          <Label title={"CARGO"}>{data.property?.person?.role}</Label>
          <Label title={"TEL."}>
            {formatPhone(data.property?.person?.phone)}
          </Label>
        </Line>
        <Line>
          <Label title={"ENDEREÇO"} className={"line-clamp-2 text-wrap"}>
            {data.property?.address}
          </Label>
        </Line>
      </Card>
      <Card className={"mb-2"}>
        <table className="w-full [&_tr:last-child]:border-0">
          <thead>
            <tr>
              <TableHead></TableHead>
              <TableHead className="text-center">
                <Good />
                BOM
              </TableHead>
              <TableHead className="text-center">
                <Regular />
                REGULAR
              </TableHead>
              <TableHead className="text-center">
                <Bad />
                RUIM
              </TableHead>
              <TableHead className="text-center">
                <NA />
                N/A
              </TableHead>
            </tr>
          </thead>
          <tbody>
            {data.checklistItems.map((item) => (
              <tr key={item.id} className="border-primary border-b">
                <TableCell width="60%">{item.item.name}</TableCell>
                <TableCell className="text-center">
                  <input
                    disabled
                    type="radio"
                    value="bom"
                    checked={item.score === 3}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    disabled
                    type="radio"
                    value="regular"
                    checked={item.score === 1}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    disabled
                    type="radio"
                    value="ruim"
                    checked={item.score === -2}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    disabled
                    type="radio"
                    value="ruim"
                    checked={item.score === 0}
                  />
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Indicator score={data.score} />
      <Card>
        <Line>
          <Label title={"RESPONSÁVEL PELA FISCALIZAÇÃO"}>
            {data.user.name}
          </Label>
        </Line>
        <Line>
          <Label title={"CARGO"}>GESTÃO DE PATRIMÔNIO</Label>
          <Label title={"DATA"}>
            {new Date(data.finished_at).toLocaleDateString("pt-BR")}
          </Label>
          <Label className={"flex-0 font-mono"} title={"ASSINATURA"}>
            DIGITAL
          </Label>
        </Line>
      </Card>
      <section className="flex h-full flex-col">
        {data.checklistItems.map(
          (item) =>
            item.score !== 0 && (
              <Card key={item.id} className={"flex break-before-page flex-col"}>
                <Line>
                  <Label title={"ITEM"}>{item.item.name}</Label>
                  <Label title={"PONTUAÇÃO"}>
                    {item.score > 2.5
                      ? "BOM"
                      : item.score < 1.5
                        ? "RUIM"
                        : "REGULAR"}
                  </Label>
                </Line>
                <Line>
                  <Label title={"OBSERVAÇÃO"} className={"text-wrap"}>
                    {item.observation}
                  </Label>
                </Line>
                <div className="grid grid-cols-3 gap-1">
                  {item.images.map((image) => (
                    <figure key={image.id} className="break-inside-avoid">
                      <img
                        className="h-[200px] w-full object-cover"
                        src={
                          process.env.BUCKET_URL +
                          image.image +
                          "?compress=true"
                        }
                        alt="Minha Figura"
                      />
                      {image.observation && (
                        <figcaption>{image.observation}</figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </Card>
            ),
        )}
      </section>
    </>
  );
};

export { Report };
