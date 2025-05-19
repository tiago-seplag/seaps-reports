import { Bad, Good, Regular } from "./icons";
import { Card } from "./card";

const Indicator = ({ score }) => {
  if (score > 2.5) {
    return (
      <Card className={"mb-2 border-green-600 py-3"}>
        <div className="border-primary inline-flex w-full items-center justify-between border-b text-lg font-bold text-nowrap">
          <p>INDICADOR DE MANUTENÇÃO DO IMÓVEL:</p>

          <div className="inline-flex gap-2">
            <p>BOM</p>
            <Good />
          </div>
        </div>
      </Card>
    );
  }

  if (score < 1.5) {
    return (
      <Card className={"mb-2 border-red-600 py-3"}>
        <div className="border-primary inline-flex w-full items-center justify-between border-b text-lg font-bold text-nowrap">
          <p>INDICADOR DE MANUTENÇÃO DO IMÓVEL:</p>

          <div className="inline-flex gap-2">
            <p>Ruim</p>
            <Bad />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={"mb-2 border-yellow-600 py-3"}>
      <div className="border-primary inline-flex w-full items-center justify-between border-b text-lg font-bold text-nowrap">
        <p>INDICADOR DE MANUTENÇÃO DO IMÓVEL:</p>

        <div className="inline-flex gap-2">
          <p>REGULAR</p>
          <Regular />
        </div>
      </div>
    </Card>
  );
};

export { Indicator };
