const mockTrainingPlan = {
  planName: "Strength + Hypertrophy Block",
  durationWeeks: 12,
  currentWeek: 1,
  weeks: [
    {
      weekNumber: 1,
      focus: "Base volume + technique",
      days: [
        {
          day: "Day 1 - Upper",
          exercises: [
            { name: "Bench Press", sets: 4, reps: "6-8", notes: "RPE 7" },
            { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", notes: "" },
            { name: "Lat Pulldown", sets: 4, reps: "8-10", notes: "" },
            { name: "Lateral Raises", sets: 3, reps: "12-15", notes: "Slow tempo" },
          ],
        },
        {
          day: "Day 2 - Lower",
          exercises: [
            { name: "Back Squat", sets: 4, reps: "5-7", notes: "RPE 7" },
            { name: "Romanian Deadlift", sets: 3, reps: "8-10", notes: "" },
            { name: "Leg Press", sets: 3, reps: "10-12", notes: "" },
            { name: "Calf Raises", sets: 4, reps: "12-15", notes: "" },
          ],
        },
        {
          day: "Day 3 - Upper",
          exercises: [
            { name: "Overhead Press", sets: 4, reps: "6-8", notes: "" },
            { name: "Seated Cable Row", sets: 4, reps: "8-10", notes: "" },
            { name: "Dips (Assisted)", sets: 3, reps: "8-10", notes: "Stop 1 rep short" },
            { name: "Biceps Curl", sets: 3, reps: "10-12", notes: "" },
          ],
        },
      ],
    },
    {
      weekNumber: 2,
      focus: "Add +1 set on main lifts",
      days: [
        {
          day: "Day 1 - Upper",
          exercises: [
            { name: "Bench Press", sets: 5, reps: "6-8", notes: "RPE 7-8" },
            { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", notes: "" },
            { name: "Lat Pulldown", sets: 4, reps: "8-10", notes: "" },
            { name: "Lateral Raises", sets: 3, reps: "12-15", notes: "" },
          ],
        },
        {
          day: "Day 2 - Lower",
          exercises: [
            { name: "Back Squat", sets: 5, reps: "5-7", notes: "RPE 7-8" },
            { name: "Romanian Deadlift", sets: 3, reps: "8-10", notes: "" },
            { name: "Leg Press", sets: 3, reps: "10-12", notes: "" },
            { name: "Calf Raises", sets: 4, reps: "12-15", notes: "" },
          ],
        },
      ],
    },
  ],
};

export default mockTrainingPlan;
