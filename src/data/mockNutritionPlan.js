const mockNutritionPlan = {
  plans: [
    {
      id: "lean-gain",
      name: "Lean Muscle Gain",
      dailyGoals: { calories: 2500, protein: 180, carbs: 250, fat: 70 },
      days: [
        {
          day: "Monday",
          meals: [
            {
              mealName: "Meal 1",
              time: "08:00 AM",
              items: [
                { name: "Chicken Breast", calories: 375, protein: 83, carbs: 53, fat: 22 },
                { name: "Oatmeal", calories: 188, protein: 26, carbs: 29, fat: 6 },
              ],
            },
            {
              mealName: "Meal 2",
              time: "12:00 PM",
              items: [
                { name: "Grilled Chicken", calories: 158, protein: 31, carbs: 0, fat: 4 },
                { name: "Brown Rice", calories: 190, protein: 4, carbs: 41, fat: 2 },
                { name: "Steamed Broccoli", calories: 70, protein: 5, carbs: 13, fat: 1 },
              ],
            },
          ],
        },
        {
          day: "Tuesday",
          meals: [
            {
              mealName: "Meal 1",
              time: "08:00 AM",
              items: [
                { name: "Egg Whites", calories: 120, protein: 26, carbs: 2, fat: 0 },
                { name: "Toast", calories: 160, protein: 6, carbs: 28, fat: 2 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default mockNutritionPlan;
