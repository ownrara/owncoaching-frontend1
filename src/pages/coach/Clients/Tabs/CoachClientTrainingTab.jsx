import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import WeekSelector from "../../../../components/training/WeekSelector/WeekSelector";
import DayAccordion from "../../../../components/training/DayAccordion/DayAccordion";
import { getTrainingPlan, onTrainingPlansChange } from "../../../../data/trainingPlansStore";

function CoachClientTrainingTab() {
  const { clientId } = useParams();

  const [plan, setPlan] = useState(() => getTrainingPlan(clientId));
  const [selectedWeek, setSelectedWeek] = useState(plan.currentWeek);

  useEffect(() => {
    const off = onTrainingPlansChange(() => {
      const next = getTrainingPlan(clientId);
      setPlan(next);
      setSelectedWeek((prev) => {
        const exists = next.weeks.some((w) => w.weekNumber === prev);
        return exists ? prev : next.currentWeek;
      });
    });

    return off;
  }, [clientId]);

  const weekData = useMemo(() => {
    return plan.weeks.find((w) => w.weekNumber === selectedWeek) || null;
  }, [plan, selectedWeek]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <Link className="reviewBtn" to={`/coach/clients/${clientId}/training/edit`}>
          Edit Training Plan
        </Link>
      </div>

      <div className="section">
        <div className="trainingPlanMeta card">
          <div className="trainingPlanName">{plan.planName}</div>
          <div className="trainingPlanSub">
            Duration: {plan.durationWeeks} weeks
            {weekData ? ` • Focus: ${weekData.focus}` : ""}
          </div>
        </div>
      </div>

      <div className="section card">
        <WeekSelector
          weeks={plan.weeks}
          selectedWeekNumber={selectedWeek}
          onSelectWeek={setSelectedWeek}
        />
      </div>

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

export default CoachClientTrainingTab;
