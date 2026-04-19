import { useDemoData } from "../contexts/DemoDataContext";
import { Database, DatabaseZap } from "lucide-react";

/**
 * DemoDataToggle — Fixed bottom bar toggle
 * 
 * When ON:  Shows "DEMO MODE — Viewing sample data" in an amber bar
 * When OFF: Shows subtle "Demo data off" in a minimal bar
 * 
 * This toggle is always visible at the bottom of the screen so the user
 * can switch between demo data and real API data at any time.
 */
export default function DemoDataToggle() {
  const { demoMode, toggleDemoMode } = useDemoData();

  return (
    <div className={`demo-toggle-bar ${demoMode ? "active" : "inactive"}`}>
      <div className="flex items-center gap-2">
        {demoMode ? (
          <DatabaseZap size={16} className="animate-pulse" />
        ) : (
          <Database size={16} />
        )}
        <span>
          {demoMode ? "DEMO MODE — Viewing sample data" : "Demo data off"}
        </span>
      </div>

      <button
        onClick={toggleDemoMode}
        className={`demo-toggle-switch ${demoMode ? "on" : "off"}`}
        aria-label="Toggle demo data"
      >
        <div className="demo-toggle-knob" />
      </button>

      {demoMode && (
        <span className="text-xs opacity-70">
          Toggle off to use real API data
        </span>
      )}
    </div>
  );
}
