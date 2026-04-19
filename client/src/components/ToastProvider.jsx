import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext();

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const COLORS = {
  success: "text-success",
  error: "text-danger",
  warning: "text-warning",
  info: "text-primary",
};

/**
 * ToastProvider — Global toast notification system
 * 
 * Usage:
 *   const { toast } = useToast();
 *   toast.success("Score generated successfully");
 *   toast.error("Failed to upload data");
 *   toast.warning("Score is outdated");
 *   toast.info("New loan application received");
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counterRef = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const addToast = useCallback((type, message, duration = 5000) => {
    const id = ++counterRef.current;
    setToasts((prev) => {
      const next = [...prev, { id, type, message, duration, exiting: false, createdAt: Date.now() }];
      // Max 4 toasts
      return next.length > 4 ? next.slice(-4) : next;
    });
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
    return id;
  }, [removeToast]);

  const toast = {
    success: (msg, dur) => addToast("success", msg, dur),
    error: (msg, dur) => addToast("error", msg, dur),
    warning: (msg, dur) => addToast("warning", msg, dur),
    info: (msg, dur) => addToast("info", msg, dur),
    dismiss: removeToast,
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast: t, onDismiss }) {
  const Icon = ICONS[t.type] || Info;
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (t.duration <= 0) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / t.duration) * 100);
      setProgress(remaining);
      if (remaining > 0) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [t.duration]);

  return (
    <div className={`toast toast-${t.type} ${t.exiting ? "exiting" : ""}`}>
      <Icon size={18} className={`${COLORS[t.type]} flex-shrink-0 mt-0.5`} />
      <p className="flex-1 text-sm text-txt leading-snug">{t.message}</p>
      <button onClick={onDismiss} className="text-txt-muted hover:text-txt transition-colors flex-shrink-0">
        <X size={14} />
      </button>
      {t.duration > 0 && (
        <div className="toast-progress" style={{ width: `${progress}%` }} />
      )}
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
