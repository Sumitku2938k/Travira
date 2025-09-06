export type AlertType = "SOS" | "Geo-fence" | "Anomaly";

export type Alert = {
  id: string;
  touristId: string;
  type: AlertType;
  timestamp: string;
  location: { lat: number; lng: number };
  status: "active" | "acknowledged" | "dispatched";
};

export const alertsSeed: Alert[] = [
  {
    id: "A-9001",
    touristId: "T-1003",
    type: "SOS",
    timestamp: new Date().toISOString(),
    location: { lat: 28.6562, lng: 77.241 },
    status: "active",
  },
  {
    id: "A-9002",
    touristId: "T-1002",
    type: "Geo-fence",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    location: { lat: 28.561, lng: 77.243 },
    status: "active",
  },
  {
    id: "A-9003",
    touristId: "T-1001",
    type: "Anomaly",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    location: { lat: 28.6139, lng: 77.209 },
    status: "acknowledged",
  },
];
