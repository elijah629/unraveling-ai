import { toast } from "sonner";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

export function MUIDDisplay({ muid }: { muid: string | null }) {
  const copyToClipboard = () => {
    if (muid) {
      navigator.clipboard.writeText(muid)
      toast("Copied to clipboard", {
        description: `MUID ${muid} has been copied to your clipboard.`,
      })
    }
  }

  return (
    <Card className={cn("bg-secondary px-6 py-4 shadown-md", muid && "cursor-pointer")} onClick={() => muid && copyToClipboard()}>
      <span className="font-mono text-3xl font-bold tracking-wider text-secondary-foreground">{muid || "----"}</span>
    </Card>
  )
}
