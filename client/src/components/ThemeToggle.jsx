import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle — Light/Dark mode toggle button
 * 
 * Can be used standalone or embedded in a header/sidebar.
 * Renders the current theme icon with a smooth transition.
 */
export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`w-8 h-8 rounded-lg border border-border flex items-center justify-center text-txt-muted hover:text-txt hover:bg-surface-alt transition-all duration-200 ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Sun size={16} className="text-warning" />
      ) : (
        <Moon size={16} />
      )}
    </button>
  );
}
