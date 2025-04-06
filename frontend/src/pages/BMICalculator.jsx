import React, { useState } from "react";
import axios from "axios";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // Convert cm to meters
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) {
      alert("Please enter valid height and weight.");
      return;
    }
    const bmiValue = (w / (h * h)).toFixed(2);
    setBmi(bmiValue);
  };

  const submitBMI = async () => {
    const user = sessionStorage.getItem("user");
    const userObject = JSON.parse(user);
    const userId = userObject.id;
    if (!bmi) {
      alert("Please calculate BMI before submitting.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5555/api/patient/bmi", {
        height: parseFloat(height),
        weight: parseFloat(weight),
        bmi: parseFloat(bmi),
        userId: userId, // Replace with actual user ID
      });

      alert("BMI data saved successfully!");
      setHeight("");
      setWeight("");
      setBmi(null);
    } catch (error) {
      console.error("Error submitting BMI data:", error);
      alert("Failed to submit BMI data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-100 to-blue-100 flex-col">
    <div className="bg-white p-6 rounded-xl shadow-lg w-96">
      <h2 className="text-xl font-bold text-center text-gray-700 mb-2">BMI Calculator</h2>
      <p className="text-center text-gray-500 text-sm">Date: {new Date().toLocaleDateString()}</p>
      <div className="space-y-3">
        <div>
            <label className="text-gray-600 block mb-1">Height</label>
            <input
                type="number"
                placeholder="Enter height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
        </div>
        <div>
            <label className="text-gray-600 block mb-1">Weight</label>
            <input
                type="number"
                placeholder="Enter weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
        </div>
        <button onClick={calculateBMI} className="w-full bg-red-500 text-white py-2 rounded-lg">Calculate BMI</button>
        {bmi && <p>Your BMI: <strong>{bmi}</strong></p>}
        <button onClick={submitBMI} className="w-full bg-teal-500 text-white py-2 rounded-lg" disabled={loading}>
            {loading ? "Saving..." : "Submit BMI"}
        </button>
       </div> 
       </div>
    </div>
  );
};

export default BMICalculator;
