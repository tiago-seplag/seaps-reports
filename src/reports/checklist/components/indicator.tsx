import { cn } from "../../../lib/cn";
import { Card } from "../../../ui/card";
import { indicatorOf } from "../score";

/** INDICADOR DE MANUTENÇÃO DO IMÓVEL, pela média das notas. */
export function Indicator({ score }: { score: number | null }) {
  const indicator = indicatorOf(score);

  return (
    <Card className={cn("mb-2 py-3", indicator?.border)}>
      <div className="border-primary inline-flex w-full items-center justify-between border-b text-lg font-bold text-nowrap">
        <p>INDICADOR DE MANUTENÇÃO DO IMÓVEL:</p>

        <div className="inline-flex gap-2">
          <p>{indicator?.label ?? "--"}</p>
          {indicator && <indicator.Icon />}
        </div>
      </div>
    </Card>
  );
}
