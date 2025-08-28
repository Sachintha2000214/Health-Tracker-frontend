import React, { useMemo, useState } from "react";

/**
 * BMI Calculator
 * - Empty initially
 * - Arrow appears and moves live as height/weight are entered
 * - Properly aligned number line (15, 18.5, 25, 30, 35+)
 * TailwindCSS required
 */

const MIN_BMI = 15;  // left edge of scale
const MAX_BMI = 35;  // right edge shown as "35+"; visuals clamp here

// Convert a BMI value to a % along the scale, clamped [0,100]
function getPercentForValue(v) {
  if (v == null || Number.isNaN(v)) return 0;
  const pct = ((v - MIN_BMI) / (MAX_BMI - MIN_BMI)) * 100;
  return Math.max(0, Math.min(100, pct));
}

function round1(n) {
  return Math.round(n * 10) / 10;
}

function getCategory(bmi) {
  if (bmi < 18.5) return { label: "Underweight", chip: "bg-blue-600 text-white" };
  if (bmi < 25)   return { label: "Normal",       chip: "bg-green-600 text-white" };
  if (bmi < 30)   return { label: "Overweight",   chip: "bg-amber-500 text-white" };
  return { label: "Obese",                         chip: "bg-red-600 text-white" };
}

// Color segments sized by true ranges on the same 15–35 scale
const segments = [
  { label: "Underweight", start: 15,   end: 18.5, color: "bg-blue-600"  },
  { label: "Normal",      start: 18.5, end: 25,   color: "bg-green-600" },
  { label: "Overweight",  start: 25,   end: 30,   color: "bg-amber-500" },
  { label: "Obese",       start: 30,   end: 35,   color: "bg-red-600"   },
];

// Tick configuration with proper positions
const ticks = [
  { value: 15,   label: "15",   align: "left"  },
  { value: 18.5, label: "18.5"               },
  { value: 25,   label: "25"                 },
  { value: 30,   label: "30"                 },
  { value: 35,   label: "35+",  align: "right" },
];

export default function BMICalculator() {
  // Start EMPTY so nothing shows initially
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  // Live-computed BMI (null until both valid)
  const bmi = useMemo(() => {
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);
    if (!h || !w || h <= 0 || w <= 0) return null;
    const meters = h / 100;
    if (meters <= 0) return null;
    return round1(w / (meters * meters));
  }, [heightCm, weightKg]);

  const category = useMemo(() => (bmi != null ? getCategory(bmi) : null), [bmi]);

  return (
    <div className="min-h-screen bg-teal-50 py-8">
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Inputs */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center">
              <span className="text-teal-700 text-2xl font-bold">📊</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Enter Your Details</h2>
          </div>

          {/* Height */}
          <label className="block text-gray-700 font-semibold mb-2">Height</label>
          <div className="flex gap-3 mb-2">
            <input
              type="number"
              inputMode="decimal"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Example: 175"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              aria-label="Height in centimeters"
            />
            <div className="min-w-20">
              <div
                className="w-full h-full border border-gray-200 rounded-xl px-3 py-3 bg-gray-50 text-gray-700 font-medium text-center select-none"
                title="Units are centimeters"
              >
                cm
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-6">Example: 175</p>

          {/* Weight */}
          <label className="block text-gray-700 font-semibold mb-2">Weight</label>
          <div className="flex gap-3 mb-2">
            <input
              type="number"
              inputMode="decimal"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Example: 70"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              aria-label="Weight in kilograms"
            />
            <div className="min-w-20">
              <div
                className="w-full h-full border border-gray-200 rounded-xl px-3 py-3 bg-gray-50 text-gray-700 font-medium text-center select-none"
                title="Units are kilograms"
              >
                kg
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-6">Example: 70</p>

          <div className="flex gap-4">
            {/* <button
              onClick={() => {}}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl px-6 py-3 shadow disabled:opacity-40"
              disabled
              title="BMI updates automatically as you type"
            >
              Calculate BMI
            </button> */}
            {/* <button
              onClick={() => alert(bmi != null ? `Submitted BMI: ${bmi}` : "Enter height and weight first")}
              className="flex-1 bg-teal-500/10 text-teal-700 hover:bg-teal-500/20 font-semibold rounded-xl px-6 py-3 border border-teal-200"
            >
              Submit BMI
            </button> */}
          </div>
        </div>

        {/* Right: Analysis */}
        <BMIScale bmiValue={bmi} />
      </div>
    </div>
  );
}

function BMIScale({ bmiValue }) {
  const hasBMI = bmiValue != null;
  const bmiPct = getPercentForValue(bmiValue ?? MIN_BMI);
  const cat = hasBMI ? getCategory(bmiValue) : null;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">BMI Analysis</h3>

      {/* Scale wrapper (relative) so ticks and marker align to the same box */}
      <div className="relative mb-12 select-none">
        {/* Color bar: segment widths are proportional to the actual ranges */}
        <div className="h-12 rounded-full overflow-hidden flex shadow-lg">
          {segments.map((s) => {
            const widthPct = ((s.end - s.start) / (MAX_BMI - MIN_BMI)) * 100;
            return <div key={s.label} className={s.color} style={{ width: `${widthPct}%` }} />;
          })}
        </div>

        {/* Ticks + labels positioned by true % along the scale */}
        <div className="absolute inset-x-0 top-full mt-2">
          {ticks.map((t) => {
            const left = getPercentForValue(t.value);
            const translate =
              t.align === "left" ? "translate-x-0"
              : t.align === "right" ? "-translate-x-full"
              : "-translate-x-1/2";
            return (
              <div
                key={t.label}
                className={`absolute ${translate} text-sm text-gray-600`}
                style={{ left: `${left}%` }}
              >
                <div className="w-px h-3 bg-gray-400 mx-auto mb-1" />
                <span>{t.label}</span>
              </div>
            );
          })}
        </div>

        {/* Moving marker for current BMI — hidden until valid */}
        {hasBMI && (
          <div
            className="absolute -top-3 -translate-x-1/2 transition-all duration-700 ease-out"
            style={{ left: `${bmiPct}%` }}
            aria-label={`Your BMI position is ${bmiValue}`}
          >
            <div className="flex flex-col items-center">
              <div className="bg-teal-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-xl mb-1">
                {bmiValue}
              </div>
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: "10px solid #0d9488", // teal-600
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Numeric readout + category */}
      <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50/60 mb-4">
        <p className="text-xl text-gray-700">
          Your BMI:{" "}
          <span className="text-3xl font-extrabold text-gray-900 align-middle">
            {hasBMI ? bmiValue : "—"}
          </span>
        </p>
        {cat && (
          <span className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${cat.chip}`}>
            {cat.label}
          </span>
        )}
      </div>

      <div className="rounded-2xl border border-gray-100 p-5 bg-white">
        <p className="text-gray-700 leading-relaxed">
                {bmiValue < 18.5 && "Consider consulting a healthcare provider about healthy weight gain strategies. Focus on nutrient-dense foods and strength training."}
                {bmiValue >= 18.5 && bmiValue < 25 && "Excellent! You're in the healthy weight range. Maintain your current lifestyle with regular exercise and balanced nutrition."}
                {bmiValue >= 25 && bmiValue < 30 && "Consider adopting a balanced diet with portion control and incorporating 150+ minutes of moderate exercise weekly."}
                {bmiValue >= 30 && "It's recommended to consult with a healthcare provider for a personalized health plan focusing on gradual, sustainable weight loss."}
        </p>
      </div>
    </div>
  );
}
