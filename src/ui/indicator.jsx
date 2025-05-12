import { cn } from "../utils";
import { Bad, Good, Regular } from "./icons";
import { Card } from "./card";

const Indicator = ({ score }) => {
  return (
    <Card
      className={cn(
        "mb-2 py-3",
        score > 2.5
          ? "border-green-600"
          : score < 1.5
          ? "border-red-600"
          : "border-yellow-600"
      )}
    >
      <div className="border-b border-blue-800 inline-flex w-full text-lg text-base font-bold text-nowrap items-center justify-between">
        <p>INDICADOR DE MANUTENÇÃO DO IMÓVEL:</p>

        <div className="inline-flex gap-2">
          <p>{score > 2.5 ? "BOM" : score < 1.5 ? "RUIM" : "REGULAR"}</p>
          {score > 2.5 ? <Good /> : score < 1.5 ? <Bad /> : <Regular />}
        </div>
      </div>
    </Card>
  );
};

export { Indicator };
