import { useMemo, useState } from "react";
import { tourists as seed, type Tourist } from "@/data/tourists";
import { useNavigate } from "react-router-dom";

export default function TouristsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | Tourist["status"]>("all");
  const navigate = useNavigate();

  const data = useMemo(() => {
    return seed.filter((t) =>
      (status === "all" || t.status === status) &&
      (t.name.toLowerCase().includes(query.toLowerCase()) || t.id.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, status]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or ID..."
          className="flex-1 rounded-md border bg-background px-3 py-2"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-44 rounded-md border bg-background px-3 py-2">
          <option value="all">All Status</option>
          <option value="safe">Safe</option>
          <option value="warning">Warning</option>
          <option value="sos">SOS</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/30">
            <tr>
              <Th>Tourist ID</Th>
              <Th>Name</Th>
              <Th>Itinerary</Th>
              <Th>Status</Th>
              <Th>Last Seen</Th>
            </tr>
          </thead>
          <tbody>
            {data.map((t) => (
              <tr key={t.id} className="border-t hover:bg-muted/20 cursor-pointer" onClick={() => navigate(`/tourists/${t.id}`)}>
                <Td>{t.id}</Td>
                <Td className="font-medium">{t.name}</Td>
                <Td className="truncate max-w-[320px]">{t.itinerary}</Td>
                <Td>
                  <span className={badgeFor(t.status)}>{t.status.toUpperCase()}</span>
                </Td>
                <Td>{new Date(t.lastSeen).toLocaleString()}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-3 py-2 font-semibold">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}

function badgeFor(status: Tourist["status"]) {
  if (status === "safe") return "text-xs px-2 py-0.5 rounded-full border border-green-500/30 text-green-400";
  if (status === "warning") return "text-xs px-2 py-0.5 rounded-full border border-yellow-500/30 text-yellow-400";
  return "text-xs px-2 py-0.5 rounded-full border border-red-500/30 text-red-400";
}
