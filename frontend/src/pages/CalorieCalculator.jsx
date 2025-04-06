import React, { useState, useEffect } from 'react';

function CalorieCalculator() {
  // State variables
  const [mealData, setMealData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMealTime, setSelectedMealTime] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [totalCalories, setTotalCalories] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });

  // Fetch meal data on component mount
  useEffect(() => {
    const fetchMealData = async () => {
      try {
        // In a real app, this would be an API call
        // Simulating API response with the provided data
        const response = {
          "Sri_Lankan_Foods": [
            { "name": "Rice_and_Curry - Beef", "calories": 450 },
            { "name": "Rice_and_Curry - Chicken", "calories": 400 },
            { "name": "Rice_and_Curry - Vegetarian", "calories": 350 },
            { "name": "Kottu_Roti", "calories": 600 },
            { "name": "Fried_Rice", "calories": 500 },
            { "name": "Kiribath", "calories": 350 },
            { "name": "Hoppers", "calories": 150 },
            { "name": "String_Hoppers", "calories": 120 },
            { "name": "Roti - Plain", "calories": 150 },
            { "name": "Roti - Pol_Roti_with_Lunu_Miris", "calories": 200 },
            { "name": "Dhal_Curry", "calories": 180 },
            { "name": "Chicken_Curry", "calories": 500 },
            { "name": "Fish_Curry", "calories": 400 },
            { "name": "Deviled_Chicken", "calories": 450 },
            { "name": "Masala_Dosa", "calories": 300 },
            { "name": "Watalappan", "calories": 250 },
            { "name": "Curd_with_Honey", "calories": 120 },
            { "name": "Vegetables - Cabbage", "calories": 25 },
            { "name": "Vegetables - Carrot", "calories": 40 },
            { "name": "Vegetables - Pumpkin", "calories": 40 },
            { "name": "Vegetables - Brinjal", "calories": 25 },
            { "name": "Vegetables - Okra", "calories": 35 },
            { "name": "Vegetables - Beetroot", "calories": 45 },
            { "name": "Vegetables - Spinach", "calories": 23 },
            { "name": "Vegetables - Malabar_Spinach", "calories": 25 },
            { "name": "Snacks - Samosa", "calories": 150 },
            { "name": "Snacks - Vada", "calories": 250 },
            { "name": "Snacks - Cutlets", "calories": 300 },
            { "name": "Snacks - Prawn_Crackers", "calories": 220 },
            { "name": "Snacks - Fish_Bun", "calories": 180 },
            { "name": "Snacks - Onion_Rings", "calories": 200 },
            { "name": "Snacks - French_Fries", "calories": 200 }
          ],
          "Western_Foods": [
            { "name": "Cheeseburger", "calories": 400 },
            { "name": "Beef_Burger", "calories": 350 },
            { "name": "Veg_Burger", "calories": 300 },
            { "name": "Chicken_Burger", "calories": 350 },
            { "name": "Grilled_Cheese_Sandwich", "calories": 350 },
            { "name": "Hot_Dog", "calories": 250 },
            { "name": "Spaghetti_Bolognese", "calories": 600 },
            { "name": "Mac_and_Cheese", "calories": 500 },
            { "name": "Pizza - Margherita", "calories": 250 },
            { "name": "Pizza - Pepperoni", "calories": 300 },
            { "name": "Fried_Chicken", "calories": 450 },
            { "name": "Fried_Fish", "calories": 400 },
            { "name": "Mozzarella_Sticks", "calories": 250 },
            { "name": "Onion_Rings", "calories": 200 },
            { "name": "French_Fries", "calories": 200 }
          ],
          "Fruits": [
            { "name": "Mango", "calories": 150 },
            { "name": "Banana", "calories": 100 },
            { "name": "Papaya", "calories": 50 },
            { "name": "Pineapple", "calories": 80 },
            { "name": "Guava", "calories": 40 },
            { "name": "Passion_Fruit", "calories": 60 },
            { "name": "Orange", "calories": 60 },
            { "name": "Avocado", "calories": 160 },
            { "name": "Jackfruit", "calories": 155 },
            { "name": "Lychee", "calories": 70 },
            { "name": "Rambutan", "calories": 68 },
            { "name": "Watermelon", "calories": 80 },
            { "name": "Pomegranate", "calories": 100 },
            { "name": "Dates", "calories": 270 },
            { "name": "Sapodilla", "calories": 120 }
          ],
          "Beverages": [
            { "name": "Black_Tea", "calories": 4 },
            { "name": "Milk_Tea", "calories": 150 },
            { "name": "Lemon_Tea", "calories": 80 },
            { "name": "Iced_Tea", "calories": 50 },
            { "name": "Green_Tea", "calories": 2 },
            { "name": "Herbal_Tea", "calories": 0 },
            { "name": "Black_Coffee", "calories": 5 },
            { "name": "Cappuccino", "calories": 150 },
            { "name": "Latte", "calories": 100 },
            { "name": "Mocha", "calories": 200 },
            { "name": "Espresso", "calories": 5 },
            { "name": "Fruit_Juice - Orange", "calories": 120 },
            { "name": "Fruit_Juice - Apple", "calories": 130 },
            { "name": "Fruit_Juice - Pineapple", "calories": 90 },
            { "name": "Fresh_Coconut_Water", "calories": 45 },
            { "name": "Lemonade", "calories": 100 },
            { "name": "Coca_Cola", "calories": 150 },
            { "name": "Pepsi", "calories": 150 },
            { "name": "Chocolate_Milkshake", "calories": 400 },
            { "name": "Vanilla_Milkshake", "calories": 350 },
            { "name": "Iced_Coffee", "calories": 120 },
            { "name": "Hot_Chocolate", "calories": 250 }
          ],
          "Chocolates": [
            { "name": "Milk_Chocolate", "calories": 200 },
            { "name": "Dark_Chocolate", "calories": 150 },
            { "name": "White_Chocolate", "calories": 220 },
            { "name": "Chocolate_Truffles", "calories": 250 },
            { "name": "Chocolate_Brownie", "calories": 300 },
            { "name": "Chocolate_Mousse", "calories": 300 },
            { "name": "Chocolate_Pudding", "calories": 250 },
            { "name": "Curd_with_Chocolate_Sauce", "calories": 180 },
            { "name": "Milk_Toffee", "calories": 120 }
          ],
          "Desserts": [
            { "name": "Vanilla_Ice_Cream", "calories": 200 },
            { "name": "Chocolate_Ice_Cream", "calories": 250 },
            { "name": "Cheesecake", "calories": 400 },
            { "name": "Brownies", "calories": 300 },
            { "name": "Apple_Pie", "calories": 300 },
            { "name": "Cupcake", "calories": 250 },
            { "name": "Fruit_Salad", "calories": 150 },
            { "name": "Lemon_Cake", "calories": 350 },
            { "name": "Rice_Pudding", "calories": 250 },
            { "name": "Pudding", "calories": 250 },
            { "name": "Churros", "calories": 300 }
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

    // Find the meal and its calories
    let mealCalories = 0;
    for (const category of Object.keys(mealData)) {
      const foundMeal = mealData[category].find(item => item.name === selectedMeal);
      if (foundMeal) {
        mealCalories = foundMeal.calories;
        break;
      }
    }

    const newMeal = {
      meal: selectedMeal,
      quantity: parseInt(quantity),
      calories: mealCalories
    };

    setSelectedMeals(prev => ({
      ...prev,
      [selectedMealTime]: [...prev[selectedMealTime], newMeal]
    }));

    // Reset selection fields
    setSelectedMeal('');
    setQuantity(100);
  };

  // Calculate calories for a meal
  const calculateCalories = () => {
    let total = 0;
    
    // Flatten all meals into a single array
    const allMeals = [
      ...selectedMeals.breakfast,
      ...selectedMeals.lunch,
      ...selectedMeals.dinner,
      ...selectedMeals.snacks
    ];

    // Calculate total calories
    allMeals.forEach(({ calories, quantity }) => {
      total += (calories / 100) * quantity;
    });

    setTotalCalories(total);
  };

  // Calculate total day calories
  const calculateTotalDayCalories = () => {
    calculateCalories();
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-100 to-blue-100 flex-col">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold text-center text-gray-700 mb-2">Calorie Calculator</h2>
        <p className="text-center text-gray-500 text-sm">Date: {new Date().toLocaleDateString()}</p>
        
        {/* Meal Selection Form */}
        <div className="space-y-3">
          <label className="text-gray-600 block mb-1" htmlFor="category">Select Meal Category</label>
          <select 
            id="category" 
            value={selectedCategory} 
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Meal Category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {formatMealName(category)}
              </option>
            ))}
          </select>
        </div>

        <div className="text-gray-600 block mb-1">
          <label htmlFor="mealTime">Select Meal Time</label>
          <select 
            id="mealTime" 
            value={selectedMealTime} 
            onChange={handleMealTimeChange}
             className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Meal Time</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snacks">Snacks</option>
          </select>
        </div>

        <div className="text-gray-600 block mb-1">
          <label htmlFor="meal">Select a meal</label>
          <select 
            id="meal" 
            value={selectedMeal} 
            onChange={handleMealChange}
             className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            disabled={!selectedCategory}
          >
            <option value="">Select a meal</option>
            {selectedCategory && mealData[selectedCategory] && 
              mealData[selectedCategory].map(item => (
                <option key={item.name} value={item.name}>
                  {formatMealName(item.name)} ({item.calories} cal/100g)
                </option>
              ))
            }
          </select>
        </div>

        <div className="text-gray-600 block mb-1">
          <label htmlFor="quantity">Quantity (grams)</label>
          <input 
            type="number" 
            id="quantity" 
            value={quantity} 
            onChange={handleQuantityChange}
             className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            min="1"
          />
        </div>

        <button 
          onClick={addMeal} 
          className="w-full bg-teal-400 text-white py-2 rounded-lg"
          disabled={!selectedMeal || !selectedMealTime}
        >
          Add Meal
        </button>

        {/* Display selected meals */}
        <div className="selected-meals">
          <h2>Selected Meals:</h2>
          
          {Object.keys(selectedMeals).map(mealTime => (
            selectedMeals[mealTime].length > 0 && (
              <div key={mealTime} className="meal-time-group">
                <h3>{mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}</h3>
                <ul>
                  {selectedMeals[mealTime].map((meal, index) => (
                    <li key={index}>
                      {formatMealName(meal.meal)} - {meal.quantity}g 
                      ({((meal.calories / 100) * meal.quantity).toFixed(1)} cal)
                      <button 
                        onClick={() => removeMeal(mealTime, index)}
                        className="w-full bg-red-500 text-white py-2 rounded-lg"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
          <br></br>
        </div>

        {/* Calculate buttons */}
        <div className="w-full bg-teal-500 text-white py-2 rounded-lg">
          {/* <button 
            onClick={calculateCalories} 
            className="w-full bg-teal-500 text-white py-2 rounded-lg"
          >
            Calculate Calories
          </button> */}
          
          <button 
            onClick={calculateTotalDayCalories} 
            className="w-full bg-teal-500 text-white py-2 rounded-lg"
          >
            Calculate Total Day Calories
          </button>
        </div>

        {/* Display total calories */}
        <div className="total-calories">
          <h3>Total Calories: {totalCalories.toFixed(1)}</h3>
        </div>
      </div>
    </div>
  );
}

export default CalorieCalculator;