import React, { useState, useEffect } from 'react';

// Import background image
import backgroundImage from "../assets/img/calorie1.jpg";

// Import food images from bottom_slider folder - CORRECTED FILE NAMES
import bread from "../assets/img/bottom_slider/bread.jpeg";
import broccoli from "../assets/img/bottom_slider/brocolli.jpeg"; // Note: actual file is "brocolli" (single 'c')
import cake from "../assets/img/bottom_slider/cake.jpeg";
import cheese from "../assets/img/bottom_slider/cheese.jpeg";
import chicken from "../assets/img/bottom_slider/chicken.jpg";
import eggs from "../assets/img/bottom_slider/eggs.jpg";
import faluda from "../assets/img/bottom_slider/faluda.jpeg";
import fruits from "../assets/img/bottom_slider/fruits.jpeg";
import hopper from "../assets/img/bottom_slider/hopper.jpeg";
import milkRice from "../assets/img/bottom_slider/milk rice.jpeg";
import milk from "../assets/img/bottom_slider/milk.jpeg";
import noodles from "../assets/img/bottom_slider/noodles.jpeg";
import orangeJuice from "../assets/img/bottom_slider/orange juice.jpeg";
import pasta from "../assets/img/bottom_slider/pasta.jpeg";
import pizza from "../assets/img/bottom_slider/pizza.jpeg";
import pudding from "../assets/img/bottom_slider/pudding.jpeg";
import rice from "../assets/img/bottom_slider/rice.jpeg";
import salmon from "../assets/img/bottom_slider/salmon.jpeg";
import soup from "../assets/img/bottom_slider/soup.jpg"; // CORRECTED: .jpg not .jpeg
import stringHoppers from "../assets/img/bottom_slider/string hoppers.jpeg";

// Add CSS for sliding animation
const slideStyles = `
  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  .animate-slide {
    animation: slide 30s linear infinite;
  }
  
  .animate-slide:hover {
    animation-play-state: paused;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = slideStyles;
  document.head.appendChild(styleSheet);
}

function CalorieCalculator() {
  // State variables
  const [mealData, setMealData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMealTime, setSelectedMealTime] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalSugar, setTotalSugar] = useState(0);
  const [totalCholesterol, setTotalCholesterol] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });

  // Food images data - using actual images from bottom_slider folder
  const foodImages = [
    { name: "Bread", image: bread },
    { name: "Broccoli", image: broccoli },
    { name: "Cake", image: cake },
    { name: "Cheese", image: cheese },
    { name: "Chicken", image: chicken },
    { name: "Eggs", image: eggs },
    { name: "Faluda", image: faluda },
    { name: "Fruits", image: fruits },
    { name: "Hopper", image: hopper },
    { name: "Milk Rice", image: milkRice },
    { name: "Milk", image: milk },
    { name: "Noodles", image: noodles },
    { name: "Orange Juice", image: orangeJuice },
    { name: "Pasta", image: pasta },
    { name: "Pizza", image: pizza },
    { name: "Pudding", image: pudding },
    { name: "Rice", image: rice },
    { name: "Salmon", image: salmon },
    { name: "Soup", image: soup },
    { name: "String Hoppers", image: stringHoppers },
  ];

  // Enhanced meal data with sugar and cholesterol (per 100g)
  useEffect(() => {
    const fetchMealData = async () => {
      try {
        // In a real app, this would be an API call
        // Simulating API response with the enhanced nutritional data
        const response = {
          "Sri_Lankan_Foods": [
            { "name": "Rice_and_Curry - Beef", "calories": 450, "sugar": 5, "cholesterol": 85 },
            { "name": "Rice_and_Curry - Chicken", "calories": 400, "sugar": 4, "cholesterol": 75 },
            { "name": "Rice_and_Curry - Vegetarian", "calories": 350, "sugar": 8, "cholesterol": 0 },
            { "name": "Kottu_Roti", "calories": 600, "sugar": 3, "cholesterol": 95 },
            { "name": "Fried_Rice", "calories": 500, "sugar": 2, "cholesterol": 65 },
            { "name": "Kiribath", "calories": 350, "sugar": 1, "cholesterol": 15 },
            { "name": "Hoppers", "calories": 150, "sugar": 1, "cholesterol": 45 },
            { "name": "String_Hoppers", "calories": 120, "sugar": 0.5, "cholesterol": 0 },
            { "name": "Roti - Plain", "calories": 150, "sugar": 1, "cholesterol": 0 },
            { "name": "Roti - Pol_Roti_with_Lunu_Miris", "calories": 200, "sugar": 2, "cholesterol": 0 },
            { "name": "Dhal_Curry", "calories": 180, "sugar": 3, "cholesterol": 0 },
            { "name": "Chicken_Curry", "calories": 500, "sugar": 5, "cholesterol": 120 },
            { "name": "Fish_Curry", "calories": 400, "sugar": 4, "cholesterol": 80 },
            { "name": "Deviled_Chicken", "calories": 450, "sugar": 8, "cholesterol": 110 },
            { "name": "Masala_Dosa", "calories": 300, "sugar": 2, "cholesterol": 25 },
            { "name": "Watalappan", "calories": 250, "sugar": 20, "cholesterol": 120 },
            { "name": "Curd_with_Honey", "calories": 120, "sugar": 15, "cholesterol": 25 },
            { "name": "Vegetables - Cabbage", "calories": 25, "sugar": 6, "cholesterol": 0 },
            { "name": "Vegetables - Carrot", "calories": 40, "sugar": 9, "cholesterol": 0 },
            { "name": "Vegetables - Pumpkin", "calories": 40, "sugar": 7, "cholesterol": 0 },
            { "name": "Vegetables - Brinjal", "calories": 25, "sugar": 4, "cholesterol": 0 },
            { "name": "Vegetables - Okra", "calories": 35, "sugar": 1.5, "cholesterol": 0 },
            { "name": "Vegetables - Beetroot", "calories": 45, "sugar": 10, "cholesterol": 0 },
            { "name": "Vegetables - Spinach", "calories": 23, "sugar": 0.4, "cholesterol": 0 },
            { "name": "Vegetables - Malabar_Spinach", "calories": 25, "sugar": 0.5, "cholesterol": 0 },
            { "name": "Snacks - Samosa", "calories": 150, "sugar": 2, "cholesterol": 15 },
            { "name": "Snacks - Vada", "calories": 250, "sugar": 1, "cholesterol": 0 },
            { "name": "Snacks - Cutlets", "calories": 300, "sugar": 3, "cholesterol": 45 },
            { "name": "Snacks - Prawn_Crackers", "calories": 220, "sugar": 2, "cholesterol": 25 },
            { "name": "Snacks - Fish_Bun", "calories": 180, "sugar": 4, "cholesterol": 35 },
            { "name": "Snacks - Onion_Rings", "calories": 200, "sugar": 3, "cholesterol": 0 },
            { "name": "Snacks - French_Fries", "calories": 200, "sugar": 0.3, "cholesterol": 0 }
          ],
          "Western_Foods": [
            { "name": "Cheeseburger", "calories": 400, "sugar": 5, "cholesterol": 95 },
            { "name": "Beef_Burger", "calories": 350, "sugar": 4, "cholesterol": 85 },
            { "name": "Veg_Burger", "calories": 300, "sugar": 6, "cholesterol": 15 },
            { "name": "Chicken_Burger", "calories": 350, "sugar": 4, "cholesterol": 75 },
            { "name": "Grilled_Cheese_Sandwich", "calories": 350, "sugar": 3, "cholesterol": 45 },
            { "name": "Hot_Dog", "calories": 250, "sugar": 2, "cholesterol": 55 },
            { "name": "Spaghetti_Bolognese", "calories": 600, "sugar": 8, "cholesterol": 65 },
            { "name": "Mac_and_Cheese", "calories": 500, "sugar": 4, "cholesterol": 85 },
            { "name": "Pizza - Margherita", "calories": 250, "sugar": 4, "cholesterol": 35 },
            { "name": "Pizza - Pepperoni", "calories": 300, "sugar": 4, "cholesterol": 45 },
            { "name": "Fried_Chicken", "calories": 450, "sugar": 1, "cholesterol": 135 },
            { "name": "Fried_Fish", "calories": 400, "sugar": 0.5, "cholesterol": 90 },
            { "name": "Mozzarella_Sticks", "calories": 250, "sugar": 2, "cholesterol": 55 },
            { "name": "Onion_Rings", "calories": 200, "sugar": 3, "cholesterol": 0 },
            { "name": "French_Fries", "calories": 200, "sugar": 0.3, "cholesterol": 0 }
          ],
          "Fruits": [
            { "name": "Mango", "calories": 150, "sugar": 32, "cholesterol": 0 },
            { "name": "Banana", "calories": 100, "sugar": 22, "cholesterol": 0 },
            { "name": "Papaya", "calories": 50, "sugar": 11, "cholesterol": 0 },
            { "name": "Pineapple", "calories": 80, "sugar": 18, "cholesterol": 0 },
            { "name": "Guava", "calories": 40, "sugar": 9, "cholesterol": 0 },
            { "name": "Passion_Fruit", "calories": 60, "sugar": 11, "cholesterol": 0 },
            { "name": "Orange", "calories": 60, "sugar": 14, "cholesterol": 0 },
            { "name": "Avocado", "calories": 160, "sugar": 1, "cholesterol": 0 },
            { "name": "Jackfruit", "calories": 155, "sugar": 38, "cholesterol": 0 },
            { "name": "Lychee", "calories": 70, "sugar": 17, "cholesterol": 0 },
            { "name": "Rambutan", "calories": 68, "sugar": 16, "cholesterol": 0 },
            { "name": "Watermelon", "calories": 80, "sugar": 18, "cholesterol": 0 },
            { "name": "Pomegranate", "calories": 100, "sugar": 21, "cholesterol": 0 },
            { "name": "Dates", "calories": 270, "sugar": 63, "cholesterol": 0 },
            { "name": "Sapodilla", "calories": 120, "sugar": 28, "cholesterol": 0 }
          ],
          "Beverages": [
            { "name": "Black_Tea", "calories": 4, "sugar": 0, "cholesterol": 0 },
            { "name": "Milk_Tea", "calories": 150, "sugar": 12, "cholesterol": 15 },
            { "name": "Lemon_Tea", "calories": 80, "sugar": 18, "cholesterol": 0 },
            { "name": "Iced_Tea", "calories": 50, "sugar": 12, "cholesterol": 0 },
            { "name": "Green_Tea", "calories": 2, "sugar": 0, "cholesterol": 0 },
            { "name": "Herbal_Tea", "calories": 0, "sugar": 0, "cholesterol": 0 },
            { "name": "Black_Coffee", "calories": 5, "sugar": 0, "cholesterol": 0 },
            { "name": "Cappuccino", "calories": 150, "sugar": 8, "cholesterol": 25 },
            { "name": "Latte", "calories": 100, "sugar": 6, "cholesterol": 20 },
            { "name": "Mocha", "calories": 200, "sugar": 15, "cholesterol": 30 },
            { "name": "Espresso", "calories": 5, "sugar": 0, "cholesterol": 0 },
            { "name": "Fruit_Juice - Orange", "calories": 120, "sugar": 26, "cholesterol": 0 },
            { "name": "Fruit_Juice - Apple", "calories": 130, "sugar": 28, "cholesterol": 0 },
            { "name": "Fruit_Juice - Pineapple", "calories": 90, "sugar": 20, "cholesterol": 0 },
            { "name": "Fresh_Coconut_Water", "calories": 45, "sugar": 9, "cholesterol": 0 },
            { "name": "Lemonade", "calories": 100, "sugar": 25, "cholesterol": 0 },
            { "name": "Coca_Cola", "calories": 150, "sugar": 35, "cholesterol": 0 },
            { "name": "Pepsi", "calories": 150, "sugar": 35, "cholesterol": 0 },
            { "name": "Chocolate_Milkshake", "calories": 400, "sugar": 45, "cholesterol": 65 },
            { "name": "Vanilla_Milkshake", "calories": 350, "sugar": 38, "cholesterol": 55 },
            { "name": "Iced_Coffee", "calories": 120, "sugar": 15, "cholesterol": 10 },
            { "name": "Hot_Chocolate", "calories": 250, "sugar": 30, "cholesterol": 25 }
          ],
          "Chocolates": [
            { "name": "Milk_Chocolate", "calories": 200, "sugar": 24, "cholesterol": 25 },
            { "name": "Dark_Chocolate", "calories": 150, "sugar": 15, "cholesterol": 5 },
            { "name": "White_Chocolate", "calories": 220, "sugar": 28, "cholesterol": 30 },
            { "name": "Chocolate_Truffles", "calories": 250, "sugar": 22, "cholesterol": 45 },
            { "name": "Chocolate_Brownie", "calories": 300, "sugar": 35, "cholesterol": 85 },
            { "name": "Chocolate_Mousse", "calories": 300, "sugar": 28, "cholesterol": 120 },
            { "name": "Chocolate_Pudding", "calories": 250, "sugar": 25, "cholesterol": 65 },
            { "name": "Curd_with_Chocolate_Sauce", "calories": 180, "sugar": 20, "cholesterol": 35 },
            { "name": "Milk_Toffee", "calories": 120, "sugar": 18, "cholesterol": 15 }
          ],
          "Desserts": [
            { "name": "Vanilla_Ice_Cream", "calories": 200, "sugar": 22, "cholesterol": 65 },
            { "name": "Chocolate_Ice_Cream", "calories": 250, "sugar": 26, "cholesterol": 70 },
            { "name": "Cheesecake", "calories": 400, "sugar": 32, "cholesterol": 165 },
            { "name": "Brownies", "calories": 300, "sugar": 30, "cholesterol": 75 },
            { "name": "Apple_Pie", "calories": 300, "sugar": 25, "cholesterol": 45 },
            { "name": "Cupcake", "calories": 250, "sugar": 28, "cholesterol": 55 },
            { "name": "Fruit_Salad", "calories": 150, "sugar": 30, "cholesterol": 0 },
            { "name": "Lemon_Cake", "calories": 350, "sugar": 35, "cholesterol": 85 },
            { "name": "Rice_Pudding", "calories": 250, "sugar": 20, "cholesterol": 45 },
            { "name": "Pudding", "calories": 250, "sugar": 22, "cholesterol": 50 },
            { "name": "Churros", "calories": 300, "sugar": 15, "cholesterol": 25 }
          ]
        };

        setMealData(response);
        setCategories(Object.keys(response));
      } catch (error) {
        console.error("Error fetching meal data:", error);
      }
    };

    fetchMealData();
  }, []);

  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedMeal('');
  };

  // Handle meal time selection
  const handleMealTimeChange = (e) => {
    setSelectedMealTime(e.target.value);
  };

  // Handle meal selection
  const handleMealChange = (e) => {
    setSelectedMeal(e.target.value);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // Add meal to the selected meals
  const addMeal = () => {
    if (!selectedMeal || !selectedMealTime) return;

    // Find the meal and its nutritional values
    let mealData_item = null;
    for (const category of Object.keys(mealData)) {
      const foundMeal = mealData[category].find(item => item.name === selectedMeal);
      if (foundMeal) {
        mealData_item = foundMeal;
        break;
      }
    }

    if (!mealData_item) return;

    const newMeal = {
      meal: selectedMeal,
      quantity: parseInt(quantity),
      calories: mealData_item.calories,
      sugar: mealData_item.sugar,
      cholesterol: mealData_item.cholesterol
    };

    setSelectedMeals(prev => ({
      ...prev,
      [selectedMealTime]: [...prev[selectedMealTime], newMeal]
    }));

    // Reset selection fields
    setSelectedMeal('');
    setQuantity(100);
  };

  // Calculate total nutritional values
  const calculateTotals = () => {
    let totalCal = 0;
    let totalSug = 0;
    let totalChol = 0;
    
    // Flatten all meals into a single array
    const allMeals = [
      ...selectedMeals.breakfast,
      ...selectedMeals.lunch,
      ...selectedMeals.dinner,
      ...selectedMeals.snacks
    ];

    // Calculate totals
    allMeals.forEach(({ calories, sugar, cholesterol, quantity }) => {
      const multiplier = quantity / 100;
      totalCal += calories * multiplier;
      totalSug += sugar * multiplier;
      totalChol += cholesterol * multiplier;
    });

    setTotalCalories(totalCal);
    setTotalSugar(totalSug);
    setTotalCholesterol(totalChol);
  };

  // Remove a meal from the list
  const removeMeal = (mealTime, index) => {
    setSelectedMeals(prev => {
      const updated = { ...prev };
      updated[mealTime] = updated[mealTime].filter((_, i) => i !== index);
      return updated;
    });
  };

  // Format meal name for display (replace underscores with spaces)
  const formatMealName = (name) => {
    return name.replace(/_/g, ' ');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Background overlay - less transparent */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          
          {/* Main Calculator Section */}
          <div className="flex justify-center items-center min-h-[60vh] flex-col">
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-xl w-full max-w-2xl border border-white/30">
              <h2 className="text-2xl font-bold text-center text-teal-700 mb-2">Nutrition Calculator</h2>
              <p className="text-center text-gray-500 text-sm mb-6">Track Calories, Sugar & Cholesterol - {new Date().toLocaleDateString()}</p>
              
              {/* Meal Selection Form */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-600 block mb-2 font-medium" htmlFor="category">Select Meal Category</label>
                    <select 
                      id="category" 
                      value={selectedCategory} 
                      onChange={handleCategoryChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors"
                    >
                      <option value="">Select Meal Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {formatMealName(category)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-600 block mb-2 font-medium" htmlFor="mealTime">Select Meal Time</label>
                    <select 
                      id="mealTime" 
                      value={selectedMealTime} 
                      onChange={handleMealTimeChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors"
                    >
                      <option value="">Select Meal Time</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snacks">Snacks</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-600 block mb-2 font-medium" htmlFor="meal">Select a meal</label>
                    <select 
                      id="meal" 
                      value={selectedMeal} 
                      onChange={handleMealChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors"
                      disabled={!selectedCategory}
                    >
                      <option value="">Select a meal</option>
                      {selectedCategory && mealData[selectedCategory] && 
                        mealData[selectedCategory].map(item => (
                          <option key={item.name} value={item.name}>
                            {formatMealName(item.name)} ({item.calories} cal, {item.sugar}g sugar, {item.cholesterol}mg chol)
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-600 block mb-2 font-medium" htmlFor="quantity">Quantity (grams)</label>
                    <input 
                      type="number" 
                      id="quantity" 
                      value={quantity} 
                      onChange={handleQuantityChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={addMeal} 
                className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedMeal || !selectedMealTime}
              >
                Add Meal
              </button>

              {/* Display selected meals */}
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Selected Meals:</h3>
                
                {Object.keys(selectedMeals).map(mealTime => (
                  selectedMeals[mealTime].length > 0 && (
                    <div key={mealTime} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-teal-600 mb-2 capitalize">{mealTime}</h4>
                      <div className="space-y-2">
                        {selectedMeals[mealTime].map((meal, index) => (
                          <div key={index} className="flex justify-between items-center bg-white p-3 rounded border">
                            <div className="flex-1">
                              <div className="font-medium text-gray-800">{formatMealName(meal.meal)} - {meal.quantity}g</div>
                              <div className="text-sm text-gray-600 mt-1 grid grid-cols-3 gap-2">
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs text-center">
                                  {((meal.calories / 100) * meal.quantity).toFixed(1)} cal
                                </span>
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs text-center">
                                  {((meal.sugar / 100) * meal.quantity).toFixed(1)}g sugar
                                </span>
                                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs text-center">
                                  {((meal.cholesterol / 100) * meal.quantity).toFixed(1)}mg chol
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => removeMeal(mealTime, index)}
                              className="ml-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>

              {/* Calculate buttons */}
              <div className="mt-6">
                <button 
                  onClick={calculateTotals} 
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Calculate Total Daily Nutrition
                </button>
              </div>

              {/* Display totals */}
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-4 text-center">
                  <h3 className="text-lg font-bold text-red-700 mb-2">Total Calories</h3>
                  <div className="text-2xl font-bold text-red-800">{totalCalories.toFixed(1)}</div>
                  <div className="text-sm text-red-600">kcal</div>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-lg p-4 text-center">
                  <h3 className="text-lg font-bold text-yellow-700 mb-2">Total Sugar</h3>
                  <div className="text-2xl font-bold text-yellow-800">{totalSugar.toFixed(1)}</div>
                  <div className="text-sm text-yellow-600">grams</div>
                </div>
                
                 <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-4 text-center">
          <h3 className="text-lg font-bold text-purple-700 mb-2">Total Cholesterol</h3>
          <div className="text-2xl font-bold text-purple-800">{totalCholesterol.toFixed(1)}</div>
          <div className="text-sm text-purple-600">milligrams</div>
        </div>
      </div>

      {/* Daily Value Progress Bars */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Daily Value Progress</h2>
        <div className="space-y-4">
          {/* Calories - assuming 2000 kcal daily value */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Calories</span>
              <span>{Math.round((totalCalories / 2000) * 100)}% of 2000 kcal</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                style={{width: `${Math.min((totalCalories / 2000) * 100, 100)}%`}}
              ></div>
            </div>
          </div>

          {/* Sugar - assuming 50g daily limit */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Sugar</span>
              <span>{Math.round((totalSugar / 50) * 100)}% of 50g limit</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                style={{width: `${Math.min((totalSugar / 50) * 100, 100)}%`}}
              ></div>
            </div>
          </div>

          {/* Cholesterol - assuming 300mg daily limit */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Cholesterol</span>
              <span>{Math.round((totalCholesterol / 300) * 100)}% of 300mg limit</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-300" 
                style={{width: `${Math.min((totalCholesterol / 300) * 100, 100)}%`}}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
        </div>
      </div>
    </div>
    );
};
export default CalorieCalculator;