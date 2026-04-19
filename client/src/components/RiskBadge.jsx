/**
 * RiskBadge — Displays risk category with color-coded badge
 * 
 * Props:
 *   category: "Low" | "Medium" | "High"
 *   score: number (optional — displayed alongside)
 */
export default function RiskBadge({ category, score }) {
  const config = {
    Low: { badge: "badge-low", label: "Low Risk", tip: "Strong financial indicators. Eligible for fast-track loan consideration." },
    Medium: { badge: "badge-medium", label: "Medium Risk", tip: "Mixed financial signals. Standard underwriting review recommended." },
    High: { badge: "badge-high", label: "High Risk", tip: "Significant financial stress signals. Enhanced due diligence required." },
  };

  const c = config[category] || config.Medium;

  return (
    <span className={`${c.badge} cursor-default`} title={c.tip}>
      {score != null && <span className="font-mono font-semibold">{score}</span>}
      {score != null && <span className="mx-0.5">·</span>}
      {c.label}
    </span>
  );
}
