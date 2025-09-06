import { useMemo, useState } from "react";
import { alertsSeed, type Alert } from "@/data/alerts";
import { tourists } from "@/data/tourists";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(alertsSeed);
  const [filter, setFilter] = useState<"all" | Alert["status"]>("all");

  const data = useMemo(
    () => alerts.filter((a) => (filter === "all" ? true : a.status === filter)),
    [alerts, filter],
  );

  const acknowledge = (id: string) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status: "acknowledged" } : a)));
  const dispatchPolice = (id: string) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status: "dispatched" } : a)));

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="w-48 rounded-md border bg-background px-3 py-2">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="dispatched">Dispatched</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {data.map((a) => {
          const tourist = tourists.find((t) => t.id === a.touristId);
          return (
            <div key={a.id} className="rounded-lg border bg-card p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{a.type} – {a.id}</div>
                <span className={cn("text-xs px-2 py-0.5 rounded-full border", a.status === "active" ? "border-red-500/30 text-red-400" : a.status === "acknowledged" ? "border-blue-500/30 text-blue-400" : "border-green-500/30 text-green-400")}>{a.status}</span>
              </div>
              <div className="text-sm">{tourist?.name} ({tourist?.id})</div>
              <div className="text-xs text-muted-foreground">{new Date(a.timestamp).toLocaleString()}</div>
              <div className="mt-2 flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => acknowledge(a.id)}>
                  <CheckCircle2 className="size-4" /> Acknowledge
                </Button>
                <Button size="sm" onClick={() => dispatchPolice(a.id)}>
                  <Send className="size-4" /> Dispatch Police
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
