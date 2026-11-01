import { env } from "../../../env";
import { Card } from "../../../ui/card";
import { Label } from "../../../ui/label";
import { Line } from "../../../ui/line";
import type { ChecklistItem } from "../schema";
import { itemScoreLabel } from "../score";

/** Uma página por item avaliado (menos os N/A), com observação e fotos. */
export function ItemDetails({ items }: { items: ChecklistItem[] }) {
  return (
    <section className="h-full">
      {items
        .filter((item) => item.score !== 0)
        .map((item) => (
          <Card key={item.id} className="flex break-before-page flex-col">
            <Line>
              <Label title="ITEM">{item.item.name}</Label>
              <Label title="PONTUAÇÃO">{itemScoreLabel(item.score)}</Label>
            </Line>
            <Line>
              <Label title="OBSERVAÇÃO" className="text-wrap">
                {item.observation}
              </Label>
            </Line>
            <div className="grid grid-cols-3 gap-1">
              {item.images.map(
                (image) =>
                  image.image && (
                    <figure key={image.id} className="break-inside-avoid">
                      <img
                        className="h-[200px] w-full object-cover"
                        src={`${env.BUCKET_URL}${image.image}?compress=true`}
                        alt={image.observation ?? item.item.name}
                      />
                      {image.observation && (
                        <figcaption>{image.observation}</figcaption>
                      )}
                    </figure>
                  ),
              )}
            </div>
          </Card>
        ))}
    </section>
  );
}
