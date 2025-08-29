import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import img1 from "../assets/img/bloodpressure.png";
import PatientReportList from "../components/PastReportsList";

/**
 * Blood Pressure entry & PDF upload (aligned with BloodSugar):
 * - Compact card UI with tabs
 * - Inline validation
 * - Toasts + spinners; no full-page reloads
 * - Optional classification pill for quick context (UI guidance only)
 */
export default function BloodPressure() {
  const [activeTab, setActiveTab] = useState("manual");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState("");

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ type: "", msg: "" }); // success | error | info

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("user");
      const obj = raw ? JSON.parse(raw) : null;
      setUserId(obj?.id || "");
    } catch {
      setUserId("");
    }
  }, []);

  const clearToastLater = () => setTimeout(() => setToast({ type: "", msg: "" }), 3000);

  // --- Classification (UI guidance only; not diagnostic) ---
  const bpClassification = useMemo(() => {
    const s = Number(systolic);
    const d = Number(diastolic);
    if (!s || !d) return null;

    // Optional "Low" for very low readings
    if (s < 90 && d < 60) return "Low";

    if (s >= 180 || d >= 120) return "Crisis";
    if (s >= 140 || d >= 90) return "Stage 2";
    if ((s >= 130 && s <= 139) || (d >= 80 && d <= 89)) return "Stage 1";
    if (s >= 120 && s <= 129 && d < 80) return "Elevated";
    if (s < 120 && d < 80) return "Normal";
    return null;
  }, [systolic, diastolic]);

  const legendText =
    "Normal <120/<80 · Elevated 120–129 & <80 · Stage 1 130–139 or 80–89 · Stage 2 ≥140 or ≥90 · Crisis ≥180 or ≥120";

  const StatusPill = ({ label }) => {
    const color =
      label === "Normal"
        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
        : label === "Elevated" || label === "Stage 1"
        ? "bg-amber-100 text-amber-700 border-amber-200"
        : label === "Low"
        ? "bg-sky-100 text-sky-700 border-sky-200"
        : "bg-rose-100 text-rose-700 border-rose-200"; // Stage 2 / Crisis
    return (
      <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };

  // --- Manual submit ---
  const handleManualSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setToast({ type: "error", msg: "User not logged in." });
      clearToastLater();
      return;
    }
    const docId = localStorage.getItem("selectedDoctorId") || null;
    if (!docId) {
      setToast({ type: "error", msg: "Select a doctor before saving." });
      clearToastLater();
      return;
    }

    const s = Number(systolic);
    const d = Number(diastolic);
    const p = Number(pulse);

    const valid = (n) => Number.isFinite(n) && n > 0;
    if (!valid(s) || !valid(d) || !valid(p)) {
      setToast({ type: "error", msg: "Please enter valid positive numbers." });
      clearToastLater();
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("https://health-tracker-backend-s5ei.vercel.app//api/patient/bloodpressure", {
        systolic: s,
        diastolic: d,
        pulse: p,
        userId,
        docId,
      });

      setToast({ type: "success", msg: "Saved successfully!" });
      setSystolic("");
      setDiastolic("");
      setPulse("");

      // Notify siblings (e.g., PastReportsList) if they listen for it
      window.dispatchEvent(new CustomEvent("report:updated", { detail: { type: "bloodpressure" } }));
    } catch {
      setToast({ type: "error", msg: "Error saving data." });
    } finally {
      setSubmitting(false);
      clearToastLater();
    }
  };

  // --- PDF upload ---
  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== "application/pdf") {
      setToast({ type: "error", msg: "Only PDF files are allowed." });
      clearToastLater();
      return;
    }
    if (f.size > 7 * 1024 * 1024) {
      setToast({ type: "error", msg: "PDF must be ≤ 7 MB." });
      clearToastLater();
      return;
    }
    setFile(f);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setToast({ type: "info", msg: "Choose a PDF first." });
      clearToastLater();
      return;
    }

    const docId = localStorage.getItem("selectedDoctorId") || null;
    if (!docId) {
      setToast({ type: "error", msg: "Select a doctor before uploading." });
      clearToastLater();
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("docId", docId);

    setUploading(true);
    try {
      await axios.post("https://health-tracker-backend-s5ei.vercel.app//api/patient/upload/bloodpressure", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setToast({ type: "success", msg: "PDF processed successfully." });
      setFile(null);
      window.dispatchEvent(new CustomEvent("report:updated", { detail: { type: "bloodpressure" } }));
    } catch {
      setToast({ type: "error", msg: "Upload failed." });
    } finally {
      setUploading(false);
      clearToastLater();
    }
  };

  const nowStr = new Date().toLocaleDateString();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-100 to-blue-100 flex-col">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[28rem]">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-1">Blood Pressure</h2>
        <p className="text-center text-gray-500 text-sm">Date: {nowStr}</p>

        {/* Tabs */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            aria-pressed={activeTab === "manual"}
            className={`px-4 py-2 text-sm rounded-md w-full text-center transition ${
              activeTab === "manual" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("manual")}
          >
            Manual Entry
          </button>
          <button
            aria-pressed={activeTab === "pdf"}
            className={`px-4 py-2 text-sm rounded-md w-full text-center transition ${
              activeTab === "pdf" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("pdf")}
          >
            Upload PDF
          </button>
        </div>

        <div className="mt-4">
          <img src={img1} alt="blood pressure" className="mx-auto w-20" />
        </div>

        {/* Manual form */}
        {activeTab === "manual" && (
          <form onSubmit={handleManualSubmit} className="mt-4 space-y-4" noValidate>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="systolic" className="block text-sm font-medium text-gray-700">
                  Systolic (mmHg)
                </label>
                <input
                  id="systolic"
                  type="number"
                  inputMode="numeric"
                  min={60}
                  max={260}
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md h-10 appearance-none [-moz-appearance:textfield]"
                  placeholder="120"
                  required
                />
              </div>
              <div>
                <label htmlFor="diastolic" className="block text-sm font-medium text-gray-700">
                  Diastolic(mmHg)
                </label>
                <input
                  id="diastolic"
                  type="number"
                  inputMode="numeric"
                  min={40}
                  max={160}
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md h-10 appearance-none [-moz-appearance:textfield]"
                  placeholder="80"
                  required
                />
              </div>
              <div>
                <label htmlFor="pulse" className="block text-sm font-medium text-gray-700">
                  Pulse (BPM)
                </label>
                <input
                  id="pulse"
                  type="number"
                  inputMode="numeric"
                  min={30}
                  max={220}
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md h-10 appearance-none [-moz-appearance:textfield]"
                  placeholder="72"
                  required
                />
              </div>
            </div>

            {/* classification */}
            {bpClassification && (
              <div className="mt-1">
                <StatusPill label={bpClassification} />
                <p className="mt-2 text-xs text-gray-500">Guidance: {legendText}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 bg-teal-500 text-white py-2 rounded-md w-full flex items-center justify-center disabled:opacity-60"
            >
              {submitting && (
                <span className="mr-2 h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
              )}
              Save
            </button>
          </form>
        )}

        {/* PDF upload */}
        {activeTab === "pdf" && (
          <div className="mt-4 space-y-3">
            <label className="text-gray-600 block text-sm">Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            {file && (
              <p className="text-xs text-gray-500">
                Selected: {file.name} ({Math.ceil(file.size / 1024)} KB)
              </p>
            )}
            <button
              onClick={handleFileUpload}
              disabled={uploading}
              className="w-full bg-teal-500 text-white py-2 rounded-lg flex items-center justify-center disabled:opacity-60"
            >
              {uploading && (
                <span className="mr-2 h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
              )}
              Upload
            </button>
          </div>
        )}

        {/* Toast */}
        {toast.msg && (
          <div
            role="status"
            className={`mt-4 rounded-md border p-3 text-sm ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : toast.type === "error"
                ? "bg-rose-50 border-rose-200 text-rose-700"
                : "bg-sky-50 border-sky-200 text-sky-700"
            }`}
          >
            {toast.msg}
          </div>
        )}
      </div>

      {/* History */}
      {userId && (
        <div className="mt-6 w-full max-w-3xl">
          <PatientReportList patientId={userId} reportType={"bloodpressure"} />
        </div>
      )}
    </div>
  );
}
