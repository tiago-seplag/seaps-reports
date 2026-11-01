import { formatDate, formatPhone } from "../../lib/format";
import { Card } from "../../ui/card";
import { Label } from "../../ui/label";
import { Line } from "../../ui/line";
import { Indicator } from "./components/indicator";
import { ItemDetails } from "./components/item-details";
import { ScoreTable } from "./components/score-table";
import type { Checklist } from "./schema";

export function ChecklistReport({ data }: { data: Checklist }) {
  const person = data.property.person;

  return (
    <>
      <h1 className="text-center text-3xl/8 font-bold">
        CHECKLIST MANUTENÇÃO PREDIAL
      </h1>
      <p className="text-center text-sm">
        Decreto Nº 1387, De 25 de Março de 2025
      </p>

      <Card className="mb-2">
        <Line className="gap-4">
          <Label title="ÓRGÃO">{data.organization?.name}</Label>
          <Label
            title="UNIDADE ADMINISTRATIVA"
            className="flex-2 overflow-hidden text-ellipsis"
          >
            {data.property.name}
          </Label>
        </Line>
        <Line>
          <Label title="RESPONSÁVEL PELA UNIDADE">{person?.name ?? "--"}</Label>
        </Line>
        <Line>
          <Label title="CARGO">{person?.role ?? "--"}</Label>
          <Label title="TEL.">{formatPhone(person?.phone)}</Label>
        </Line>
        <Line>
          <Label title="ENDEREÇO" className="line-clamp-2 text-wrap">
            {data.property.address}
          </Label>
        </Line>
      </Card>

      <ScoreTable items={data.items} />

      <Indicator score={data.score} />

      <Card>
        <Line>
          <Label title="RESPONSÁVEL PELA FISCALIZAÇÃO">{data.user.name}</Label>
        </Line>
        <Line>
          <Label title="CARGO">GESTÃO DE PATRIMÔNIO</Label>
          <Label title="DATA">{formatDate(data.finished_at)}</Label>
          <Label className="flex-0 font-mono" title="ASSINATURA">
            DIGITAL
          </Label>
        </Line>
      </Card>

      <ItemDetails items={data.items} />
    </>
  );
}
