import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/**
 * Modal — Reusable dialog component
 * 
 * Props:
 *   open: boolean — controls visibility
 *   onClose: () => void — called when modal should close
 *   title: string — modal title
 *   children: ReactNode — modal body
 *   size: "sm" | "md" | "lg" — modal width (default: "md")
 *   showClose: boolean — show X button (default: true)
 */
export default function Modal({ open, onClose, title, children, size = "md", showClose = true }) {
  const contentRef = useRef(null);

  // Escape key to close
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const widthClass = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }[size] || "max-w-lg";

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={contentRef} className={`modal-content ${widthClass}`} role="dialog" aria-modal="true">
        {(title || showClose) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            {title && <h2 className="text-base font-semibold text-txt">{title}</h2>}
            {showClose && (
              <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-txt-muted hover:text-txt hover:bg-surface-alt transition-colors">
                <X size={18} />
              </button>
            )}
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
