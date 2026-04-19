import { useState } from "react";
import { useDemoData } from "../contexts/DemoDataContext";
import { useToast } from "../components/ToastProvider";
import { FileText, Upload, CheckCircle2, XCircle, Clock, Eye, Download } from "lucide-react";

const DOC_TYPES = {
  pan_card: "PAN Card",
  aadhaar_front: "Aadhaar (Front)",
  aadhaar_back: "Aadhaar (Back)",
  bank_statement: "Bank Statement (6M)",
  business_certificate: "Business Certificate",
  profit_loss: "P&L Statement",
};

const STATUS_CONFIG = {
  verified: { label: "Verified", badge: "badge-low", icon: CheckCircle2 },
  pending: { label: "Pending", badge: "badge-medium", icon: Clock },
  rejected: { label: "Rejected", badge: "badge-high", icon: XCircle },
};

export default function DocumentsPage() {
  const { demoMode, data: demoData } = useDemoData();
  const { toast } = useToast();
  const [dragOver, setDragOver] = useState(false);
  const [selectedType, setSelectedType] = useState("pan_card");

  const documents = demoMode ? demoData?.documents || [] : [];

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer?.files || []);
    if (files.length > 0) {
      toast.success(`${files[0].name} uploaded successfully`);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large. Maximum size is 10MB.");
        return;
      }
      toast.success(`${file.name} uploaded for ${DOC_TYPES[selectedType]}`);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6 max-w-[1000px]">
      <div>
        <h1 className="page-title">Documents</h1>
        <p className="page-subtitle">Upload and manage identity & financial documents for KYC verification</p>
      </div>

      {/* Upload Section */}
      <div className="card p-6">
        <h3 className="text-sm font-semibold text-txt mb-4">Upload Document</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-1">
            <label className="input-label">Document Type</label>
            <select className="input-field" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              {Object.entries(DOC_TYPES).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="input-label">File</label>
            <div
              className={`upload-zone ${dragOver ? "drag-over" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("doc-file-input").click()}
            >
              <Upload size={24} className="text-txt-muted mx-auto mb-2" />
              <p className="text-sm text-txt-secondary">
                <span className="text-primary font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-txt-muted mt-1">PDF, JPG, PNG — Max 10MB</p>
            </div>
            <input id="doc-file-input" type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileSelect} />
          </div>
        </div>
      </div>

      {/* Documents List */}
      {documents.length > 0 ? (
        <div className="table-container">
          <div className="px-4 py-3 bg-surface-alt border-b border-border flex items-center justify-between">
            <h3 className="text-xs font-semibold text-txt-secondary uppercase tracking-wide">Uploaded Documents</h3>
            <span className="text-xs text-txt-muted">{documents.length} documents</span>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Type</th>
                <th className="table-header">File</th>
                <th className="table-header">Size</th>
                <th className="table-header">Status</th>
                <th className="table-header">Uploaded</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => {
                const statusCfg = STATUS_CONFIG[doc.status] || STATUS_CONFIG.pending;
                const StatusIcon = statusCfg.icon;
                return (
                  <tr key={doc._id}>
                    <td className="table-cell font-medium text-txt">{DOC_TYPES[doc.documentType] || doc.documentType}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <FileText size={14} className="text-txt-muted" />
                        <span className="text-xs truncate max-w-[150px]">{doc.fileName}</span>
                      </div>
                    </td>
                    <td className="table-cell text-xs font-mono">{formatFileSize(doc.fileSize)}</td>
                    <td className="table-cell">
                      <span className={`${statusCfg.badge} flex items-center gap-1`}>
                        <StatusIcon size={12} />
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="table-cell text-xs text-txt-muted">
                      {new Date(doc.uploadedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-1">
                        <button className="btn-ghost py-1 px-2 text-xs"><Eye size={12} /> View</button>
                        <button className="btn-ghost py-1 px-2 text-xs"><Download size={12} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card p-10 text-center">
          <FileText size={28} className="text-txt-muted mx-auto mb-3" />
          <p className="text-txt-secondary text-sm mb-1">No documents uploaded yet</p>
          <p className="text-xs text-txt-muted">Upload your KYC documents to proceed with loan applications</p>
        </div>
      )}

      {/* Document Requirements Info */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-txt mb-3">Required Documents Checklist</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(DOC_TYPES).map(([key, label]) => {
            const uploaded = documents.find((d) => d.documentType === key);
            return (
              <div key={key} className="flex items-center gap-2.5">
                {uploaded ? (
                  <CheckCircle2 size={16} className={uploaded.status === "verified" ? "text-success" : uploaded.status === "rejected" ? "text-danger" : "text-warning"} />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-border" />
                )}
                <span className="text-sm text-txt">{label}</span>
                {uploaded && (
                  <span className={`text-[10px] ${STATUS_CONFIG[uploaded.status]?.badge || "badge-neutral"}`}>
                    {STATUS_CONFIG[uploaded.status]?.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
