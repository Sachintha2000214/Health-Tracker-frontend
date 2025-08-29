import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import img1 from "../assets/img/bloodsugar.png";
import PatientReportList from "../components/PastReportsList";

/**
 * Blood Sugar entry & PDF upload with:
 * - Inline validation & helpful ranges
 * - Unit toggle (mg/dL ↔ mmol/L) for glucose tests
 * - Result classification (Low/Normal/Prediabetes/High)
 * - Accessible labels, disabled states, spinners, toasts
 * - No full-page reload on success
 */
export default function BloodSugar() {
  const [activeTab, setActiveTab] = useState("manual");
  const [testType, setTestType] = useState("");
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("mg/dL"); // mg/dL | mmol/L (HbA1c uses %)
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
    } catch (e) {
      setUserId("");
    }
  }, []);

  // helpers
  const toMgdl = (num, u) => (u === "mmol/L" ? Math.round(num * 18) : num);

  const ranges = useMemo(() => {
    // All thresholds are guidelines for user feedback — not diagnostic.
    return {
      fasting: {
        label: "Fasting",
        unit: "mg/dL",
        bands: [
          { name: "Low", test: (v) => v < 70 },
          { name: "Normal", test: (v) => v >= 70 && v <= 99 },
          { name: "Prediabetes", test: (v) => v >= 100 && v <= 125 },
          { name: "High", test: (v) => v >= 126 },
        ],
        legend: "Low <70 · Normal 70–99 · Prediabetes 100–125 · High ≥126",
      },
      "post-prandial": {
        label: "Post‑prandial",
        unit: "mg/dL",
        bands: [
          { name: "Low", test: (v) => v < 70 },
          { name: "Normal", test: (v) => v < 140 && v >= 70 },
          { name: "Prediabetes", test: (v) => v >= 140 && v <= 199 },
          { name: "High", test: (v) => v >= 200 },
        ],
        legend: "Low <70 · Normal 70–139 · Prediabetes 140–199 · High ≥200",
      },
      random: {
        label: "Random",
        unit: "mg/dL",
        bands: [
          { name: "Low", test: (v) => v < 70 },
          { name: "Normal", test: (v) => v >= 70 && v <= 140 },
          { name: "Elevated", test: (v) => v > 140 && v < 200 },
          { name: "High", test: (v) => v >= 200 },
        ],
        legend: "Low <70 · Normal 70–140 · Elevated 141–199 · High ≥200",
      },
      hba1c: {
        label: "HbA1c",
        unit: "%",
        bands: [
          { name: "Normal", test: (v) => v < 5.7 },
          { name: "Prediabetes", test: (v) => v >= 5.7 && v <= 6.4 },
          { name: "High", test: (v) => v >= 6.5 },
        ],
        legend: "Normal <5.7% · Prediabetes 5.7–6.4% · High ≥6.5%",
      },
    };
  }, []);

  const classification = useMemo(() => {
    if (!testType || value === "") return null;

    if (testType === "hba1c") {
      const v = Number(value);
      const band = ranges.hba1c.bands.find((b) => b.test(v));
      return band?.name || null;
    }

    const vMgdl = toMgdl(Number(value), unit);
    const band = ranges[testType]?.bands.find((b) => b.test(vMgdl));
    return band?.name || null;
  }, [testType, value, unit, ranges]);

  const showUnitToggle = testType && testType !== "hba1c";

  const clearToastLater = () => setTimeout(() => setToast({ type: "", msg: "" }), 3000);

  // Submit manual entry
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

    // basic sanity checks
    const num = Number(value);
    if (Number.isNaN(num) || num <= 0) {
      setToast({ type: "error", msg: "Please enter a valid number." });
      clearToastLater();
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("https://health-tracker-backend-s5ei.vercel.app/api/patient/bloodsugar", {
        userId,
        docId,
        type: testType,
        value: num, // backend expects a raw number; unit used only for UI
      });

      setToast({ type: "success", msg: "Saved successfully!" });
      setValue("");
      // Optional: notify sibling components to refetch
      window.dispatchEvent(new CustomEvent("report:updated", { detail: { type: "bloodsugar" } }));
    } catch (error) {
      setToast({ type: "error", msg: "Error saving data." });
    } finally {
      setSubmitting(false);
      clearToastLater();
    }
  };

  // PDF upload
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
      await axios.post("https://health-tracker-backend-s5ei.vercel.app/api/patient/upload/bloodsugar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setToast({ type: "success", msg: "PDF processed successfully." });
      setFile(null);
      window.dispatchEvent(new CustomEvent("report:updated", { detail: { type: "bloodsugar" } }));
    } catch (error) {
      setToast({ type: "error", msg: "Upload failed." });
    } finally {
      setUploading(false);
      clearToastLater();
    }
  };

  // UI bits
  const StatusPill = ({ label }) => {
    const color =
      label === "Normal"
        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
        : label === "Prediabetes" || label === "Elevated"
        ? "bg-amber-100 text-amber-700 border-amber-200"
        : label === "Low"
        ? "bg-sky-100 text-sky-700 border-sky-200"
        : "bg-rose-100 text-rose-700 border-rose-200";
    return (
      <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };

  const Legend = () => {
    if (!testType) return null;
    const text = ranges[testType].legend;
    return <p className="mt-2 text-xs text-gray-500">Guidance: {text}</p>;
  };

  const nowStr = new Date().toLocaleDateString();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-100 to-blue-100 flex-col">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[28rem]">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-1">Blood Sugar</h2>
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
          <img src={img1} alt="blood sugar" className="mx-auto w-20" />
        </div>

        {/* Manual form */}
        {activeTab === "manual" && (
          <form onSubmit={handleManualSubmit} className="mt-4 space-y-4" noValidate>
            <div>
              <label htmlFor="testType" className="block text-sm font-medium text-gray-700">
                Select Your Test Type
              </label>
              <select
                id="testType"
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select test type</option>
                <option value="fasting">Fasting</option>
                <option value="post-prandial">Post Prandial</option>
                <option value="random">Random</option>
                <option value="hba1c">HbA1c</option>
              </select>
            </div>

            <div>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                    {testType === "hba1c" ? "Enter the Value (%)" : "Enter the Value"}
                  </label>
                  <input
                    id="value"
                    type="number"
                    inputMode="decimal"
                    step={testType === "hba1c" ? 0.1 : unit === "mmol/L" ? 0.1 : 1}
                    min={testType === "hba1c" ? 3 : 20}
                    max={testType === "hba1c" ? 20 : 600}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                    placeholder={testType === "hba1c" ? "e.g., 5.8" : unit === "mg/dL" ? "e.g., 95" : "e.g., 5.3"}
                    required
                  />
                </div>

                {showUnitToggle && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Units</label>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="mt-2 p-2 border border-gray-300 rounded-md"
                    >
                      <option>mg/dL</option>
                      <option>mmol/L</option>
                    </select>
                  </div>
                )}
              </div>

              {/* classification */}
              {classification && (
                <div className="mt-2">
                  <StatusPill label={classification} />
                  <Legend />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 bg-teal-500 text-white py-2 rounded-md w-full flex items-center justify-center disabled:opacity-60"
            >
              {submitting && <span className="mr-2 h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />}
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
              <p className="text-xs text-gray-500">Selected: {file.name} ({Math.ceil(file.size / 1024)} KB)</p>
            )}
            <button
              onClick={handleFileUpload}
              disabled={uploading}
              className="w-full bg-teal-500 text-white py-2 rounded-lg flex items-center justify-center disabled:opacity-60"
            >
              {uploading && <span className="mr-2 h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />}
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

      {/* History (existing component) */}
      {userId && (
        <div className="mt-6 w-full max-w-3xl">
          <PatientReportList patientId={userId} reportType={"bloodsugar"} />
        </div>
      )}
    </div>
  );
}
