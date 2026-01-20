import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import WeekSelector from "../../../components/training/WeekSelector/WeekSelector";
import DayAccordion from "../../../components/training/DayAccordion/DayAccordion";
import { getTrainingPlan, onTrainingPlansChange } from "../../../data/trainingPlansStore";
import "./TrainingPlan.css";

// Course-level mock: assume logged-in client is c1
const CURRENT_CLIENT_ID = "c1";

function TrainingPlan() {
  const [plan, setPlan] = useState(() => getTrainingPlan(CURRENT_CLIENT_ID));
  const [selectedWeek, setSelectedWeek] = useState(plan.currentWeek);

  useEffect(() => {
    // keep client view synced after coach saves
    const off = onTrainingPlansChange(() => {
      const next = getTrainingPlan(CURRENT_CLIENT_ID);
      setPlan(next);
      setSelectedWeek((prev) => {
        const exists = next.weeks.some((w) => w.weekNumber === prev);
        return exists ? prev : next.currentWeek;
      });
    });

    return off;
  }, []);

  const weekData = useMemo(() => {
    return plan.weeks.find((w) => w.weekNumber === selectedWeek) || null;
  }, [plan, selectedWeek]);

  return (
    <div>
      <PageHeader
        breadcrumb="Client / My Training Plan"
        title="My Training Plan"
        subtitle="Your personalized workout routine"
      />

      {/* Plan meta */}
      <div className="section">
        <div className="trainingPlanMeta card">
          <div className="trainingPlanName">{plan.planName}</div>
          <div className="trainingPlanSub">
            Duration: {plan.durationWeeks} weeks
            {weekData ? ` • Focus: ${weekData.focus}` : ""}
          </div>
        </div>
      </div>

      {/* Week selector */}
      <div className="section card">
        <WeekSelector
          weeks={plan.weeks}
          selectedWeekNumber={selectedWeek}
          onSelectWeek={setSelectedWeek}
        />
      </div>

      {/* Days */}
      <div className="section">
        {weekData ? (
          <DayAccordion days={weekData.days} />
        ) : (
          <div className="trainingEmpty card">No data for this week.</div>
        )}
      </div>
    </div>
  );
}

export default TrainingPlan;
