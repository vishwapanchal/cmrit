/**
 * CreditSaathi — Demo Data Module
 * 
 * Realistic, curated Indian MSME demo data that mirrors exact API response shapes.
 * When the Demo Mode toggle is ON, all pages render from this data.
 * When OFF, pages use real API data (or show empty states).
 * 
 * Data shapes match the MongoDB schemas defined in requirements-2.md §5.2.
 */

// ─── Users ─────────────────────────────────────────────────────────────────────
export const demoUsers = {
  msmeOwner: {
    _id: "usr_msme_001",
    name: "Rajesh Kumar Sharma",
    email: "rajesh@abctextiles.in",
    role: "msme_owner",
    organisationName: "ABC Textiles Pvt Ltd",
    organisationType: "msme",
    isVerified: true,
    createdAt: "2025-08-15T10:30:00Z",
  },
  bankOfficer: {
    _id: "usr_bank_001",
    name: "Priya Venkatesh",
    email: "priya.v@statebank.in",
    role: "bank_officer",
    organisationName: "State Bank of India",
    organisationType: "bank",
    isVerified: true,
    createdAt: "2025-07-01T09:00:00Z",
  },
  admin: {
    _id: "usr_admin_001",
    name: "Admin CreditSaathi",
    email: "admin@creditsaathi.in",
    role: "admin",
    organisationName: "CreditSaathi Technologies",
    organisationType: "msme",
    isVerified: true,
    createdAt: "2025-01-01T00:00:00Z",
  },
};

// ─── MSMEs ─────────────────────────────────────────────────────────────────────
export const demoMSMEs = [
  {
    _id: "msme_001",
    owner: "usr_msme_001",
    businessName: "ABC Textiles Pvt Ltd",
    gstin: "27AABCA1234F1ZP",
    pan: "AABCA1234F",
    businessType: "small",
    sector: "Textile",
    incorporationDate: "2018-03-15",
    registeredState: "Maharashtra",
    city: "Mumbai",
    contactEmail: "info@abctextiles.in",
    contactPhone: "+91 98765 43210",
    udyamRegistrationNo: "UDYAM-MH-19-0012345",
    annualTurnoverBand: "1.5Cr-5Cr",
    employeeCount: 45,
    bankAccountLinked: true,
    aaConsentGiven: true,
    latestScoreId: "score_001",
    status: "active",
    createdAt: "2025-08-15T10:30:00Z",
    updatedAt: "2026-04-10T14:20:00Z",
  },
  {
    _id: "msme_002",
    owner: "usr_msme_002",
    businessName: "Sharma Electronics Hub",
    gstin: "09BBBSE5678G2ZQ",
    pan: "BBBSE5678G",
    businessType: "micro",
    sector: "Retail",
    incorporationDate: "2020-06-20",
    registeredState: "Uttar Pradesh",
    city: "Lucknow",
    contactEmail: "contact@sharmaelectronics.in",
    contactPhone: "+91 88765 12340",
    udyamRegistrationNo: "UDYAM-UP-20-0054321",
    annualTurnoverBand: "<40L",
    employeeCount: 8,
    bankAccountLinked: true,
    aaConsentGiven: false,
    latestScoreId: "score_002",
    status: "active",
    createdAt: "2025-10-01T08:00:00Z",
    updatedAt: "2026-03-28T11:15:00Z",
  },
  {
    _id: "msme_003",
    owner: "usr_msme_003",
    businessName: "GreenLeaf Organic Foods",
    gstin: "29CCCGL9012H3ZR",
    pan: "CCCGL9012H",
    businessType: "small",
    sector: "Food Processing",
    incorporationDate: "2019-01-10",
    registeredState: "Karnataka",
    city: "Bengaluru",
    contactEmail: "hello@greenleafofoods.in",
    contactPhone: "+91 99012 34567",
    udyamRegistrationNo: "UDYAM-KA-19-0098765",
    annualTurnoverBand: "40L-1.5Cr",
    employeeCount: 22,
    bankAccountLinked: true,
    aaConsentGiven: true,
    latestScoreId: "score_003",
    status: "active",
    createdAt: "2025-09-12T12:00:00Z",
    updatedAt: "2026-04-05T09:30:00Z",
  },
  {
    _id: "msme_004",
    owner: "usr_msme_004",
    businessName: "Patel Steel Works",
    gstin: "24DDDPS3456J4ZS",
    pan: "DDDPS3456J",
    businessType: "medium",
    sector: "Manufacturing",
    incorporationDate: "2015-07-22",
    registeredState: "Gujarat",
    city: "Ahmedabad",
    contactEmail: "info@patelsteel.co.in",
    contactPhone: "+91 94567 89012",
    udyamRegistrationNo: "UDYAM-GJ-15-0023456",
    annualTurnoverBand: "5Cr-25Cr",
    employeeCount: 120,
    bankAccountLinked: true,
    aaConsentGiven: true,
    latestScoreId: "score_004",
    status: "active",
    createdAt: "2025-07-20T14:00:00Z",
    updatedAt: "2026-04-12T16:45:00Z",
  },
  {
    _id: "msme_005",
    owner: "usr_msme_005",
    businessName: "TechNova Solutions",
    gstin: "33EEETN7890K5ZT",
    pan: "EEETN7890K",
    businessType: "small",
    sector: "IT/Software",
    incorporationDate: "2021-11-01",
    registeredState: "Tamil Nadu",
    city: "Chennai",
    contactEmail: "admin@technovasolutions.in",
    contactPhone: "+91 91234 56789",
    udyamRegistrationNo: "UDYAM-TN-21-0067890",
    annualTurnoverBand: "40L-1.5Cr",
    employeeCount: 15,
    bankAccountLinked: false,
    aaConsentGiven: false,
    latestScoreId: null,
    status: "active",
    createdAt: "2026-01-05T11:00:00Z",
    updatedAt: "2026-04-01T10:00:00Z",
  },
  {
    _id: "msme_006",
    owner: "usr_msme_006",
    businessName: "Sunrise Construction Co",
    gstin: "06FFFSC2345L6ZU",
    pan: "FFFSC2345L",
    businessType: "medium",
    sector: "Construction",
    incorporationDate: "2016-04-18",
    registeredState: "Haryana",
    city: "Gurugram",
    contactEmail: "contact@sunriseconst.in",
    contactPhone: "+91 97654 32100",
    udyamRegistrationNo: "UDYAM-HR-16-0034567",
    annualTurnoverBand: "5Cr-25Cr",
    employeeCount: 85,
    bankAccountLinked: true,
    aaConsentGiven: true,
    latestScoreId: "score_006",
    status: "flagged",
    createdAt: "2025-08-01T07:30:00Z",
    updatedAt: "2026-04-15T13:00:00Z",
  },
];

// ─── Credit Scores ──────────────────────────────────────────────────────────────
export const demoScores = [
  {
    _id: "score_001",
    msmeId: "msme_001",
    generatedBy: "usr_bank_001",
    scoreValue: 742,
    riskCategory: "Low",
    modelVersion: "xgboost_v1.2",
    shapValues: {
      gstConsistency: 0.082,
      cashFlowHealth: 0.065,
      revenueGrowth: 0.041,
      paymentBehaviour: 0.032,
      transactionVolume: 0.019,
      chequeBounceRate: -0.028,
    },
    shapSummary: [
      { feature: "GST Filing Consistency", impact: 0.082, direction: "positive", displayLabel: "Your GST filings have been regular and on time for the last 8 months" },
      { feature: "Cash Flow Health", impact: 0.065, direction: "positive", displayLabel: "Healthy net positive cash flow consistently maintained" },
      { feature: "Revenue Growth", impact: 0.041, direction: "positive", displayLabel: "Quarterly revenue shows steady upward trend" },
      { feature: "Payment Behaviour", impact: 0.032, direction: "positive", displayLabel: "Vendor payments are made punctually 92% of the time" },
      { feature: "Digital Payments", impact: 0.019, direction: "positive", displayLabel: "Strong UPI transaction volume and growth" },
      { feature: "Cheque Bounce Rate", impact: -0.028, direction: "negative", displayLabel: "Occasional cheque bounces detected — 2 in last 8 months" },
    ],
    featureInputSnapshot: {
      gst_filing_rate: 1.0,
      gst_on_time_rate: 0.875,
      avg_monthly_revenue: 508750,
      revenue_growth_rate: 0.12,
      avg_net_cash_flow: 170000,
      cash_flow_volatility: 45000,
      upi_volume_growth: 0.15,
      cheque_bounce_rate: 0.04,
      vendor_payment_score: 0.92,
      nil_return_ratio: 0.0,
    },
    recommendedLoanAmount: 5000000,
    recommendedInterestBand: "8–10%",
    eligibleGovernmentSchemes: ["Mudra Yojana (Tarun)", "CGTMSE", "PSB Loans in 59 Minutes"],
    stressSignals: [],
    fraudFlags: [],
    explanationText: "Your credit score of 742 is driven primarily by your strong cash flow consistency and on-time GST filings. Your vendor payment punctuality is excellent at 92%. The main area pulling your score down is occasional cheque bounces (2 in 8 months). Addressing this could push your score above 760.",
    auditHash: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    createdAt: "2026-04-10T14:20:00Z",
  },
  {
    _id: "score_002",
    msmeId: "msme_002",
    generatedBy: "usr_bank_001",
    scoreValue: 618,
    riskCategory: "Medium",
    modelVersion: "xgboost_v1.2",
    shapValues: {
      gstConsistency: 0.045,
      cashFlowHealth: -0.032,
      revenueGrowth: -0.018,
      paymentBehaviour: 0.028,
      transactionVolume: 0.012,
      chequeBounceRate: -0.041,
    },
    shapSummary: [
      { feature: "GST Filing Consistency", impact: 0.045, direction: "positive", displayLabel: "GST filings are regular but with occasional delays" },
      { feature: "Cash Flow Health", impact: -0.032, direction: "negative", displayLabel: "Outflows occasionally exceed inflows" },
      { feature: "Revenue Growth", impact: -0.018, direction: "negative", displayLabel: "Revenue has been flat over the last two quarters" },
      { feature: "Payment Behaviour", impact: 0.028, direction: "positive", displayLabel: "Vendor payments mostly punctual at 85%" },
      { feature: "Digital Payments", impact: 0.012, direction: "positive", displayLabel: "Moderate UPI activity" },
      { feature: "Cheque Bounce Rate", impact: -0.041, direction: "negative", displayLabel: "4 cheque bounces in 8 months — requires attention" },
    ],
    featureInputSnapshot: {
      gst_filing_rate: 0.875,
      gst_on_time_rate: 0.75,
      avg_monthly_revenue: 280000,
      revenue_growth_rate: -0.02,
      avg_net_cash_flow: 45000,
      cash_flow_volatility: 72000,
      upi_volume_growth: 0.05,
      cheque_bounce_rate: 0.12,
      vendor_payment_score: 0.85,
      nil_return_ratio: 0.0,
    },
    recommendedLoanAmount: 1000000,
    recommendedInterestBand: "13–16%",
    eligibleGovernmentSchemes: ["Mudra Yojana (Kishor)"],
    stressSignals: [
      { signal: "cheque_bounce_increase", severity: "warning", description: "Cheque bounce rate increased 50% over the last quarter" },
    ],
    fraudFlags: [],
    explanationText: "Your score of 618 places you in the Medium Risk category. While your GST filings and vendor payments are decent, your cash flow has been tight and cheque bounce rate is a concern. Improving cash reserves and reducing bounces could significantly boost your score.",
    auditHash: "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6a7",
    createdAt: "2026-03-28T11:15:00Z",
  },
  {
    _id: "score_003",
    msmeId: "msme_003",
    generatedBy: "usr_bank_001",
    scoreValue: 695,
    riskCategory: "Medium",
    modelVersion: "xgboost_v1.2",
    shapValues: {
      gstConsistency: 0.068,
      cashFlowHealth: 0.052,
      revenueGrowth: 0.025,
      paymentBehaviour: 0.035,
      transactionVolume: 0.015,
      chequeBounceRate: -0.008,
    },
    shapSummary: [
      { feature: "GST Filing Consistency", impact: 0.068, direction: "positive", displayLabel: "Solid filing record with 90%+ on-time rate" },
      { feature: "Cash Flow Health", impact: 0.052, direction: "positive", displayLabel: "Good net positive cash flow" },
      { feature: "Revenue Growth", impact: 0.025, direction: "positive", displayLabel: "Moderate revenue growth trajectory" },
      { feature: "Payment Behaviour", impact: 0.035, direction: "positive", displayLabel: "Vendor payments very punctual at 94%" },
      { feature: "Digital Payments", impact: 0.015, direction: "positive", displayLabel: "Growing UPI transaction base" },
      { feature: "Cheque Bounce Rate", impact: -0.008, direction: "negative", displayLabel: "Minimal bounces — within acceptable range" },
    ],
    featureInputSnapshot: {
      gst_filing_rate: 1.0,
      gst_on_time_rate: 0.917,
      avg_monthly_revenue: 420000,
      revenue_growth_rate: 0.08,
      avg_net_cash_flow: 110000,
      cash_flow_volatility: 38000,
      upi_volume_growth: 0.18,
      cheque_bounce_rate: 0.02,
      vendor_payment_score: 0.94,
      nil_return_ratio: 0.0,
    },
    recommendedLoanAmount: 2500000,
    recommendedInterestBand: "10–13%",
    eligibleGovernmentSchemes: ["Mudra Yojana (Tarun)", "CGTMSE"],
    stressSignals: [],
    fraudFlags: [],
    explanationText: "Your score of 695 is just below the Low Risk threshold. Strong GST compliance and vendor payment behaviour are your best factors. Just 5 more points would unlock better interest rates — maintain current trends for 1-2 months.",
    auditHash: "c3d4e5f6a7b8c9d0e1f2a3b4c5d6a7b8",
    createdAt: "2026-04-05T09:30:00Z",
  },
  {
    _id: "score_004",
    msmeId: "msme_004",
    generatedBy: "usr_bank_001",
    scoreValue: 788,
    riskCategory: "Low",
    modelVersion: "xgboost_v1.2",
    shapValues: {
      gstConsistency: 0.095,
      cashFlowHealth: 0.088,
      revenueGrowth: 0.062,
      paymentBehaviour: 0.045,
      transactionVolume: 0.028,
      chequeBounceRate: -0.005,
    },
    shapSummary: [
      { feature: "GST Filing Consistency", impact: 0.095, direction: "positive", displayLabel: "Perfect 100% on-time GST filing record" },
      { feature: "Cash Flow Health", impact: 0.088, direction: "positive", displayLabel: "Very strong and consistent cash flow" },
      { feature: "Revenue Growth", impact: 0.062, direction: "positive", displayLabel: "Strong 18% quarterly revenue growth" },
      { feature: "Payment Behaviour", impact: 0.045, direction: "positive", displayLabel: "Exemplary vendor payment record at 97%" },
      { feature: "Digital Payments", impact: 0.028, direction: "positive", displayLabel: "High UPI volume with consistent growth" },
      { feature: "Cheque Bounce Rate", impact: -0.005, direction: "negative", displayLabel: "Near-zero bounces — excellent" },
    ],
    featureInputSnapshot: {
      gst_filing_rate: 1.0,
      gst_on_time_rate: 1.0,
      avg_monthly_revenue: 3200000,
      revenue_growth_rate: 0.18,
      avg_net_cash_flow: 850000,
      cash_flow_volatility: 120000,
      upi_volume_growth: 0.22,
      cheque_bounce_rate: 0.01,
      vendor_payment_score: 0.97,
      nil_return_ratio: 0.0,
    },
    recommendedLoanAmount: 5000000,
    recommendedInterestBand: "8–10%",
    eligibleGovernmentSchemes: ["Mudra Yojana (Tarun)", "CGTMSE", "PSB Loans in 59 Minutes"],
    stressSignals: [],
    fraudFlags: [],
    explanationText: "Outstanding credit profile with a score of 788. Perfect GST compliance, strong cash flows, and excellent payment behaviour make this MSME a prime lending candidate. Fast-track eligible for all government schemes.",
    auditHash: "d4e5f6a7b8c9d0e1f2a3b4c5d6a7b8c9",
    createdAt: "2026-04-12T16:45:00Z",
  },
  {
    _id: "score_006",
    msmeId: "msme_006",
    generatedBy: "usr_bank_001",
    scoreValue: 485,
    riskCategory: "High",
    modelVersion: "xgboost_v1.2",
    shapValues: {
      gstConsistency: -0.045,
      cashFlowHealth: -0.082,
      revenueGrowth: -0.065,
      paymentBehaviour: -0.038,
      transactionVolume: -0.012,
      chequeBounceRate: -0.055,
    },
    shapSummary: [
      { feature: "GST Filing Consistency", impact: -0.045, direction: "negative", displayLabel: "Missed 3 GST filings in the last 8 months" },
      { feature: "Cash Flow Health", impact: -0.082, direction: "negative", displayLabel: "Persistent negative cash flow for 4 consecutive months" },
      { feature: "Revenue Growth", impact: -0.065, direction: "negative", displayLabel: "Revenue declined 35% this quarter" },
      { feature: "Payment Behaviour", impact: -0.038, direction: "negative", displayLabel: "Vendor payments delayed — only 65% on-time" },
      { feature: "Digital Payments", impact: -0.012, direction: "negative", displayLabel: "Declining UPI transaction volume" },
      { feature: "Cheque Bounce Rate", impact: -0.055, direction: "negative", displayLabel: "High bounce rate — 8 bounces in 8 months" },
    ],
    featureInputSnapshot: {
      gst_filing_rate: 0.625,
      gst_on_time_rate: 0.5,
      avg_monthly_revenue: 1800000,
      revenue_growth_rate: -0.35,
      avg_net_cash_flow: -220000,
      cash_flow_volatility: 380000,
      upi_volume_growth: -0.15,
      cheque_bounce_rate: 0.22,
      vendor_payment_score: 0.65,
      nil_return_ratio: 0.125,
    },
    recommendedLoanAmount: 0,
    recommendedInterestBand: "N/A",
    eligibleGovernmentSchemes: [],
    stressSignals: [
      { signal: "cash_flow_negative_streak", severity: "critical", description: "Negative net cash flow for 4 consecutive months" },
      { signal: "revenue_decline_sharp", severity: "critical", description: "Revenue declined by 35% in the current quarter" },
      { signal: "gst_filing_gap", severity: "warning", description: "3 missed GST filings in the last 8 months" },
      { signal: "cheque_bounce_increase", severity: "warning", description: "Cheque bounce rate at 22% — well above threshold" },
    ],
    fraudFlags: [
      { flag: "gst_revenue_vs_transaction_mismatch", severity: "medium", description: "Declared GST revenue appears higher than transaction inflows" },
    ],
    explanationText: "High Risk — Score of 485 reflects significant financial distress. Persistent negative cash flow, missed GST filings, and a high cheque bounce rate are serious concerns. Not eligible for lending at this time. Immediate financial restructuring recommended.",
    auditHash: "f6a7b8c9d0e1f2a3b4c5d6a7b8c9d0e1",
    createdAt: "2026-04-15T13:00:00Z",
  },
];

// ─── Score History (for msme_001) ───────────────────────────────────────────────
export const demoScoreHistory = [
  { _id: "sh_001", msmeId: "msme_001", scoreValue: 680, riskCategory: "Medium", createdAt: "2025-10-15T10:00:00Z", generatedBy: "usr_bank_001", modelVersion: "xgboost_v1.0" },
  { _id: "sh_002", msmeId: "msme_001", scoreValue: 695, riskCategory: "Medium", createdAt: "2025-11-20T12:00:00Z", generatedBy: "usr_bank_001", modelVersion: "xgboost_v1.0" },
  { _id: "sh_003", msmeId: "msme_001", scoreValue: 710, riskCategory: "Low", createdAt: "2025-12-18T14:00:00Z", generatedBy: "usr_bank_001", modelVersion: "xgboost_v1.1" },
  { _id: "sh_004", msmeId: "msme_001", scoreValue: 705, riskCategory: "Low", createdAt: "2026-01-22T09:00:00Z", generatedBy: "usr_bank_001", modelVersion: "xgboost_v1.1" },
  { _id: "sh_005", msmeId: "msme_001", scoreValue: 725, riskCategory: "Low", createdAt: "2026-02-20T11:00:00Z", generatedBy: "usr_bank_001", modelVersion: "xgboost_v1.2" },
  { _id: "sh_006", msmeId: "msme_001", scoreValue: 742, riskCategory: "Low", createdAt: "2026-04-10T14:20:00Z", generatedBy: "usr_bank_001", modelVersion: "xgboost_v1.2" },
];

// ─── GST Records (for msme_001) ─────────────────────────────────────────────────
export const demoGSTRecords = [
  { _id: "gst_001", msmeId: "msme_001", filingPeriod: "GSTR3B_2025_09", filingType: "GSTR3B", filedOnTime: true, filingDate: "2025-10-10", taxableRevenue: 450000, taxPaid: 81000, nilReturn: false },
  { _id: "gst_002", msmeId: "msme_001", filingPeriod: "GSTR3B_2025_10", filingType: "GSTR3B", filedOnTime: true, filingDate: "2025-11-12", taxableRevenue: 520000, taxPaid: 93600, nilReturn: false },
  { _id: "gst_003", msmeId: "msme_001", filingPeriod: "GSTR3B_2025_11", filingType: "GSTR3B", filedOnTime: false, filingDate: "2025-12-22", taxableRevenue: 380000, taxPaid: 68400, nilReturn: false },
  { _id: "gst_004", msmeId: "msme_001", filingPeriod: "GSTR3B_2025_12", filingType: "GSTR3B", filedOnTime: true, filingDate: "2026-01-14", taxableRevenue: 610000, taxPaid: 109800, nilReturn: false },
  { _id: "gst_005", msmeId: "msme_001", filingPeriod: "GSTR3B_2026_01", filingType: "GSTR3B", filedOnTime: true, filingDate: "2026-02-11", taxableRevenue: 490000, taxPaid: 88200, nilReturn: false },
  { _id: "gst_006", msmeId: "msme_001", filingPeriod: "GSTR3B_2026_02", filingType: "GSTR3B", filedOnTime: true, filingDate: "2026-03-15", taxableRevenue: 570000, taxPaid: 102600, nilReturn: false },
  { _id: "gst_007", msmeId: "msme_001", filingPeriod: "GSTR3B_2026_03", filingType: "GSTR3B", filedOnTime: true, filingDate: "2026-04-08", taxableRevenue: 630000, taxPaid: 113400, nilReturn: false },
  { _id: "gst_008", msmeId: "msme_001", filingPeriod: "GSTR1_2025_Q3", filingType: "GSTR1", filedOnTime: true, filingDate: "2026-01-10", taxableRevenue: 1350000, taxPaid: 243000, nilReturn: false },
];

// ─── Transaction Records (for msme_001) ─────────────────────────────────────────
export const demoTransactions = [
  { _id: "tx_001", msmeId: "msme_001", month: "2025-09", totalInflow: 580000, totalOutflow: 420000, netCashFlow: 160000, upiTransactionCount: 145, upiVolume: 320000, chequeBouncedCount: 0, emiPaidOnTime: true, vendorPaymentsPunctuality: 0.92, seasonalityFlag: false, dataSource: "manual" },
  { _id: "tx_002", msmeId: "msme_001", month: "2025-10", totalInflow: 650000, totalOutflow: 480000, netCashFlow: 170000, upiTransactionCount: 160, upiVolume: 380000, chequeBouncedCount: 1, emiPaidOnTime: true, vendorPaymentsPunctuality: 0.88, seasonalityFlag: false, dataSource: "manual" },
  { _id: "tx_003", msmeId: "msme_001", month: "2025-11", totalInflow: 510000, totalOutflow: 450000, netCashFlow: 60000, upiTransactionCount: 132, upiVolume: 290000, chequeBouncedCount: 0, emiPaidOnTime: true, vendorPaymentsPunctuality: 0.90, seasonalityFlag: false, dataSource: "manual" },
  { _id: "tx_004", msmeId: "msme_001", month: "2025-12", totalInflow: 720000, totalOutflow: 510000, netCashFlow: 210000, upiTransactionCount: 178, upiVolume: 420000, chequeBouncedCount: 0, emiPaidOnTime: true, vendorPaymentsPunctuality: 0.95, seasonalityFlag: true, dataSource: "manual" },
  { _id: "tx_005", msmeId: "msme_001", month: "2026-01", totalInflow: 600000, totalOutflow: 470000, netCashFlow: 130000, upiTransactionCount: 155, upiVolume: 350000, chequeBouncedCount: 1, emiPaidOnTime: true, vendorPaymentsPunctuality: 0.85, seasonalityFlag: false, dataSource: "manual" },
  { _id: "tx_006", msmeId: "msme_001", month: "2026-02", totalInflow: 690000, totalOutflow: 500000, netCashFlow: 190000, upiTransactionCount: 170, upiVolume: 400000, chequeBouncedCount: 0, emiPaidOnTime: true, vendorPaymentsPunctuality: 0.91, seasonalityFlag: false, dataSource: "manual" },
  { _id: "tx_007", msmeId: "msme_001", month: "2026-03", totalInflow: 750000, totalOutflow: 530000, netCashFlow: 220000, upiTransactionCount: 190, upiVolume: 450000, chequeBouncedCount: 0, emiPaidOnTime: true, vendorPaymentsPunctuality: 0.93, seasonalityFlag: false, dataSource: "manual" },
  { _id: "tx_008", msmeId: "msme_001", month: "2026-04", totalInflow: 540000, totalOutflow: 480000, netCashFlow: 60000, upiTransactionCount: 140, upiVolume: 310000, chequeBouncedCount: 0, emiPaidOnTime: true, vendorPaymentsPunctuality: 0.87, seasonalityFlag: false, dataSource: "manual" },
];

// ─── Loan Applications ──────────────────────────────────────────────────────────
export const demoLoans = [
  {
    _id: "loan_001",
    msmeId: { _id: "msme_001", businessName: "ABC Textiles Pvt Ltd", gstin: "27AABCA1234F1ZP" },
    assignedOfficer: "usr_bank_001",
    scoreId: { _id: "score_001", scoreValue: 742, riskCategory: "Low" },
    requestedAmount: 3500000,
    loanPurpose: "working_capital",
    repaymentTenure: 24,
    status: "approved",
    officerRemarks: "Strong financial profile. Approved at recommended amount.",
    decisionDate: "2026-04-12T10:00:00Z",
    createdAt: "2026-04-10T15:00:00Z",
    updatedAt: "2026-04-12T10:00:00Z",
  },
  {
    _id: "loan_002",
    msmeId: { _id: "msme_002", businessName: "Sharma Electronics Hub", gstin: "09BBBSE5678G2ZQ" },
    assignedOfficer: "usr_bank_001",
    scoreId: { _id: "score_002", scoreValue: 618, riskCategory: "Medium" },
    requestedAmount: 800000,
    loanPurpose: "equipment",
    repaymentTenure: 12,
    status: "under_review",
    officerRemarks: "",
    decisionDate: null,
    createdAt: "2026-04-01T09:00:00Z",
    updatedAt: "2026-04-01T09:00:00Z",
  },
  {
    _id: "loan_003",
    msmeId: { _id: "msme_003", businessName: "GreenLeaf Organic Foods", gstin: "29CCCGL9012H3ZR" },
    assignedOfficer: "usr_bank_001",
    scoreId: { _id: "score_003", scoreValue: 695, riskCategory: "Medium" },
    requestedAmount: 2000000,
    loanPurpose: "expansion",
    repaymentTenure: 36,
    status: "submitted",
    officerRemarks: "",
    decisionDate: null,
    createdAt: "2026-04-08T14:30:00Z",
    updatedAt: "2026-04-08T14:30:00Z",
  },
  {
    _id: "loan_004",
    msmeId: { _id: "msme_006", businessName: "Sunrise Construction Co", gstin: "06FFFSC2345L6ZU" },
    assignedOfficer: "usr_bank_001",
    scoreId: { _id: "score_006", scoreValue: 485, riskCategory: "High" },
    requestedAmount: 5000000,
    loanPurpose: "working_capital",
    repaymentTenure: 12,
    status: "rejected",
    officerRemarks: "High risk profile. Cash flow negative for 4 months. Recommend financial restructuring before re-application.",
    decisionDate: "2026-04-16T11:00:00Z",
    createdAt: "2026-04-15T14:00:00Z",
    updatedAt: "2026-04-16T11:00:00Z",
  },
];

// ─── Documents ──────────────────────────────────────────────────────────────────
export const demoDocuments = [
  { _id: "doc_001", msmeId: "msme_001", documentType: "pan_card", fileName: "ABC_Textiles_PAN.pdf", fileSize: 245000, status: "verified", uploadedAt: "2025-09-01T10:00:00Z", verifiedBy: "usr_bank_001", verifiedAt: "2025-09-02T14:00:00Z" },
  { _id: "doc_002", msmeId: "msme_001", documentType: "aadhaar_front", fileName: "Rajesh_Aadhaar_Front.jpg", fileSize: 180000, status: "verified", uploadedAt: "2025-09-01T10:05:00Z", verifiedBy: "usr_bank_001", verifiedAt: "2025-09-02T14:05:00Z" },
  { _id: "doc_003", msmeId: "msme_001", documentType: "bank_statement", fileName: "ABC_Bank_Statement_6M.pdf", fileSize: 1450000, status: "verified", uploadedAt: "2025-09-05T11:00:00Z", verifiedBy: "usr_bank_001", verifiedAt: "2025-09-06T09:00:00Z" },
  { _id: "doc_004", msmeId: "msme_001", documentType: "business_certificate", fileName: "Udyam_Registration.pdf", fileSize: 320000, status: "pending", uploadedAt: "2026-04-01T08:00:00Z", verifiedBy: null, verifiedAt: null },
  { _id: "doc_005", msmeId: "msme_002", documentType: "pan_card", fileName: "Sharma_PAN.pdf", fileSize: 210000, status: "rejected", uploadedAt: "2025-11-10T12:00:00Z", verifiedBy: "usr_bank_001", verifiedAt: "2025-11-11T10:00:00Z", rejectionReason: "Image is blurred. Please re-upload a clear copy." },
];

// ─── Notifications ──────────────────────────────────────────────────────────────
export const demoNotifications = [
  { _id: "notif_001", type: "score_generated", title: "Credit Score Generated", message: "ABC Textiles scored 742 (Low Risk)", read: false, createdAt: "2026-04-10T14:20:00Z", link: "/dashboard" },
  { _id: "notif_002", type: "loan_approved", title: "Loan Approved", message: "₹35L loan approved for ABC Textiles — Working Capital", read: false, createdAt: "2026-04-12T10:00:00Z", link: "/loans" },
  { _id: "notif_003", type: "stress_alert", title: "Stress Alert", message: "Sunrise Construction: Negative cash flow for 4 months", read: false, createdAt: "2026-04-15T13:00:00Z", link: "/dashboard" },
  { _id: "notif_004", type: "loan_submitted", title: "New Loan Application", message: "GreenLeaf Organic Foods submitted ₹20L application", read: true, createdAt: "2026-04-08T14:30:00Z", link: "/loans" },
  { _id: "notif_005", type: "document_uploaded", title: "Document Uploaded", message: "ABC Textiles uploaded Udyam Registration Certificate", read: true, createdAt: "2026-04-01T08:00:00Z", link: "/documents" },
  { _id: "notif_006", type: "score_generated", title: "Credit Score Generated", message: "Patel Steel Works scored 788 (Low Risk)", read: true, createdAt: "2026-04-12T16:45:00Z", link: "/dashboard" },
  { _id: "notif_007", type: "loan_rejected", title: "Loan Rejected", message: "Sunrise Construction ₹50L application — High Risk", read: true, createdAt: "2026-04-16T11:00:00Z", link: "/loans" },
];

// ─── Audit Logs ─────────────────────────────────────────────────────────────────
export const demoAuditLogs = [
  { _id: "audit_001", action: "score_generated", performedBy: { _id: "usr_bank_001", name: "Priya Venkatesh", role: "bank_officer" }, targetMsmeId: "msme_001", entityType: "CreditScore", entityId: "score_001", createdAt: "2026-04-10T14:20:00Z" },
  { _id: "audit_002", action: "loan_submitted", performedBy: { _id: "usr_msme_001", name: "Rajesh Kumar Sharma", role: "msme_owner" }, targetMsmeId: "msme_001", entityType: "LoanApplication", entityId: "loan_001", createdAt: "2026-04-10T15:00:00Z" },
  { _id: "audit_003", action: "loan_approved", performedBy: { _id: "usr_bank_001", name: "Priya Venkatesh", role: "bank_officer" }, targetMsmeId: "msme_001", entityType: "LoanApplication", entityId: "loan_001", createdAt: "2026-04-12T10:00:00Z" },
  { _id: "audit_004", action: "document_uploaded", performedBy: { _id: "usr_msme_001", name: "Rajesh Kumar Sharma", role: "msme_owner" }, targetMsmeId: "msme_001", entityType: "Document", entityId: "doc_004", createdAt: "2026-04-01T08:00:00Z" },
  { _id: "audit_005", action: "score_generated", performedBy: { _id: "usr_bank_001", name: "Priya Venkatesh", role: "bank_officer" }, targetMsmeId: "msme_006", entityType: "CreditScore", entityId: "score_006", createdAt: "2026-04-15T13:00:00Z" },
  { _id: "audit_006", action: "loan_rejected", performedBy: { _id: "usr_bank_001", name: "Priya Venkatesh", role: "bank_officer" }, targetMsmeId: "msme_006", entityType: "LoanApplication", entityId: "loan_004", createdAt: "2026-04-16T11:00:00Z" },
  { _id: "audit_007", action: "msme_created", performedBy: { _id: "usr_msme_005", name: "Karthik Rajan", role: "msme_owner" }, targetMsmeId: "msme_005", entityType: "MSME", entityId: "msme_005", createdAt: "2026-01-05T11:00:00Z" },
  { _id: "audit_008", action: "user_login", performedBy: { _id: "usr_bank_001", name: "Priya Venkatesh", role: "bank_officer" }, targetMsmeId: null, entityType: "User", entityId: "usr_bank_001", createdAt: "2026-04-18T09:00:00Z" },
];

// ─── Helper: Get score for an MSME ──────────────────────────────────────────────
export function getScoreForMSME(msmeId) {
  return demoScores.find((s) => s.msmeId === msmeId) || null;
}

// ─── Helper: Get portfolio stats ────────────────────────────────────────────────
export function getPortfolioStats() {
  const scored = demoMSMEs.filter((m) => m.latestScoreId);
  const scores = demoScores;
  const low = scores.filter((s) => s.riskCategory === "Low").length;
  const medium = scores.filter((s) => s.riskCategory === "Medium").length;
  const high = scores.filter((s) => s.riskCategory === "High").length;
  const avgScore = scores.length ? Math.round(scores.reduce((a, s) => a + s.scoreValue, 0) / scores.length) : 0;

  return {
    totalMSMEs: demoMSMEs.length,
    scoredMSMEs: scored.length,
    pendingLoans: demoLoans.filter((l) => l.status === "submitted" || l.status === "under_review").length,
    avgScore,
    riskDistribution: { low, medium, high },
    activeAlerts: demoScores.reduce((a, s) => a + (s.stressSignals?.length || 0), 0),
  };
}

// ─── Helper: Format currency in INR ─────────────────────────────────────────────
export function formatINR(amount) {
  if (!amount && amount !== 0) return "—";
  return "₹" + amount.toLocaleString("en-IN");
}

// ─── Helper: Relative time ──────────────────────────────────────────────────────
export function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
