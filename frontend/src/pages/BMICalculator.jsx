import React, { useState } from "react";
import axios from "axios";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [bmi, setBmi] = useState(null);
  const [loading, setLoading] = useState(false);

  // Unit conversion functions
  const convertHeight = (value, unit) => {
    if (unit === "ft") {
      return parseFloat(value) * 30.48;
    }
    return parseFloat(value);
  };

  const convertWeight = (value, unit) => {
    if (unit === "lbs") {
      return parseFloat(value) * 0.453592;
    }
    return parseFloat(value);
  };

  const calculateBMI = () => {
    const heightInCm = convertHeight(height, heightUnit);
    const weightInKg = convertWeight(weight, weightUnit);
    
    const h = heightInCm / 100;
    const w = weightInKg;
    
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
        height: convertHeight(height, heightUnit),
        weight: convertWeight(weight, weightUnit),
        bmi: parseFloat(bmi),
        userId: userId,
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

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue < 25) return "Normal";
    if (bmiValue < 30) return "Overweight";
    return "Obese";
  };

  const getBMIColor = (bmiValue) => {
    if (bmiValue < 18.5) return "text-blue-600";
    if (bmiValue < 25) return "text-green-600";
    if (bmiValue < 30) return "text-yellow-600";
    return "text-red-600";
  };

  const getArrowPosition = (bmiValue) => {
    const minBMI = 15;
    const maxBMI = 35;
    const clampedBMI = Math.min(Math.max(bmiValue, minBMI), maxBMI);
    const position = ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 100;
    return Math.min(Math.max(position, 5), 95);
  };

  const BMIScale = ({ bmiValue }) => {
    const arrowPosition = getArrowPosition(bmiValue);
    
    return (
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
        <h3 className="text-xl font-bold text-center mb-6 text-white">BMI Analysis</h3>
        
        <div className="relative mb-8">
          <div className="h-12 rounded-full overflow-hidden flex shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 flex-1 flex items-center justify-center text-sm font-bold text-white">
              Underweight
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 flex-1 flex items-center justify-center text-sm font-bold text-white">
              Normal
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 flex-1 flex items-center justify-center text-sm font-bold text-white">
              Overweight
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-600 flex-1 flex items-center justify-center text-sm font-bold text-white">
              Obese
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-white/80 mt-2 px-1">
            <span>15</span>
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
            <span>35+</span>
          </div>
          
          <div 
            className="absolute -top-3 transform -translate-x-1/2 transition-all duration-700 ease-out"
            style={{ left: `${arrowPosition}%` }}
          >
            <div className="flex flex-col items-center">
              <div className="bg-white text-gray-800 px-4 py-2 rounded-lg text-lg font-bold shadow-xl mb-1 border-2 border-yellow-400">
                {bmiValue}
              </div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-white"></div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-6">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/30">
            <p className="text-2xl text-white mb-2">
              Your BMI: <span className="font-bold text-4xl text-yellow-300">{bmiValue}</span>
            </p>
            <p className={`text-2xl font-bold ${getBMIColor(bmiValue)} bg-white px-4 py-2 rounded-lg inline-block`}>
              {getBMICategory(bmiValue)}
            </p>
          </div>
          
          <div className="bg-blue-900/30 backdrop-blur-sm border border-blue-400/50 rounded-xl p-6">
            <div className="flex items-start text-left">
              <span className="text-2xl mr-3 flex-shrink-0">💡</span>
              <p className="text-white text-lg leading-relaxed">
                {bmi < 18.5 && "Consider consulting a healthcare provider about healthy weight gain strategies. Focus on nutrient-dense foods and strength training."}
                {bmi >= 18.5 && bmi < 25 && "Excellent! You're in the healthy weight range. Maintain your current lifestyle with regular exercise and balanced nutrition."}
                {bmi >= 25 && bmi < 30 && "Consider adopting a balanced diet with portion control and incorporating 150+ minutes of moderate exercise weekly."}
                {bmi >= 30 && "It's recommended to consult with a healthcare provider for a personalized health plan focusing on gradual, sustainable weight loss."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full shadow-2xl">
              <span className="text-white text-4xl">🏥</span>
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">BMI Calculator</h1>
          <p className="text-2xl text-white/80 mb-2">Professional Health Assessment Tool</p>
          <p className="text-lg text-white/60">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Input Form */}
          <div className="bg-white/15 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-3 text-3xl">📊</span>
                Enter Your Details
              </h2>
            </div>
            
            <div className="space-y-8">
              {/* Height Input */}
              <div>
                <label className="text-white text-xl font-semibold block mb-4 flex items-center">
                  <span className="mr-3 text-2xl">📏</span> Height
                </label>
                <div className="flex space-x-4">
                  <input
                    type="number"
                    placeholder={heightUnit === "cm" ? "Enter height (cm)" : "Enter height (ft)"}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="flex-1 px-6 py-4 text-xl border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200 bg-white/10 backdrop-blur-sm text-white placeholder-white/60"
                  />
                  <select
                    value={heightUnit}
                    onChange={(e) => setHeightUnit(e.target.value)}
                    className="px-6 py-4 text-xl border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-blue-500/50 focus:border-blue-400 bg-white/10 backdrop-blur-sm text-white"
                  >
                    <option value="cm" className="text-gray-800">cm</option>
                    <option value="ft" className="text-gray-800">ft</option>
                  </select>
                </div>
                <p className="text-white/60 text-sm mt-2 ml-2">
                  {heightUnit === "cm" ? "Example: 175" : "Example: 5.8 (for 5'8\")"}
                </p>
              </div>

              {/* Weight Input */}
              <div>
                <label className="text-white text-xl font-semibold block mb-4 flex items-center">
                  <span className="mr-3 text-2xl">⚖️</span> Weight
                </label>
                <div className="flex space-x-4">
                  <input
                    type="number"
                    placeholder={weightUnit === "kg" ? "Enter weight (kg)" : "Enter weight (lbs)"}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="flex-1 px-6 py-4 text-xl border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200 bg-white/10 backdrop-blur-sm text-white placeholder-white/60"
                  />
                  <select
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value)}
                    className="px-6 py-4 text-xl border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-blue-500/50 focus:border-blue-400 bg-white/10 backdrop-blur-sm text-white"
                  >
                    <option value="kg" className="text-gray-800">kg</option>
                    <option value="lbs" className="text-gray-800">lbs</option>
                  </select>
                </div>
                <p className="text-white/60 text-sm mt-2 ml-2">
                  {weightUnit === "kg" ? "Example: 70" : "Example: 154"}
                </p>
              </div>

              <button
                onClick={calculateBMI}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-6 rounded-xl font-bold text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white/20"
              >
                🧮 Calculate BMI
              </button>

              {bmi && (
                <button
                  onClick={submitBMI}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 rounded-xl font-bold text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
                      Saving...
                    </div>
                  ) : (
                    "💾 Submit BMI"
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right Column - BMI Results */}
          <div className="lg:sticky lg:top-6">
            {bmi ? (
              <BMIScale bmiValue={parseFloat(bmi)} />
            ) : (
              <div className="bg-white/10 backdrop-blur-sm p-12 rounded-2xl border border-white/20 text-center">
                <div className="text-8xl mb-6">📈</div>
                <h3 className="text-3xl font-bold text-white mb-4">Ready for Analysis</h3>
                <p className="text-xl text-white/70 leading-relaxed">
                  Enter your height and weight, then click "Calculate BMI" to see your detailed health assessment with personalized recommendations.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Info Cards */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
            <div className="text-4xl mb-3">💙</div>
            <h3 className="font-bold text-blue-300 text-lg mb-2">Underweight</h3>
            <p className="text-white/70">BMI below 18.5</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
            <div className="text-4xl mb-3">💚</div>
            <h3 className="font-bold text-green-300 text-lg mb-2">Normal</h3>
            <p className="text-white/70">BMI 18.5 - 24.9</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
            <div className="text-4xl mb-3">💛</div>
            <h3 className="font-bold text-yellow-300 text-lg mb-2">Overweight</h3>
            <p className="text-white/70">BMI 25 - 29.9</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
            <div className="text-4xl mb-3">❤️</div>
            <h3 className="font-bold text-red-300 text-lg mb-2">Obese</h3>
            <p className="text-white/70">BMI 30+</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;