export type Tourist = {
  id: string;
  name: string;
  itinerary: string;
  status: "safe" | "warning" | "sos";
  lastSeen: string;
  photoUrl: string;
  emergencyContacts: { name: string; phone: string }[];
  emergencyContact?: string;
  location: { lat: number; lng: number };
};

export const tourists: Tourist[] = [
  {
    id: "T-1001",
    name: "Aarav Sharma",
    itinerary: "India Gate → Red Fort → Qutub Minar",
    status: "safe",
    lastSeen: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&q=80&auto=format&fit=crop&crop=faces",
    emergencyContacts: [
      { name: "Parent", phone: "+91 98XXXXXX01" },
      { name: "Hotel", phone: "+91 11XXXXXX10" },
    ],
    emergencyContact: "+91 98XXXXXX01",
    location: { lat: 28.6129, lng: 77.2295 },
  },
  {
    id: "T-1002",
    name: "Emily Johnson",
    itinerary: "Connaught Place → Lotus Temple",
    status: "warning",
    lastSeen: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    photoUrl: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=256&q=80&auto=format&fit=crop&crop=faces",
    emergencyContacts: [{ name: "Friend", phone: "+1 415 XXX XXXX" }],
    emergencyContact: "+1 415 XXX XXXX",
    location: { lat: 28.5535, lng: 77.2588 },
  },
  {
    id: "T-1003",
    name: "Rahul Verma",
    itinerary: "Chandni Chowk → Jama Masjid",
    status: "sos",
    lastSeen: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    photoUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=256&q=80&auto=format&fit=crop&crop=faces",
    emergencyContacts: [{ name: "Spouse", phone: "+91 98XXXXXX02" }],
    emergencyContact: "+91 98XXXXXX02",
    location: { lat: 28.6562, lng: 77.2410 },
  },
];
