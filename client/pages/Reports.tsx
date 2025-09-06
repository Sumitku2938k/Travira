import { useMemo } from "react";
import { alertsSeed } from "@/data/alerts";
import { tourists } from "@/data/tourists";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import MapView from "@/components/map/MapView";

export default function ReportsPage() {
  const alertTypes = useMemo(() => {
    const map: Record<string, number> = {};
    alertsSeed.forEach((a) => (map[a.type] = (map[a.type] ?? 0) + 1));
    return Object.entries(map).map(([type, count]) => ({ type, count }));
  }, []);

  const alertsPerDay = useMemo(() => {
    const map: Record<string, number> = {};
    alertsSeed.forEach((a) => {
      const key = new Date(a.timestamp).toLocaleDateString();
      map[key] = (map[key] ?? 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([date, count]) => ({ date, count }));
  }, []);

  const zoneFrom = (lat: number, lng: number) => {
    if (lng < 77.23) return "West";
    if (lat > 28.62) return "North";
    if (lat < 28.58) return "South";
    return "Central";
  };

  const touristsByZone = useMemo(() => {
    const map: Record<string, number> = {};
    tourists.forEach((t) => {
      const z = zoneFrom(t.location.lat, t.location.lng);
      map[z] = (map[z] ?? 0) + 1;
    });
    return Object.entries(map).map(([zone, count]) => ({ zone, count }));
  }, []);

  const riskCircles = useMemo(() => {
    // Simple heatmap: heavier circle where more alerts exist
    const zones: Record<string, { center: [number, number]; weight: number }> = {
      North: { center: [28.66, 77.23], weight: 0 },
      South: { center: [28.55, 77.23], weight: 0 },
      West: { center: [28.61, 77.18], weight: 0 },
      Central: { center: [28.61, 77.21], weight: 0 },
    };
    alertsSeed.forEach((a) => {
      const z = zoneFrom(a.location.lat, a.location.lng);
      zones[z].weight += 1;
    });
    return zones;
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Tourists by zone">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={touristsByZone}>
              <XAxis dataKey="zone" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#60a5fa" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Alerts per day">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={alertsPerDay}>
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#22d3ee" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Alert types">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={alertTypes} dataKey="count" nameKey="type" outerRadius={100} innerRadius={60}>
                {alertTypes.map((e, i) => (
                  <Cell key={e.type} fill={["#f87171", "#fbbf24", "#fb923c"][i % 3]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Risk heatmap (zones)">
          <div className="h-[260px]">
            <MapView
              tourists={[]}
              alerts={Object.entries(riskCircles).map(([name, z], i) => ({
                id: `Z-${i}`,
                touristId: "-",
                type: "Anomaly",
                timestamp: new Date().toISOString(),
                location: { lat: z.center[0], lng: z.center[1] },
                status: "active",
              }))}
            />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Darker circles indicate higher alert density.</div>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="font-semibold mb-2">{title}</div>
      {children}
    </div>
  );
}
