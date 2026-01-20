import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../../components/common/PageHeader/PageHeader";
import WeekSelector from "../../../../components/training/WeekSelector/WeekSelector";
import EditableExerciseTable from "../../../../components/training/EditableExerciseTable/EditableExerciseTable";
import { getTrainingPlan, saveTrainingPlan } from "../../../../data/trainingPlansStore";
import mockClients from "../../../../data/mockClients";
import "./CoachClientTrainingEdit.css";

function CoachClientTrainingEdit() {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const client = useMemo(() => {
    return mockClients.find((c) => c.id === clientId) || null;
  }, [clientId]);

  const [plan, setPlan] = useState(() => getTrainingPlan(clientId));
  const [selectedWeek, setSelectedWeek] = useState(plan.currentWeek);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  useEffect(() => {
    // when route param changes (different client)
    const next = getTrainingPlan(clientId);
    setPlan(next);
    setSelectedWeek(next.currentWeek);
    setSelectedDayIndex(0);
  }, [clientId]);

  const weekData = useMemo(() => {
    return plan.weeks.find((w) => w.weekNumber === selectedWeek) || null;
  }, [plan, selectedWeek]);

  const days = weekData?.days || [];
  const dayData = days[selectedDayIndex] || null;

  function setPlanField(name, value) {
    setPlan((prev) => ({ ...prev, [name]: value }));
  }

  function updateWeekFocus(value) {
    setPlan((prev) => ({
      ...prev,
      weeks: prev.weeks.map((w) =>
        w.weekNumber === selectedWeek ? { ...w, focus: value } : w
      ),
    }));
  }

  function updateDayExercises(nextExercises) {
    setPlan((prev) => ({
      ...prev,
      weeks: prev.weeks.map((w) => {
        if (w.weekNumber !== selectedWeek) return w;

        const nextDays = w.days.map((d, idx) =>
          idx === selectedDayIndex ? { ...d, exercises: nextExercises } : d
        );

        return { ...w, days: nextDays };
      }),
    }));
  }

  function handleSave() {
    // persist to shared store for this client
    saveTrainingPlan(clientId, plan);

    // go back to training tab (read-only view)
    navigate(`/coach/clients/${clientId}/training`);
  }

  return (
    <div>
      <PageHeader
        breadcrumb="Coach / Clients / Training / Edit"
        title="Edit Training Plan"
        subtitle={`${client?.name || clientId}`}
      />

      {/* Meta */}
      <div className="section">
        <div className="card editCard">
          <div className="editGrid">
            <div className="editField">
              <label className="editLabel">Plan Name</label>
              <input
                className="editInput"
                value={plan.planName}
                onChange={(e) => setPlanField("planName", e.target.value)}
              />
            </div>

            <div className="editField">
              <label className="editLabel">Duration (weeks)</label>
              <input
                className="editInput"
                type="number"
                min="1"
                value={plan.durationWeeks}
                onChange={(e) => setPlanField("durationWeeks", e.target.value)}
              />
            </div>

            <div className="editField">
              <label className="editLabel">Current Week</label>
              <select
                className="editInput"
                value={plan.currentWeek}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setPlanField("currentWeek", v);
                  setSelectedWeek(v);
                  setSelectedDayIndex(0);
                }}
              >
                {plan.weeks.map((w) => (
                  <option key={w.weekNumber} value={w.weekNumber}>
                    Week {w.weekNumber}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Week selector (reuse) */}
      <div className="section card">
        <WeekSelector
          weeks={plan.weeks}
          selectedWeekNumber={selectedWeek}
          onSelectWeek={(w) => {
            setSelectedWeek(w);
            setSelectedDayIndex(0);
          }}
        />
      </div>

      {/* Week focus + Day selection */}
      <div className="section">
        <div className="card editCard">
          <div className="editField" style={{ marginBottom: 12 }}>
            <label className="editLabel">Week Focus</label>
            <input
              className="editInput"
              value={weekData?.focus || ""}
              onChange={(e) => updateWeekFocus(e.target.value)}
              placeholder="e.g. Base volume + technique"
            />
          </div>

          <div className="editField">
            <label className="editLabel">Select Day</label>
            <select
              className="editInput"
              value={selectedDayIndex}
              onChange={(e) => setSelectedDayIndex(Number(e.target.value))}
            >
              {days.map((d, idx) => (
                <option key={d.day} value={idx}>
                  {d.day}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Editable exercises */}
      <div className="section">
        <div className="card editCard">
          <div style={{ fontWeight: 900, marginBottom: 10 }}>
            Exercises — {dayData?.day || "No day"}
          </div>

          {dayData ? (
            <EditableExerciseTable
              exercises={dayData.exercises || []}
              onChangeExercises={updateDayExercises}
            />
          ) : (
            <div style={{ padding: 12, color: "var(--muted)" }}>
              No day data found.
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="section">
        <div className="editActions">
          <Link className="secondaryBtn" to={`/coach/clients/${clientId}/training`}>
            Cancel
          </Link>

          <button className="primaryBtn" type="button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoachClientTrainingEdit;
