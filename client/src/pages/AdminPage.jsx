import { useState } from "react";
import { useDemoData } from "../contexts/DemoDataContext";
import { ShieldCheck, Users, ScrollText, Settings, Search, Download } from "lucide-react";

const ACTION_LABELS = {
  score_generated: "Score Generated",
  loan_submitted: "Loan Submitted",
  loan_approved: "Loan Approved",
  loan_rejected: "Loan Rejected",
  document_uploaded: "Document Uploaded",
  msme_created: "MSME Created",
  user_login: "User Login",
};

export default function AdminPage() {
  const { demoMode, data: demoData } = useDemoData();
  const [activeTab, setActiveTab] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("");

  const tabs = [
    { id: "users", label: "Users", icon: Users },
    { id: "audit", label: "Audit Logs", icon: ScrollText },
    { id: "config", label: "System Config", icon: Settings },
  ];

  // Demo data
  const users = demoMode
    ? Object.values(demoData?.users || {})
    : [];

  const auditLogs = demoMode
    ? (demoData?.auditLogs || []).filter((log) => {
        if (actionFilter && log.action !== actionFilter) return false;
        if (searchQuery && !log.performedBy?.name?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
      })
    : [];

  return (
    <div className="space-y-6 max-w-[1100px]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
          <ShieldCheck size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="page-title">Admin Panel</h1>
          <p className="page-subtitle">Platform administration and compliance</p>
        </div>
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

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="animate-fade-in">
          {users.length > 0 ? (
            <div className="table-container">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-header">Name</th>
                    <th className="table-header">Email</th>
                    <th className="table-header">Role</th>
                    <th className="table-header">Organisation</th>
                    <th className="table-header">Status</th>
                    <th className="table-header">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td className="table-cell font-medium text-txt">{u.name}</td>
                      <td className="table-cell font-mono text-xs">{u.email}</td>
                      <td className="table-cell">
                        <span className={`badge ${u.role === "admin" ? "badge-info" : u.role === "bank_officer" ? "badge-medium" : "badge-low"}`}>
                          {u.role?.replace("_", " ")}
                        </span>
                      </td>
                      <td className="table-cell">{u.organisationName}</td>
                      <td className="table-cell">
                        <span className="flex items-center gap-1.5">
                          <span className={`status-dot ${u.isVerified ? "status-dot-online" : "status-dot-pending"}`} />
                          <span className="text-xs">{u.isVerified ? "Verified" : "Pending"}</span>
                        </span>
                      </td>
                      <td className="table-cell text-xs text-txt-muted">
                        {new Date(u.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="card p-10 text-center">
              <Users size={28} className="text-txt-muted mx-auto mb-3" />
              <p className="text-sm text-txt-muted">No user data available. Enable demo mode to view sample data.</p>
            </div>
          )}
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === "audit" && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />
              <input
                className="input-field pl-9"
                placeholder="Search by user name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="input-field max-w-[200px]"
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
            >
              <option value="">All Actions</option>
              {Object.entries(ACTION_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            <button className="btn-secondary text-xs whitespace-nowrap"><Download size={14} /> Export CSV</button>
          </div>

          {auditLogs.length > 0 ? (
            <div className="table-container">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-header">Timestamp</th>
                    <th className="table-header">Action</th>
                    <th className="table-header">User</th>
                    <th className="table-header">Role</th>
                    <th className="table-header">Entity</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log._id}>
                      <td className="table-cell text-xs font-mono text-txt-muted">
                        {new Date(log.createdAt).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="table-cell">
                        <span className="badge-neutral text-xs">{ACTION_LABELS[log.action] || log.action}</span>
                      </td>
                      <td className="table-cell font-medium text-txt text-xs">{log.performedBy?.name}</td>
                      <td className="table-cell">
                        <span className="text-xs text-txt-muted capitalize">{log.performedBy?.role?.replace("_", " ")}</span>
                      </td>
                      <td className="table-cell text-xs font-mono text-txt-muted">{log.entityType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="card p-10 text-center">
              <ScrollText size={28} className="text-txt-muted mx-auto mb-3" />
              <p className="text-sm text-txt-muted">No audit logs to display</p>
            </div>
          )}
        </div>
      )}

      {/* System Config Tab */}
      {activeTab === "config" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-txt mb-4">ML Model Configuration</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Model Version", value: "xgboost_v1.2" },
                { label: "Score Range", value: "300 – 850" },
                { label: "Features", value: "10 features" },
                { label: "Low Risk", value: "700 – 850" },
                { label: "Medium Risk", value: "550 – 699" },
                { label: "High Risk", value: "300 – 549" },
              ].map((c, i) => (
                <div key={i} className="bg-surface-alt rounded-lg p-3">
                  <p className="text-[10px] text-txt-muted uppercase tracking-wide">{c.label}</p>
                  <p className="text-sm font-semibold text-txt mt-1 font-mono">{c.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-txt mb-4">Loan Recommendation Thresholds</h3>
            <div className="table-container border-0 shadow-none">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-header">Score Range</th>
                    <th className="table-header">Max Amount</th>
                    <th className="table-header">Interest Band</th>
                    <th className="table-header">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { range: "700–850", amount: "₹50L", rate: "8–10%", note: "Fast track" },
                    { range: "650–699", amount: "₹25L", rate: "10–13%", note: "Standard" },
                    { range: "600–649", amount: "₹10L", rate: "13–16%", note: "Enhanced docs" },
                    { range: "550–599", amount: "₹5L", rate: "16–20%", note: "Collateral" },
                    { range: "300–549", amount: "N/A", rate: "—", note: "Not eligible" },
                  ].map((r, i) => (
                    <tr key={i}>
                      <td className="table-cell font-mono font-medium text-txt">{r.range}</td>
                      <td className="table-cell font-semibold">{r.amount}</td>
                      <td className="table-cell">{r.rate}</td>
                      <td className="table-cell text-xs text-txt-muted">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
