import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, LayoutDashboard, Users, AlertTriangle, BarChart3, LogIn, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { alertsSeed, type Alert } from "@/data/alerts";
import { cn } from "@/lib/utils";

export default function AppLayout() {
  const { t, lang, setLang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [alerts] = useState<Alert[]>(alertsSeed);

  const nav = useMemo(
    () => [
      { to: "/", label: t("dashboard"), icon: LayoutDashboard },
      { to: "/tourists", label: t("tourists"), icon: Users },
      { to: "/alerts", label: t("alerts"), icon: AlertTriangle },
      { to: "/reports", label: t("reports"), icon: BarChart3 },
    ],
    [t],
  );

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <aside className="h-screen sticky top-0 bg-sidebar-background border-r border-sidebar-border flex flex-col">
        <div className="px-5 py-4 border-b border-sidebar-border flex items-center gap-2">
          <div className="size-8 rounded-md bg-primary/20 border border-primary/30" />
          <div>
            <div className="text-sm text-muted-foreground">{t("appTitle")}</div>
            <div className="text-lg font-semibold">Admin Panel</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-2">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm",
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "hover:bg-sidebar-accent/30 text-sidebar-foreground",
                )
              }
              end={n.to === "/"}
            >
              <n.icon className="size-4" />
              <span>{n.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border flex items-center gap-2">
          <Globe className="size-4 opacity-70" />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as any)}
            className="w-full bg-transparent text-sm rounded-md border border-border px-2 py-1"
            aria-label="Language"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
        <div className="p-3 pt-0 text-xs text-muted-foreground">v1.0.0</div>
      </aside>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b border-border">
          <div className="h-14 px-4 flex items-center gap-3">
            <div className="font-semibold tracking-tight">{t("appTitle")} – {location.pathname === "/" ? t("dashboard") : location.pathname.replace("/", "")}</div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Notifications" onClick={() => setNotifOpen((v) => !v)}>
                <Bell className="size-5" />
              </Button>
              <Button variant="secondary" size="sm" onClick={() => navigate("/login")}> <LogIn className="size-4" /> <span className="ml-1 hidden sm:inline">{t("login")}</span></Button>
            </div>
          </div>
          {notifOpen && (
            <div className="border-t border-border bg-background">
              <div className="px-4 py-2 text-sm font-medium">{t("recentAlerts")}</div>
              <div className="max-h-48 overflow-y-auto">
                {alerts.slice(0, 5).map((a) => (
                  <div key={a.id} className="px-4 py-2 text-sm flex items-center gap-3 hover:bg-muted/30">
                    <AlertTriangle className={cn("size-4", a.type === "SOS" ? "text-red-500" : a.type === "Geo-fence" ? "text-yellow-500" : "text-orange-500")} />
                    <div className="flex-1">
                      <div className="font-medium">{a.type} – {a.touristId}</div>
                      <div className="text-xs text-muted-foreground">{new Date(a.timestamp).toLocaleString()}</div>
                    </div>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full border", a.status === "active" ? "border-red-500/30 text-red-400" : a.status === "acknowledged" ? "border-blue-500/30 text-blue-400" : "border-green-500/30 text-green-400")}>{a.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
