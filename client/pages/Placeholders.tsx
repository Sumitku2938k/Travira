import { useParams } from "react-router-dom";

export function TouristsPage() {
  return (
    <Placeholder title="Tourist List" />
  );
}

export function TouristDetailPage() {
  const { id } = useParams();
  return (
    <Placeholder title={`Tourist Detail – ${id}`} />
  );
}

export function AlertsPage() {
  return <Placeholder title="Alerts" />;
}

export function ReportsPage() {
  return <Placeholder title="Reports & Analytics" />;
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="h-[60vh] grid place-items-center">
      <div className="text-center max-w-xl">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page is a placeholder. Ask to generate this page with full features (tables, filters, charts, heatmap, E-FIR export) and we'll build it.
        </p>
      </div>
    </div>
  );
}
