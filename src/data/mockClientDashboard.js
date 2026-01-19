const mockClientDashboard = {
  overview: [
    { id: "ov1", label: "Current Weight", value: "79.2 kg", subtext: "Last check-in" },
    { id: "ov2", label: "Weekly Adherence", value: "85%", subtext: "Diet + training" },
    { id: "ov3", label: "Next Check-In", value: "Sunday", subtext: "Submit your update" },
  ],

  quickActions: [
    {
      id: "qa1",
      label: "Weekly Check-In",
      description: "Submit your weekly measurements and notes.",
      to: "/client/weekly-checkin",
    },
    {
      id: "qa2",
      label: "View Training Plan",
      description: "See your week and daily workout details.",
      to: "/client/training-plan",
    },
    {
      id: "qa3",
      label: "View Nutrition Plan",
      description: "Review meals and macro targets for today.",
      to: "/client/nutrition-plan",
    },
    {
      id: "qa4",
      label: "Progress History",
      description: "Track your check-ins over time.",
      to: "/client/progress-history",
    },
  ],

  recent: {
    date: "2026-01-14",
    stats: [
      { label: "Weight", value: "79.2 kg" },
      { label: "Waist", value: "82 cm" },
      { label: "Energy", value: "Good" },
      { label: "Adherence", value: "85%" },
    ],
    coachUpdate:
      "Good consistency this week. Prioritize sleep and keep protein steady. Next week we’ll increase steps slightly.",
  },
};

export default mockClientDashboard;
