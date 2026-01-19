const mockCheckIns = [
  {
    id: "ci1",
    clientId: "c1",
    date: "2026-01-14",
    weight: 79.2,
    energy: "Good",
    adherence: 85,
    notes: "Good week.",
    status: "Pending",
    coachNotes: "",
  },
  {
    id: "ci2",
    clientId: "c1",
    date: "2026-01-07",
    weight: 80,
    energy: "Average",
    adherence: 78,
    notes: "Stress was high.",
    status: "Reviewed",
    coachNotes: "Keep steps high this week.",
  },
  {
    id: "ci3",
    clientId: "c2",
    date: "2026-01-15",
    weight: 92.5,
    energy: "Low",
    adherence: 60,
    notes: "Busy schedule.",
    status: "Pending",
    coachNotes: "",
  },
];

export default mockCheckIns;
