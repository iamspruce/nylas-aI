import { ComponentProps } from "react";
import { formatDistanceToNow } from "date-fns";
import { Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useMail } from "./use-mail";
import { MailListProps } from "./types";

export function MailList({ items }: MailListProps) {
  const [mail, setMail] = useMail();

  return (
    <ScrollArea className="h-[calc(100vh-10rem)] rounded-md border">
      <div className="p-4">
        <h2 className="mb-4 text-xl font-semibold">Inbox</h2>
        {items.map((item, index) => (
          <div key={item.id}>
            {index > 0 && <Separator className="my-2" />}
            <button
              className={cn(
                "flex w-full flex-col gap-2 rounded-lg p-3 text-left text-sm transition-all hover:bg-accent",
                mail.selected === item.id && "bg-muted"
              )}
              onClick={() => setMail({ ...mail, selected: item.id })}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div className="font-semibold">{item.name}</div>
                  {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "text-xs ml-4",
                    mail.selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {item.text.substring(0, 150)}...
              </div>
              {item.labels.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {item.labels.map((label) => (
                    <Badge
                      key={label}
                      variant={getBadgeVariantFromLabel(label)}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
