import { createContext, useContext, useState, useCallback } from "react";
import * as demo from "../utils/demoData";

const DemoDataContext = createContext();

/**
 * DemoDataProvider
 * 
 * Wraps the application with a context that controls whether dummy/demo data
 * is rendered throughout the platform. Persists the toggle to localStorage.
 * 
 * When enabled:
 *  - All pages render from demoData.js (realistic Indian MSME data)
 *  - Auth context is overridden with a demo user
 *  - No API calls are made for data shown on screen
 * 
 * When disabled:
 *  - All pages use real Redux store data (API-backed)
 *  - Empty states are shown when no data exists
 */
export function DemoDataProvider({ children }) {
  const [demoMode, setDemoMode] = useState(() => {
    const stored = localStorage.getItem("cs_demo_mode");
    return stored === "true";
  });

  const toggleDemoMode = useCallback(() => {
    setDemoMode((prev) => {
      const next = !prev;
      localStorage.setItem("cs_demo_mode", String(next));
      return next;
    });
  }, []);

  const enableDemo = useCallback(() => {
    setDemoMode(true);
    localStorage.setItem("cs_demo_mode", "true");
  }, []);

  const disableDemo = useCallback(() => {
    setDemoMode(false);
    localStorage.setItem("cs_demo_mode", "false");
  }, []);

  // Provide the entire demo dataset when demo mode is ON
  const data = demoMode
    ? {
        users: demo.demoUsers,
        msmes: demo.demoMSMEs,
        scores: demo.demoScores,
        scoreHistory: demo.demoScoreHistory,
        gstRecords: demo.demoGSTRecords,
        transactions: demo.demoTransactions,
        loans: demo.demoLoans,
        documents: demo.demoDocuments,
        notifications: demo.demoNotifications,
        auditLogs: demo.demoAuditLogs,
        portfolioStats: demo.getPortfolioStats(),
      }
    : null;

  return (
    <DemoDataContext.Provider
      value={{
        demoMode,
        toggleDemoMode,
        enableDemo,
        disableDemo,
        data,
        // Utility: get score for a particular MSME
        getScore: demoMode ? demo.getScoreForMSME : () => null,
        // Utility helpers
        formatINR: demo.formatINR,
        timeAgo: demo.timeAgo,
      }}
    >
      {children}
    </DemoDataContext.Provider>
  );
}

export function useDemoData() {
  const ctx = useContext(DemoDataContext);
  if (!ctx) throw new Error("useDemoData must be used within DemoDataProvider");
  return ctx;
}
