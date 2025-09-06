import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { tourists } from "@/data/tourists";
import { alertsSeed } from "@/data/alerts";
import MapView from "@/components/map/MapView";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";

export default function TouristDetailPage() {
  const { id } = useParams();
  const tourist = useMemo(() => tourists.find((t) => t.id === id), [id]);
  const alerts = useMemo(() => alertsSeed.filter((a) => a.touristId === id), [id]);

  if (!tourist) return <div className="p-4">Tourist not found.</div>;

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("E-FIR Report", 14, 18);
    doc.setFontSize(12);
    doc.text(`Tourist ID: ${tourist.id}`, 14, 28);
    doc.text(`Name: ${tourist.name}`, 14, 36);
    doc.text(`Itinerary: ${tourist.itinerary}`, 14, 44);
    doc.text(`Emergency Contact: ${tourist.emergencyContact ?? tourist.emergencyContacts[0]?.phone ?? "N/A"}`, 14, 52);
    doc.text(`Last Seen: ${new Date(tourist.lastSeen).toLocaleString()}`, 14, 60);

    doc.text("Alert History:", 14, 74);
    alerts.forEach((a, idx) => {
      doc.text(`${idx + 1}. ${a.type} (${a.status}) – ${new Date(a.timestamp).toLocaleString()}`, 20, 84 + idx * 8);
    });

    doc.save(`e-fir-${tourist.id}.pdf`);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-4">
      <aside className="bg-card border rounded-lg overflow-hidden">
        <div className="p-4 flex items-center gap-3">
          <img src={tourist.photoUrl} alt={tourist.name} className="size-16 rounded-md object-cover" />
          <div>
            <div className="text-lg font-semibold">{tourist.name}</div>
            <div className="text-xs text-muted-foreground">{tourist.id}</div>
          </div>
        </div>
        <div className="p-4 border-t space-y-2 text-sm">
          <div><span className="text-muted-foreground">Itinerary:</span> {tourist.itinerary}</div>
          <div><span className="text-muted-foreground">Emergency:</span> {tourist.emergencyContact ?? tourist.emergencyContacts[0]?.phone}</div>
          <div><span className="text-muted-foreground">Last Seen:</span> {new Date(tourist.lastSeen).toLocaleString()}</div>
          <Button className="w-full mt-2" onClick={generatePDF}>Generate E-FIR PDF</Button>
        </div>
      </aside>

      <section className="space-y-4">
        <div className="h-[420px]">
          <MapView tourists={[tourist]} alerts={alerts} />
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="font-semibold mb-2">Alert History</div>
          <div className="space-y-2">
            {alerts.map((a) => (
              <div key={a.id} className="text-sm flex items-center justify-between border rounded-md p-2 bg-background">
                <div>
                  <div className="font-medium">{a.type} – {a.id}</div>
                  <div className="text-xs text-muted-foreground">{new Date(a.timestamp).toLocaleString()}</div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full border border-border">{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
