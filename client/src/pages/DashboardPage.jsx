import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMSMEs, fetchGSTRecords, fetchTransactionRecords } from "../store/msmeSlice";
import { fetchLatestScore, fetchScoreHistory } from "../store/scoreSlice";
import { fetchLoans } from "../store/loanSlice";
import { useDemoData } from "../contexts/DemoDataContext";
import { useNavigate } from "react-router-dom";
import {
  BarChart3, Target, Wallet, FileCheck, Upload, Landmark, PlusCircle,
  AlertTriangle, TrendingUp, TrendingDown, Users, Activity,
} from "lucide-react";
import StatsCard from "../components/StatsCard";
import ScoreGauge from "../components/ScoreGauge";
import SHAPPanel from "../components/SHAPPanel";
import RiskBadge from "../components/RiskBadge";
import RevenueChart from "../components/RevenueChart";
import CashFlowChart from "../components/CashFlowChart";
import ScoreHistoryChart from "../components/ScoreHistoryChart";
import { SkeletonStatsRow, SkeletonGauge, SkeletonChart, SkeletonCard } from "../components/Skeleton";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const { list: msmes, gstRecords: apiGstRecords, transactionRecords: apiTxRecords, loading: msmeLoading } = useSelector((s) => s.msme);
  const { latest: apiLatest, history: apiHistory, loading: scoreLoading } = useSelector((s) => s.score);
  const { list: apiLoans, loading: loanLoading } = useSelector((s) => s.loan);

  const { demoMode, data: demoData } = useDemoData();
  const isLoading = !demoMode && (msmeLoading || scoreLoading || loanLoading);

  // Resolve data source: demo OR real API
  const activeUser = demoMode ? demoData?.users?.bankOfficer : user;
  const activeMSMEs = demoMode ? demoData?.msmes || [] : msmes;
  const activeLoans = demoMode ? demoData?.loans || [] : apiLoans;
  const activeLatest = demoMode ? demoData?.scores?.[0] || null : apiLatest;
  const activeHistory = demoMode ? demoData?.scoreHistory || [] : apiHistory;
  const activeGST = demoMode ? demoData?.gstRecords || [] : apiGstRecords;
  const activeTx = demoMode ? demoData?.transactions || [] : apiTxRecords;

  // Only fetch from API if not in demo mode
  useEffect(() => {
    if (!demoMode) {
      dispatch(fetchMSMEs());
      dispatch(fetchLoans());
    }
  }, [dispatch, demoMode]);

  useEffect(() => {
    if (!demoMode && msmes.length > 0) {
      const msmeId = msmes[0]._id;
      dispatch(fetchLatestScore(msmeId));
      dispatch(fetchScoreHistory(msmeId));
      dispatch(fetchGSTRecords(msmeId));
      dispatch(fetchTransactionRecords(msmeId));
    }
  }, [msmes, dispatch, demoMode]);

  const msme = activeMSMEs[0];
  const isBanker = activeUser?.role === "bank_officer" || activeUser?.role === "admin";

  // Portfolio stats for banker — computed from real API data
  const computedStats = (() => {
    const scored = activeMSMEs.filter((m) => m.latestScoreId);
    const scores = scored.map((m) => typeof m.latestScoreId === "object" ? m.latestScoreId.scoreValue : 0).filter(Boolean);
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const risk = { low: 0, medium: 0, high: 0 };
    scored.forEach((m) => {
      const cat = typeof m.latestScoreId === "object" ? m.latestScoreId.riskCategory : "";
      if (cat === "Low") risk.low++;
      else if (cat === "Medium") risk.medium++;
      else if (cat === "High") risk.high++;
    });
    return { totalMSMEs: activeMSMEs.length, scoredMSMEs: scored.length, avgScore: avg, riskDistribution: risk,
      pendingLoans: activeLoans.filter((l) => l.status === "submitted" || l.status === "under_review").length,
    };
  })();
  const portfolioStats = demoMode && demoData?.portfolioStats ? demoData.portfolioStats : computedStats;

  // Risk distribution for donut
  const riskData = [
    { name: "Low Risk", value: portfolioStats.riskDistribution?.low || 0, color: "var(--color-success)" },
    { name: "Medium Risk", value: portfolioStats.riskDistribution?.medium || 0, color: "var(--color-warning)" },
    { name: "High Risk", value: portfolioStats.riskDistribution?.high || 0, color: "var(--color-danger)" },
  ];

  // Recent activity from demo
  const recentActivity = demoMode ? (demoData?.auditLogs || []).slice(0, 8) : [];

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="space-y-6 max-w-[1200px]">
        <div>
          <h1 className="page-title">{isBanker ? "Portfolio Overview" : "Dashboard"}</h1>
          <p className="page-subtitle">Loading your data...</p>
        </div>
        <SkeletonStatsRow count={4} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-5">
            <SkeletonGauge />
            <SkeletonCard />
          </div>
          <div className="lg:col-span-8 space-y-5">
            <SkeletonChart />
            <SkeletonChart />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1200px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">{isBanker ? "Portfolio Overview" : "Dashboard"}</h1>
          <p className="page-subtitle">Welcome back, {activeUser?.name}</p>
        </div>
        {!msme && !demoMode && !isLoading && <button onClick={() => navigate("/msme/onboard")} className="btn-primary"><PlusCircle size={16} /> Onboard MSME</button>}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isBanker ? (
          <>
            <StatsCard icon={Users} label="Portfolio" value={portfolioStats.totalMSMEs} subtitle="Total MSMEs" />
            <StatsCard icon={Target} label="Scored" value={portfolioStats.scoredMSMEs} subtitle="Assessments complete" />
            <StatsCard icon={Wallet} label="Applications" value={portfolioStats.pendingLoans} subtitle="Pending review" />
            <StatsCard icon={BarChart3} label="Avg Score" value={portfolioStats.avgScore || "—"} subtitle="Portfolio average" />
          </>
        ) : (
          <>
            <StatsCard icon={BarChart3} label="Credit Score" value={activeLatest?.scoreValue || "—"} subtitle={activeLatest ? `Updated ${new Date(activeLatest.createdAt).toLocaleDateString("en-IN")}` : "Not scored"} />
            <StatsCard icon={Target} label="Risk Level" value={activeLatest?.riskCategory || "—"} />
            <StatsCard icon={Wallet} label="Loan Eligibility" value={activeLatest?.recommendedLoanAmount ? `₹${(activeLatest.recommendedLoanAmount / 100000).toFixed(0)}L` : "—"} subtitle={activeLatest?.recommendedInterestBand || ""} />
            <StatsCard icon={FileCheck} label="Status" value={msme ? "Active" : "Pending"} subtitle={msme ? "Data connected" : "Onboard to begin"} />
          </>
        )}
      </div>

      {/* Main Content */}
      {msme || demoMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Score + SHAP */}
          <div className="lg:col-span-4 space-y-5">
            <div className="card p-6 text-center">
              <h3 className="text-xs font-semibold text-txt-secondary uppercase tracking-wide mb-5">Credit Score</h3>
              {activeLatest ? (
                <>
                  <ScoreGauge score={activeLatest.scoreValue} />
                  <div className="mt-3"><RiskBadge category={activeLatest.riskCategory} score={activeLatest.scoreValue} /></div>
                  {activeLatest.explanationText && <p className="text-xs text-txt-muted mt-4 leading-relaxed">{activeLatest.explanationText}</p>}
                </>
              ) : (
                <div className="py-8">
                  <p className="text-txt-muted text-sm mb-4">No score generated yet</p>
                  <button onClick={() => navigate("/data-upload")} className="btn-primary text-sm"><Upload size={14} /> Upload Data</button>
                </div>
              )}
            </div>
            {activeLatest && <SHAPPanel shapSummary={activeLatest.shapSummary} shapValues={activeLatest.shapValues} />}

            {/* Risk Distribution (Banker) */}
            {isBanker && (
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-txt mb-4">Risk Distribution</h3>
                <div className="space-y-3">
                  {riskData.map((r) => (
                    <div key={r.name} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: r.color }} />
                      <span className="text-sm text-txt-secondary flex-1">{r.name}</span>
                      <span className="text-sm font-semibold text-txt">{r.value}</span>
                      <div className="w-20 h-1.5 bg-surface-alt rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ background: r.color, width: `${portfolioStats.totalMSMEs ? (r.value / portfolioStats.totalMSMEs) * 100 : 0}%`, transition: "width 0.6s ease" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Charts + Insights */}
          <div className="lg:col-span-8 space-y-5">
            <RevenueChart data={activeGST} />
            <CashFlowChart data={activeTx} />
            <ScoreHistoryChart data={activeHistory} />

            {/* Stress Signals */}
            {activeLatest?.stressSignals?.length > 0 && (
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-txt mb-1 flex items-center gap-2">
                  <AlertTriangle size={15} className="text-warning" /> Early Warning Signals
                </h3>
                <p className="text-xs text-txt-muted mb-3">Potential risk indicators detected in the data</p>
                <div className="space-y-2">
                  {activeLatest.stressSignals.map((s, i) => (
                    <div key={i} className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg text-sm ${s.severity === "critical" ? "bg-danger/10 text-danger border border-danger/20" : "bg-warning/10 text-warning border border-warning/20"}`}>
                      <span className="mt-0.5 flex-shrink-0"><AlertTriangle size={14} /></span>
                      <span className="text-xs leading-relaxed">{s.description || s.signal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Government Schemes */}
            {activeLatest?.eligibleGovernmentSchemes?.length > 0 && (
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-txt mb-3">Eligible Government Schemes</h3>
                <div className="flex flex-wrap gap-2">
                  {activeLatest.eligibleGovernmentSchemes.map((s, i) => (
                    <span key={i} className="badge-low text-xs">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Activity (Banker) */}
            {isBanker && recentActivity.length > 0 && (
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-txt mb-4 flex items-center gap-2">
                  <Activity size={15} className="text-primary" /> Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((log) => {
                    const actionLabels = {
                      score_generated: { label: "Score Generated", icon: Target, color: "text-primary" },
                      loan_submitted: { label: "Loan Submitted", icon: Landmark, color: "text-warning" },
                      loan_approved: { label: "Loan Approved", icon: FileCheck, color: "text-success" },
                      loan_rejected: { label: "Loan Rejected", icon: AlertTriangle, color: "text-danger" },
                      document_uploaded: { label: "Document Uploaded", icon: Upload, color: "text-primary" },
                      msme_created: { label: "MSME Created", icon: PlusCircle, color: "text-primary" },
                      user_login: { label: "User Login", icon: Users, color: "text-txt-muted" },
                    };
                    const meta = actionLabels[log.action] || { label: log.action, icon: Activity, color: "text-txt-muted" };
                    const Icon = meta.icon;
                    return (
                      <div key={log._id} className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg bg-surface-alt flex items-center justify-center flex-shrink-0 ${meta.color}`}>
                          <Icon size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-txt truncate">
                            <span className="font-medium">{log.performedBy?.name}</span>
                            {" — "}
                            <span className="text-txt-secondary">{meta.label}</span>
                          </p>
                        </div>
                        <span className="text-[10px] text-txt-muted flex-shrink-0">
                          {new Date(log.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Upload, title: "Upload Data", sub: "Import GST & transactions", path: "/data-upload" },
                { icon: Landmark, title: "Apply for Loan", sub: "Submit application", path: "/loans" },
                { icon: PlusCircle, title: "Add MSME", sub: "Onboard business", path: "/msme/onboard" },
              ].map((a, i) => (
                <button key={i} onClick={() => navigate(a.path)} className="card-hover p-4 text-left">
                  <a.icon size={18} className="text-primary mb-2" strokeWidth={1.8} />
                  <p className="text-sm font-medium text-txt">{a.title}</p>
                  <p className="text-xs text-txt-muted mt-0.5">{a.sub}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-12 text-center">
          <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mx-auto mb-4">
            <BarChart3 size={24} className="text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-txt mb-2">No MSME Profile Found</h2>
          <p className="text-txt-secondary text-sm mb-6 max-w-md mx-auto">
            Get started by onboarding your MSME business profile. Upload your GST and transaction data to receive an AI-powered credit score.
          </p>
          <button onClick={() => navigate("/msme/onboard")} className="btn-primary"><PlusCircle size={16} /> Onboard Your MSME</button>
        </div>
      )}
    </div>
  );
}
