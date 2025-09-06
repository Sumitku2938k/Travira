import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from "react-leaflet";
import L from "leaflet";
import type { Tourist } from "@/data/tourists";
import type { Alert } from "@/data/alerts";

// Use CDN assets to avoid Vite fs allow issues
const LEAFLET_CDN = "https://unpkg.com/leaflet@1.9.4/dist/images/";
L.Icon.Default.mergeOptions({
  iconUrl: `${LEAFLET_CDN}marker-icon.png`,
  iconRetinaUrl: `${LEAFLET_CDN}marker-icon-2x.png`,
  shadowUrl: `${LEAFLET_CDN}marker-shadow.png`,
});

function FitBounds({ tourists = [], alerts = [] as Alert[] }: { tourists?: Tourist[]; alerts?: Alert[] }) {
  const map = useMap();
  const points = [
    ...tourists.map((t) => [t.location.lat, t.location.lng] as [number, number]),
    ...alerts.map((a) => [a.location.lat, a.location.lng] as [number, number]),
  ];
  if (points.length) {
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds.pad(0.2), { animate: true });
  }
  return null;
}

export default function MapView({ tourists = [], alerts = [] as Alert[] }: { tourists?: Tourist[]; alerts?: Alert[] }) {
  const center = { lat: 28.6139, lng: 77.209 };
  return (
    <MapContainer
      center={center}
      zoom={12}
      className="h-full w-full rounded-lg border border-border"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Tourists (blue pins) */}
      {tourists.map((t) => (
        <Marker key={t.id} position={[t.location.lat, t.location.lng]}>
          <Popup>
            <div className="space-y-1">
              <div className="font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.id}</div>
              <div className="text-xs">{t.itinerary}</div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Alerts (red markers as circles) */}
      {alerts.map((a) => (
        <CircleMarker
          key={a.id}
          center={[a.location.lat, a.location.lng]}
          radius={10}
          pathOptions={{ color: "#ef4444", fillColor: "#ef4444", fillOpacity: 0.6 }}
        >
          <Popup>
            <div className="space-y-1">
              <div className="font-semibold">{a.type} – {a.id}</div>
              <div className="text-xs text-muted-foreground">{new Date(a.timestamp).toLocaleString()}</div>
            </div>
          </Popup>
        </CircleMarker>
      ))}

      <FitBounds tourists={tourists} alerts={alerts} />
    </MapContainer>
  );
}
