import { useState } from "react";
import { useSelector } from "react-redux";
import { useDemoData } from "../contexts/DemoDataContext";
import { useTheme } from "../contexts/ThemeContext";
import { User, Lock, Bell, Globe, Trash2, Sun, Moon, Monitor } from "lucide-react";
import { useToast } from "../components/ToastProvider";

export default function SettingsPage() {
  const { user } = useSelector((s) => s.auth);
  const { demoMode, data: demoData } = useDemoData();
  const { theme, toggleTheme, isDark } = useTheme();
  const { toast } = useToast();

  const activeUser = demoMode ? demoData?.users?.bankOfficer : user;

  const [activeTab, setActiveTab] = useState("profile");
  const [passwordForm, setPasswordForm] = useState({ current: "", newPassword: "", confirm: "" });
  const [notifPrefs, setNotifPrefs] = useState({
    scoreGenerated: true,
    loanDecision: true,
    stressAlerts: true,
    monthlyReport: true,
    documentStatus: false,
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: isDark ? Moon : Sun },
  ];

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    toast.success("Password updated successfully");
    setPasswordForm({ current: "", newPassword: "", confirm: "" });
  };

  return (
    <div className="max-w-[900px] mx-auto space-y-6">
      <div>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account preferences and security</p>
      </div>

      {/* Tabs */}
      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-item flex items-center gap-2 ${activeTab === tab.id ? "tab-item-active" : ""}`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="card p-6 space-y-5 animate-fade-in">
          <h3 className="text-sm font-semibold text-txt">Profile Information</h3>
          <div className="flex items-center gap-4 pb-5 border-b border-border">
            <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center">
              <User size={24} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-txt">{activeUser?.name || "—"}</p>
              <p className="text-sm text-txt-secondary capitalize">{activeUser?.role?.replace("_", " ")}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Full Name</label>
              <input className="input-field" value={activeUser?.name || ""} readOnly />
            </div>
            <div>
              <label className="input-label">Email</label>
              <input className="input-field" value={activeUser?.email || ""} readOnly />
            </div>
            <div>
              <label className="input-label">Organisation</label>
              <input className="input-field" value={activeUser?.organisationName || ""} readOnly />
            </div>
            <div>
              <label className="input-label">Role</label>
              <input className="input-field capitalize" value={activeUser?.role?.replace("_", " ") || ""} readOnly />
            </div>
          </div>
          <p className="text-xs text-txt-muted">Contact your administrator to update profile information.</p>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="card p-6 space-y-5 animate-fade-in">
          <h3 className="text-sm font-semibold text-txt">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
            <div>
              <label className="input-label">Current Password</label>
              <input type="password" className="input-field" placeholder="Enter current password"
                value={passwordForm.current} onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })} required />
            </div>
            <div>
              <label className="input-label">New Password</label>
              <input type="password" className="input-field" placeholder="Min 8 characters"
                value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} required />
            </div>
            <div>
              <label className="input-label">Confirm New Password</label>
              <input type="password" className="input-field" placeholder="Repeat new password"
                value={passwordForm.confirm} onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })} required />
            </div>
            <button type="submit" className="btn-primary">Update Password</button>
          </form>

          <div className="pt-5 border-t border-border">
            <h3 className="text-sm font-semibold text-danger mb-2 flex items-center gap-2"><Trash2 size={14} /> Danger Zone</h3>
            <p className="text-xs text-txt-secondary mb-3">Once you delete your account, there is no going back.</p>
            <button className="btn-danger text-xs py-2 px-4"><Trash2 size={12} /> Request Account Deletion</button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="card p-6 space-y-4 animate-fade-in">
          <h3 className="text-sm font-semibold text-txt">Notification Preferences</h3>
          <p className="text-xs text-txt-secondary">Choose which notifications you want to receive via email and in-app.</p>
          {[
            { key: "scoreGenerated", label: "Score Generated", desc: "When a credit score is generated for your MSME" },
            { key: "loanDecision", label: "Loan Decisions", desc: "When a loan application is approved or rejected" },
            { key: "stressAlerts", label: "Stress Alerts", desc: "Early warning signals for financial distress" },
            { key: "monthlyReport", label: "Monthly Reports", desc: "Portfolio health summary every month" },
            { key: "documentStatus", label: "Document Status", desc: "When uploaded documents are verified or rejected" },
          ].map((pref) => (
            <div key={pref.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-txt">{pref.label}</p>
                <p className="text-xs text-txt-muted mt-0.5">{pref.desc}</p>
              </div>
              <button
                onClick={() => setNotifPrefs({ ...notifPrefs, [pref.key]: !notifPrefs[pref.key] })}
                className={`demo-toggle-switch ${notifPrefs[pref.key] ? "on" : "off"}`}
                style={{ background: notifPrefs[pref.key] ? "var(--color-primary)" : "var(--color-border)" }}
              >
                <div className="demo-toggle-knob" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Appearance Tab */}
      {activeTab === "appearance" && (
        <div className="card p-6 space-y-5 animate-fade-in">
          <h3 className="text-sm font-semibold text-txt">Theme</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => { if (isDark) toggleTheme(); }}
              className={`card-hover p-4 text-left ${!isDark ? "ring-2 ring-primary" : ""}`}
            >
              <Sun size={20} className="text-warning mb-2" />
              <p className="text-sm font-medium text-txt">Light Mode</p>
              <p className="text-xs text-txt-muted mt-0.5">Clean, bright interface</p>
            </button>
            <button
              onClick={() => { if (!isDark) toggleTheme(); }}
              className={`card-hover p-4 text-left ${isDark ? "ring-2 ring-primary" : ""}`}
            >
              <Moon size={20} className="text-primary mb-2" />
              <p className="text-sm font-medium text-txt">Dark Mode</p>
              <p className="text-xs text-txt-muted mt-0.5">Easier on the eyes</p>
            </button>
          </div>

          <div className="pt-5 border-t border-border">
            <h3 className="text-sm font-semibold text-txt mb-3 flex items-center gap-2"><Globe size={14} /> Language</h3>
            <div className="flex gap-3">
              <button className="badge-low font-medium">English</button>
              <button className="badge-neutral font-medium opacity-50 cursor-not-allowed">हिंदी (Coming Soon)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
