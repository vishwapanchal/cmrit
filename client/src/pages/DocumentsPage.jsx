import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDemoData } from "../contexts/DemoDataContext";
import { useToast } from "../components/ToastProvider";
import api from "../services/api";
import { FileText, Upload, CheckCircle2, XCircle, Clock, Download, Trash2, Loader } from "lucide-react";

const CATEGORIES = {
  pan_card: "PAN Card",
  gst_certificate: "GST Certificate",
  bank_statement: "Bank Statement (6M)",
  incorporation: "Incorporation Certificate",
  profit_loss: "P&L Statement",
  other: "Other Document",
};

export default function DocumentsPage() {
  const { demoMode, data: demoData } = useDemoData();
  const { toast } = useToast();
  const { list: msmes } = useSelector((s) => s.msme);

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("pan_card");
  const [description, setDescription] = useState("");

  const msmeId = msmes?.[0]?._id;

  // Fetch documents from API
  const fetchDocuments = useCallback(async () => {
    if (demoMode || !msmeId) return;
    setLoading(true);
    try {
      const { data } = await api.get(`/documents/${msmeId}`);
      if (data.success) setDocuments(data.data || []);
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  }, [msmeId, demoMode]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // Use demo data when demo mode is ON
  const displayDocs = demoMode ? (demoData?.documents || []) : documents;

  const uploadFile = async (file) => {
    if (!msmeId) {
      toast.error("No MSME profile found. Please onboard first.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 10 MB.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("msmeId", msmeId);
      formData.append("category", selectedCategory);
      if (description) formData.append("description", description);

      const { data } = await api.post("/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(`${file.name} uploaded successfully`);
        setDescription("");
        fetchDocuments(); // Refresh list
      }
    } catch (err) {
      toast.error(err.response?.data?.detail || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) uploadFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = ""; // reset input
  };

  const handleDownload = async (doc) => {
    try {
      const { data } = await api.get(`/documents/${doc._id}/download`);
      if (data.success) {
        const byteChars = atob(data.data.fileData);
        const byteArr = new Uint8Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) byteArr[i] = byteChars.charCodeAt(i);
        const blob = new Blob([byteArr], { type: data.data.fileType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = data.data.fileName;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      toast.error("Download failed");
    }
  };

  const handleDelete = async (docId) => {
    try {
      const { data } = await api.delete(`/documents/${docId}`);
      if (data.success) {
        toast.success("Document deleted");
        setDocuments((prev) => prev.filter((d) => d._id !== docId));
      }
    } catch {
      toast.error("Delete failed");
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
          <div className="space-y-3">
            <div>
              <label className="input-label">Category</label>
              <select className="input-field" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {Object.entries(CATEGORIES).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="input-label">Description (optional)</label>
              <input type="text" className="input-field" placeholder="e.g. FY 2025-26" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
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
              {uploading ? (
                <div className="flex items-center justify-center gap-2 py-4">
                  <Loader size={20} className="animate-spin text-primary" />
                  <span className="text-sm text-txt-secondary">Uploading...</span>
                </div>
              ) : (
                <>
                  <Upload size={24} className="text-txt-muted mx-auto mb-2" />
                  <p className="text-sm text-txt-secondary">
                    <span className="text-primary font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-txt-muted mt-1">PDF, JPG, PNG — Max 10MB</p>
                </>
              )}
            </div>
            <input id="doc-file-input" type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileSelect} />
          </div>
        </div>
      </div>

      {/* Documents List */}
      {loading ? (
        <div className="card p-10 text-center">
          <Loader size={24} className="animate-spin text-primary mx-auto mb-3" />
          <p className="text-sm text-txt-muted">Loading documents...</p>
        </div>
      ) : displayDocs.length > 0 ? (
        <div className="table-container">
          <div className="px-4 py-3 bg-surface-alt border-b border-border flex items-center justify-between">
            <h3 className="text-xs font-semibold text-txt-secondary uppercase tracking-wide">Uploaded Documents</h3>
            <span className="text-xs text-txt-muted">{displayDocs.length} documents</span>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Category</th>
                <th className="table-header">File</th>
                <th className="table-header">Size</th>
                <th className="table-header">Uploaded</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayDocs.map((doc) => (
                <tr key={doc._id}>
                  <td className="table-cell font-medium text-txt">{CATEGORIES[doc.category] || doc.category}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-txt-muted" />
                      <span className="text-xs truncate max-w-[200px]">{doc.fileName}</span>
                    </div>
                  </td>
                  <td className="table-cell text-xs font-mono">{formatFileSize(doc.fileSize)}</td>
                  <td className="table-cell text-xs text-txt-muted">
                    {new Date(doc.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1">
                      {!demoMode && (
                        <>
                          <button onClick={() => handleDownload(doc)} className="btn-ghost py-1 px-2 text-xs"><Download size={12} /></button>
                          <button onClick={() => handleDelete(doc._id)} className="btn-ghost py-1 px-2 text-xs text-danger"><Trash2 size={12} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
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

      {/* Document Checklist */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-txt mb-3">Required Documents Checklist</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(CATEGORIES).filter(([k]) => k !== "other").map(([key, label]) => {
            const uploaded = displayDocs.find((d) => d.category === key);
            return (
              <div key={key} className="flex items-center gap-2.5">
                {uploaded ? (
                  <CheckCircle2 size={16} className="text-success" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-border" />
                )}
                <span className="text-sm text-txt">{label}</span>
                {uploaded && <span className="badge-low text-[10px]">Uploaded</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
