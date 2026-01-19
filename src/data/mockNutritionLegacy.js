const mockNutritionLegacy = {
  clientName: "Client Name",
  weekLabel: "Week: 1",
  plans: [
    {
      id: "cutting",
      name: "Cutting Plan",
      dailyGoals: { calories: 2200, protein: 170, carbs: 230, fat: 60 },
      coachNotes:
        "Hit protein first. Keep steps consistent. Drink water and track your meals.",
      days: [
        {
          id: "training-day",
          label: "Training Day",
          meals: [
            {
              id: "meal1",
              title: "Meal 1 - Breakfast",
              time: "08:00",
              items: [
                { name: "Eggs", cals: 210, protein: 18, carbs: 1, fat: 15 },
                { name: "Toast", cals: 160, protein: 6, carbs: 28, fat: 2 },
                { name: "Fruit", cals: 90, protein: 1, carbs: 23, fat: 0 },
              ],
            },
            {
              id: "meal2",
              title: "Meal 2 - Lunch",
              time: "13:00",
              items: [
                { name: "Chicken Breast", cals: 260, protein: 45, carbs: 0, fat: 6 },
                { name: "Rice", cals: 240, protein: 5, carbs: 52, fat: 1 },
                { name: "Salad", cals: 80, protein: 2, carbs: 10, fat: 4 },
              ],
            },
            {
              id: "meal3",
              title: "Meal 3 - Snack",
              time: "17:00",
              items: [
                { name: "Greek Yogurt", cals: 160, protein: 20, carbs: 10, fat: 3 },
                { name: "Banana", cals: 105, protein: 1, carbs: 27, fat: 0 },
              ],
            },
          ],
        },
        {
          id: "rest-day",
          label: "Rest Day",
          meals: [
            {
              id: "meal1",
              title: "Meal 1 - Breakfast",
              time: "09:00",
              items: [
                { name: "Oatmeal", cals: 220, protein: 8, carbs: 38, fat: 4 },
                { name: "Whey Protein", cals: 120, protein: 24, carbs: 3, fat: 2 },
              ],
            },
            {
              id: "meal2",
              title: "Meal 2 - Lunch",
              time: "14:00",
              items: [
                { name: "Tuna", cals: 180, protein: 38, carbs: 0, fat: 2 },
                { name: "Potatoes", cals: 200, protein: 4, carbs: 45, fat: 0 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "maintenance",
      name: "Maintenance Plan",
      dailyGoals: { calories: 2600, protein: 180, carbs: 300, fat: 75 },
      coachNotes: "Focus on consistency. Keep 2L water daily and hit steps.",
      days: [
        {
          id: "standard-day",
          label: "Standard Day",
          meals: [
            {
              id: "meal1",
              title: "Meal 1 - Breakfast",
              time: "08:00",
              items: [
                { name: "Egg Whites", cals: 150, protein: 30, carbs: 2, fat: 2 },
                { name: "Bread", cals: 200, protein: 7, carbs: 38, fat: 3 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default mockNutritionLegacy;
