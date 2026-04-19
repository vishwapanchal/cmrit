"""ML service caller — with embedded fallback scoring engine.

Tries the external ML microservice first. If unavailable (e.g. on Render
single-service deploy), falls back to an identical local scoring engine
so the platform works fully standalone.
"""

import httpx
import math
import random

from app.config import settings

# ── Feature weights (same as ml/app/main.py) ────────────────────────
WEIGHTS = {
    "gst_filing_rate": 0.12,
    "gst_on_time_rate": 0.15,
    "avg_monthly_revenue": 0.08,
    "revenue_growth_rate": 0.12,
    "avg_net_cash_flow": 0.15,
    "cash_flow_volatility": 0.10,
    "upi_volume_growth": 0.05,
    "cheque_bounce_rate": 0.10,
    "vendor_payment_score": 0.08,
    "nil_return_ratio": 0.05,
}

DISPLAY_LABELS = {
    "gst_filing_rate": "GST Filing Consistency",
    "gst_on_time_rate": "GST On-Time Filing",
    "avg_monthly_revenue": "Average Monthly Revenue",
    "revenue_growth_rate": "Revenue Growth Rate",
    "avg_net_cash_flow": "Cash Flow Health",
    "cash_flow_volatility": "Cash Flow Stability",
    "upi_volume_growth": "Digital Payment Growth",
    "cheque_bounce_rate": "Cheque Bounce Rate",
    "vendor_payment_score": "Vendor Payment Behaviour",
    "nil_return_ratio": "Nil Return Frequency",
}


def _compute_score(f: dict) -> int:
    scores = {
        "gst_filing_rate": f.get("gst_filing_rate", 0),
        "gst_on_time_rate": f.get("gst_on_time_rate", 0),
        "avg_monthly_revenue": min(f.get("avg_monthly_revenue", 0) / 1000000, 1),
        "revenue_growth_rate": max(min((f.get("revenue_growth_rate", 0) + 50) / 150, 1), 0),
        "avg_net_cash_flow": max(min((f.get("avg_net_cash_flow", 0) + 200000) / 600000, 1), 0),
        "cash_flow_volatility": max(1 - f.get("cash_flow_volatility", 0) / 300000, 0),
        "upi_volume_growth": max(min((f.get("upi_volume_growth", 0) + 30) / 100, 1), 0),
        "cheque_bounce_rate": 1 - f.get("cheque_bounce_rate", 0),
        "vendor_payment_score": f.get("vendor_payment_score", 0),
        "nil_return_ratio": 1 - f.get("nil_return_ratio", 0),
    }
    weighted_sum = sum(scores[k] * WEIGHTS[k] for k in WEIGHTS)
    raw_score = 300 + int(weighted_sum * 550) + random.randint(-8, 8)
    return max(300, min(850, raw_score))


def _compute_shap(f: dict) -> dict:
    return {
        "gstConsistency": round((f.get("gst_filing_rate", 0) - 0.5) * WEIGHTS["gst_filing_rate"] * 2, 4),
        "cashFlowHealth": round((max(min(f.get("avg_net_cash_flow", 0) / 300000, 1), -1) - 0.3) * WEIGHTS["avg_net_cash_flow"] * 2, 4),
        "revenueGrowth": round((max(min(f.get("revenue_growth_rate", 0) / 100, 1), -1) - 0.1) * WEIGHTS["revenue_growth_rate"] * 2, 4),
        "paymentBehaviour": round((f.get("vendor_payment_score", 0) - 0.5) * WEIGHTS["vendor_payment_score"] * 2, 4),
        "transactionVolume": round((max(min(f.get("upi_volume_growth", 0) / 80, 1), -1) - 0.2) * WEIGHTS["upi_volume_growth"] * 2, 4),
        "chequeBouncerate": round(-(f.get("cheque_bounce_rate", 0)) * WEIGHTS["cheque_bounce_rate"] * 2, 4),
    }


def _detect_stress(f: dict) -> list:
    signals = []
    if f.get("avg_net_cash_flow", 0) < 0:
        signals.append({"signal": "negative_cash_flow", "severity": "critical", "description": "Negative average net cash flow detected — business outflows exceed inflows"})
    if f.get("revenue_growth_rate", 0) < -20:
        signals.append({"signal": "revenue_decline", "severity": "critical", "description": f"Revenue declining at {abs(f['revenue_growth_rate']):.0f}% — significant downward trend"})
    if f.get("cheque_bounce_rate", 0) > 0.15:
        signals.append({"signal": "high_cheque_bounce", "severity": "warning", "description": f"Cheque bounce rate at {f['cheque_bounce_rate']*100:.1f}% — potential liquidity issues"})
    if f.get("gst_on_time_rate", 0) < 0.7:
        signals.append({"signal": "late_gst_filings", "severity": "warning", "description": "More than 30% of GST filings are late — compliance risk"})
    if f.get("cash_flow_volatility", 0) > 200000:
        signals.append({"signal": "volatile_cash_flow", "severity": "warning", "description": "High cash flow volatility — inconsistent revenue patterns"})
    if f.get("vendor_payment_score", 0) < 0.6:
        signals.append({"signal": "late_vendor_payments", "severity": "warning", "description": "Vendor payment punctuality below 60% — potential supply chain stress"})
    return signals


def _detect_fraud(f: dict) -> list:
    flags = []
    if f.get("nil_return_ratio", 0) > 0.5 and f.get("avg_monthly_revenue", 0) > 500000:
        flags.append({"flag": "revenue_nil_return_mismatch", "severity": "high", "description": "High revenue reported but majority of GST returns are nil — potential revenue manipulation"})
    if f.get("revenue_growth_rate", 0) > 150:
        flags.append({"flag": "abnormal_growth", "severity": "medium", "description": f"Revenue growth of {f['revenue_growth_rate']:.0f}% is unusually high — verify data authenticity"})
    return flags


SHAP_KEY_MAP = {
    "gstConsistency": "gst_filing_rate",
    "cashFlowHealth": "avg_net_cash_flow",
    "revenueGrowth": "revenue_growth_rate",
    "paymentBehaviour": "vendor_payment_score",
    "transactionVolume": "upi_volume_growth",
    "chequeBouncerate": "cheque_bounce_rate",
}


def _local_score(features: dict) -> dict:
    """Run the scoring engine locally (identical to ml/app/main.py)."""
    score = _compute_score(features)
    shap_values = _compute_shap(features)
    stress_signals = _detect_stress(features)
    fraud_flags = _detect_fraud(features)
    risk_category = "Low" if score >= 700 else ("Medium" if score >= 550 else "High")

    shap_summary = [
        {
            "feature": k,
            "impact": v,
            "direction": "positive" if v >= 0 else "negative",
            "displayLabel": DISPLAY_LABELS.get(SHAP_KEY_MAP.get(k, k), k),
        }
        for k, v in shap_values.items()
    ]

    return {
        "score": score,
        "risk_category": risk_category,
        "model_version": "weighted_ensemble_v1",
        "shap_values": shap_values,
        "shap_summary": shap_summary,
        "stress_signals": stress_signals,
        "fraud_flags": fraud_flags,
    }


async def call_ml_service(features: dict) -> dict:
    """Call external ML service; fall back to local scoring if unavailable."""
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            response = await client.post(
                f"{settings.ML_SERVICE_URL}/score",
                json=features,
                headers={"Content-Type": "application/json"},
            )
            response.raise_for_status()
            return response.json()
    except (httpx.ConnectError, httpx.TimeoutException):
        # ML microservice not running — use embedded scoring engine
        print("[ML] External service unavailable — using local scoring engine")
        return _local_score(features)
    except httpx.HTTPStatusError as e:
        # If the ML service returned an error, also fall back
        print(f"[ML] External service error ({e.response.status_code}) — using local scoring engine")
        return _local_score(features)


async def check_ml_health() -> dict:
    """Check ML service health."""
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get(f"{settings.ML_SERVICE_URL}/health")
            return response.json()
    except Exception:
        return {"status": "local_fallback", "message": "Using embedded scoring engine"}
