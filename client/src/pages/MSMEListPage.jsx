import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMSMEs } from "../store/msmeSlice";
import { useDemoData } from "../contexts/DemoDataContext";
import { useNavigate } from "react-router-dom";
import { Building2, Search, Filter, LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
import RiskBadge from "../components/RiskBadge";
import { SkeletonTable } from "../components/Skeleton";

const SECTORS = ["All", "Textile", "Retail", "Manufacturing", "Food Processing", "Construction", "Services", "IT/Software", "Agriculture", "Healthcare"];
const RISK_FILTERS = ["All", "Low", "Medium", "High"];

export default function MSMEListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: apiMSMEs, loading } = useSelector((s) => s.msme);
  const { demoMode, data: demoData, getScore } = useDemoData();

  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    if (!demoMode) dispatch(fetchMSMEs());
  }, [dispatch, demoMode]);

  const allMSMEs = demoMode ? demoData?.msmes || [] : apiMSMEs;
  const allScores = demoMode ? demoData?.scores || [] : [];

  // Enrich MSMEs with score data
  const enriched = allMSMEs.map((m) => {
    const score = demoMode ? allScores.find((s) => s.msmeId === m._id) : null;
    return { ...m, _score: score };
  });

  // Filter
  const filtered = enriched.filter((m) => {
    if (search) {
      const q = search.toLowerCase();
      if (!m.businessName.toLowerCase().includes(q) && !m.gstin.toLowerCase().includes(q) && !m.city?.toLowerCase().includes(q)) return false;
    }
    if (sectorFilter !== "All" && m.sector !== sectorFilter) return false;
    if (riskFilter !== "All" && m._score?.riskCategory !== riskFilter) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const maskGSTIN = (gstin) => {
    if (!gstin || gstin.length < 6) return gstin;
    return gstin.substring(0, 2) + "****" + gstin.substring(gstin.length - 4);
  };

  return (
    <div className="space-y-5 max-w-[1100px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">MSME Portfolio</h1>
          <p className="page-subtitle">{loading ? "Loading..." : `${filtered.length} businesses in portfolio`}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode("list")} className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${viewMode === "list" ? "bg-primary text-white border-primary" : "border-border text-txt-muted hover:bg-surface-alt"}`}>
            <List size={14} />
          </button>
          <button onClick={() => setViewMode("grid")} className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${viewMode === "grid" ? "bg-primary text-white border-primary" : "border-border text-txt-muted hover:bg-surface-alt"}`}>
            <LayoutGrid size={14} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />
            <input
              className="input-field pl-9"
              placeholder="Search by name, GSTIN, or city..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <select className="input-field max-w-[160px]" value={sectorFilter} onChange={(e) => { setSectorFilter(e.target.value); setCurrentPage(1); }}>
            {SECTORS.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="input-field max-w-[140px]" value={riskFilter} onChange={(e) => { setRiskFilter(e.target.value); setCurrentPage(1); }}>
            {RISK_FILTERS.map((r) => <option key={r} value={r}>{r === "All" ? "All Risk" : `${r} Risk`}</option>)}
          </select>
        </div>
      </div>

      {/* List View */}
      {viewMode === "list" && paginated.length > 0 && (
        <div className="table-container">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Business Name</th>
                <th className="table-header">GSTIN</th>
                <th className="table-header">Sector</th>
                <th className="table-header">Location</th>
                <th className="table-header">Score</th>
                <th className="table-header">Risk</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((m) => (
                <tr key={m._id} className="cursor-pointer" onClick={() => navigate(`/dashboard`)}>
                  <td className="table-cell font-medium text-txt">{m.businessName}</td>
                  <td className="table-cell font-mono text-xs">{maskGSTIN(m.gstin)}</td>
                  <td className="table-cell">{m.sector}</td>
                  <td className="table-cell text-xs">{m.city}, {m.registeredState}</td>
                  <td className="table-cell font-mono font-semibold">{m._score?.scoreValue || "—"}</td>
                  <td className="table-cell">
                    {m._score ? <RiskBadge category={m._score.riskCategory} /> : <span className="badge-neutral text-xs">Not scored</span>}
                  </td>
                  <td className="table-cell">
                    <span className={`flex items-center gap-1.5`}>
                      <span className={`status-dot ${m.status === "active" ? "status-dot-online" : m.status === "flagged" ? "status-dot-error" : "status-dot-offline"}`} />
                      <span className="text-xs capitalize">{m.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && paginated.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map((m) => (
            <div key={m._id} className="card-hover p-5" onClick={() => navigate(`/dashboard`)}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-txt">{m.businessName}</p>
                  <p className="text-xs text-txt-muted font-mono mt-0.5">{maskGSTIN(m.gstin)}</p>
                </div>
                <span className={`flex items-center gap-1`}>
                  <span className={`status-dot ${m.status === "active" ? "status-dot-online" : m.status === "flagged" ? "status-dot-error" : "status-dot-offline"}`} />
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="badge-neutral text-xs">{m.sector}</span>
                <span className="text-xs text-txt-muted">{m.city}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="text-xs text-txt-muted">Score</p>
                  <p className="text-lg font-bold text-txt">{m._score?.scoreValue || "—"}</p>
                </div>
                {m._score ? <RiskBadge category={m._score.riskCategory} /> : <span className="badge-neutral text-xs">Not scored</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="card p-10 text-center">
          <Building2 size={28} className="text-txt-muted mx-auto mb-3" />
          <p className="text-txt-secondary text-sm">
            {search || sectorFilter !== "All" || riskFilter !== "All"
              ? "No MSMEs match your filters"
              : "No MSMEs in portfolio. Enable demo mode to view sample data."}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-txt-muted">
            Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="btn-ghost py-1 px-2 disabled:opacity-30">
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${p === currentPage ? "bg-primary text-white" : "text-txt-secondary hover:bg-surface-alt"}`}
              >
                {p}
              </button>
            ))}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="btn-ghost py-1 px-2 disabled:opacity-30">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
