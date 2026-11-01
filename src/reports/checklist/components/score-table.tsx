import { Card } from "../../../ui/card";
import { TableCell, TableHead } from "../../../ui/table";
import type { ChecklistItem } from "../schema";
import { ITEM_SCORES } from "../score";

/** Uma linha por item, com a nota marcada na coluna dela. */
export function ScoreTable({ items }: { items: ChecklistItem[] }) {
  return (
    <Card className="mb-2">
      <table className="w-full table-fixed [&_tr:last-child]:border-0">
        <thead>
          <tr>
            <TableHead className="w-[60%]" />
            {ITEM_SCORES.map(({ value, label, Icon }) => (
              <TableHead key={value} className="text-center text-xs">
                <div className="flex flex-col items-center gap-1">
                  <Icon />
                  {label}
                </div>
              </TableHead>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-primary border-b">
              <TableCell>{item.item.name}</TableCell>
              {ITEM_SCORES.map(({ value }) => (
                <TableCell key={value} className="text-center">
                  <input
                    disabled
                    type="radio"
                    checked={item.score === value}
                    readOnly
                  />
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
