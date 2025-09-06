import { useMemo, useState } from "react";
import MapView from "@/components/map/MapView";
import { alertsSeed, type Alert } from "@/data/alerts";
import { tourists } from "@/data/tourists";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { AlertTriangle, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<Alert[]>(alertsSeed);

  const activeAlerts = useMemo(() => alerts.filter((a) => a.status !== "dispatched"), [alerts]);

  const acknowledge = (id: string) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status: "acknowledged" } : a)));
  const dispatchPolice = (id: string) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status: "dispatched" } : a)));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-4">
      <section className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Total Tourists" value={tourists.length.toString()} />
          <StatCard label="Active Alerts" value={activeAlerts.length.toString()} accent="red" />
          <StatCard label="Acknowledged" value={alerts.filter((a) => a.status === "acknowledged").length.toString()} accent="blue" />
          <StatCard label="Dispatched" value={alerts.filter((a) => a.status === "dispatched").length.toString()} accent="green" />
        </div>
        <div className="h-[520px]">
          <MapView tourists={tourists} alerts={activeAlerts} />
        </div>
      </section>
      <aside className="bg-card border rounded-lg p-4 flex flex-col min-h-[520px]">
        <div className="text-sm font-semibold flex items-center gap-2">
          <AlertTriangle className="size-4 text-red-500" /> {t("activeAlerts")}
        </div>
        <div className="mt-3 space-y-3 overflow-y-auto">
          {activeAlerts.map((a) => {
            const tourist = tourists.find((t) => t.id === a.touristId);
            return (
              <div key={a.id} className="rounded-md border p-3 bg-background">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{a.type} – {a.id}</div>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full border", a.status === "active" ? "border-red-500/30 text-red-400" : a.status === "acknowledged" ? "border-blue-500/30 text-blue-400" : "border-green-500/30 text-green-400")}>{a.status}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{new Date(a.timestamp).toLocaleString()}</div>
                <div className="mt-2 text-sm">{tourist?.name} ({tourist?.id})</div>
                <div className="mt-3 flex items-center gap-2">
                  <Button size="sm" variant="secondary" onClick={() => acknowledge(a.id)}>
                    <CheckCircle2 className="size-4" /> {t("acknowledge")}
                  </Button>
                  <Button size="sm" onClick={() => dispatchPolice(a.id)}>
                    <Send className="size-4" /> {t("dispatchPolice")}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: "red" | "blue" | "green" }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={cn("text-2xl font-semibold mt-1", accent === "red" && "text-red-400", accent === "blue" && "text-blue-400", accent === "green" && "text-green-400")}>
        {value}
      </div>
    </div>
  );
}
