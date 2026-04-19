import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { useDemoData } from "../contexts/DemoDataContext";
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, Building2, PlusCircle, Upload, Landmark, FileText,
  ChevronLeft, ChevronRight, Bell, LogOut, User, Settings, ShieldCheck,
  Menu, X,
} from "lucide-react";
import ChatbotWidget from "./ChatbotWidget";
import DemoDataToggle from "./DemoDataToggle";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/msmes", label: "MSME Portfolio", icon: Building2, roles: ["admin", "bank_officer"] },
  { path: "/msme/onboard", label: "Onboard MSME", icon: PlusCircle },
  { path: "/data-upload", label: "Data Upload", icon: Upload },
  { path: "/loans", label: "Loan Center", icon: Landmark },
  { path: "/documents", label: "Documents", icon: FileText },
  { path: "/settings", label: "Settings", icon: Settings },
  { path: "/admin", label: "Admin Panel", icon: ShieldCheck, roles: ["admin"] },
];

export default function AppLayout() {
  const { user } = useSelector((state) => state.auth);
  const { demoMode, data: demoData } = useDemoData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  // Use demo user when demo mode is on and no real user
  const activeUser = demoMode ? (user || demoData?.users?.bankOfficer) : user;

  // Close notification panel on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const filtered = navItems.filter((i) => !i.roles || i.roles.includes(activeUser?.role));

  // Demo notifications
  const notifications = demoMode ? (demoData?.notifications || []) : [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Breadcrumb from path
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const breadcrumbLabels = {
    dashboard: "Dashboard",
    msmes: "MSME Portfolio",
    msme: "MSME",
    onboard: "Onboard",
    "data-upload": "Data Upload",
    loans: "Loan Center",
    documents: "Documents",
    settings: "Settings",
    admin: "Admin Panel",
  };

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      {/* ── Mobile Overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          ${collapsed ? "w-16" : "w-60"} flex-shrink-0 bg-surface border-r border-border flex flex-col transition-all duration-200
          fixed lg:relative z-50 h-full
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="h-14 flex items-center gap-2.5 px-4 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            CS
          </div>
          {!collapsed && (
            <div className="flex items-center justify-between flex-1">
              <p className="text-sm font-semibold text-txt">CreditSaathi</p>
              <button
                onClick={() => setMobileOpen(false)}
                className="lg:hidden w-7 h-7 rounded-lg flex items-center justify-center text-txt-muted hover:text-txt hover:bg-surface-alt"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {filtered.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => isActive ? "sidebar-link-active" : "sidebar-link"}
            >
              <item.icon size={18} strokeWidth={1.8} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-2 border-t border-border">
          <div className="flex items-center gap-2.5 px-2 py-2">
            <div className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
              <User size={14} className="text-primary" />
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-txt truncate">{activeUser?.name}</p>
                <p className="text-[10px] text-txt-muted capitalize">{activeUser?.role?.replace("_", " ")}</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-txt-secondary hover:text-danger rounded transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          )}
        </div>

        <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex h-9 border-t border-border items-center justify-center text-txt-muted hover:text-txt hover:bg-surface-alt transition-all">
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-y-auto bg-bg pb-10">
        <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10">
          {/* Left: Mobile menu + Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-8 h-8 rounded-lg border border-border flex items-center justify-center text-txt-muted hover:text-txt hover:bg-surface-alt transition-colors"
            >
              <Menu size={18} />
            </button>
            <div className="breadcrumb hidden sm:flex">
              {pathSegments.map((seg, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-txt-muted">/</span>}
                  {i === pathSegments.length - 1 ? (
                    <span className="breadcrumb-current">{breadcrumbLabels[seg] || seg}</span>
                  ) : (
                    <span>{breadcrumbLabels[seg] || seg}</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Date, Theme, Notifications */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-txt-secondary hidden md:block">
              {new Date().toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
            </span>
            <ThemeToggle />
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-txt-muted hover:text-txt hover:bg-surface-alt transition-colors relative"
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger text-white text-[9px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Panel */}
              {showNotifications && (
                <div className="notification-panel">
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-txt">Notifications</h3>
                    {unreadCount > 0 && (
                      <button className="text-xs text-primary font-medium hover:underline">Mark all read</button>
                    )}
                  </div>
                  <div className="max-h-[380px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center">
                        <Bell size={24} className="text-txt-muted mx-auto mb-2" />
                        <p className="text-sm text-txt-muted">No notifications</p>
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n._id}
                          className={`px-4 py-3 border-b border-border hover:bg-surface-alt cursor-pointer transition-colors ${!n.read ? "bg-primary-50" : ""}`}
                          onClick={() => { navigate(n.link); setShowNotifications(false); }}
                        >
                          <div className="flex items-start gap-2">
                            {!n.read && <div className="status-dot status-dot-online mt-1.5 flex-shrink-0" />}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-txt truncate">{n.title}</p>
                              <p className="text-xs text-txt-secondary mt-0.5 truncate">{n.message}</p>
                              <p className="text-[10px] text-txt-muted mt-1">{new Date(n.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6 animate-fade-in">
          <Outlet />
        </div>

        <ChatbotWidget />
      </main>

      {/* ── Demo Data Toggle Bar ── */}
      <DemoDataToggle />
    </div>
  );
}
