import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import WeekSelector from "../../../components/training/WeekSelector/WeekSelector";
import DayAccordion from "../../../components/training/DayAccordion/DayAccordion";
import mockTrainingPlan from "../../../data/mockTrainingPlan";
import "./TrainingPlan.css";

function TrainingPlan() {
  const [selectedWeek, setSelectedWeek] = useState(mockTrainingPlan.currentWeek);

  const weekData = useMemo(() => {
    return mockTrainingPlan.weeks.find((w) => w.weekNumber === selectedWeek);
  }, [selectedWeek]);

  return (
    <div>
      <PageHeader
        breadcrumb="Client / My Training Plan"
        title="My Training Plan"
        subtitle="Your personalized workout routine"
      />

      <div className="trainingTopBar">
        <div className="trainingPlanMeta">
          <div className="trainingPlanName">{mockTrainingPlan.planName}</div>
          <div className="trainingPlanSub">
            Duration: {mockTrainingPlan.durationWeeks} weeks
            {weekData ? ` • Focus: ${weekData.focus}` : ""}
          </div>
        </div>
      </div>

      <WeekSelector
        weeks={mockTrainingPlan.weeks}
        selectedWeekNumber={selectedWeek}
        onSelectWeek={setSelectedWeek}
      />

      {weekData ? (
        <DayAccordion days={weekData.days} />
      ) : (
        <div className="trainingEmpty">No data for this week.</div>
      )}
    </div>
  );
}

export default TrainingPlan;
