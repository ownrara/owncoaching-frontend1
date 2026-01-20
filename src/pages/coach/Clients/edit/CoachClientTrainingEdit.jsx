// src/pages/coach/Clients/edit/CoachClientTrainingEdit.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../../components/common/PageHeader/PageHeader";
import WeekSelector from "../../../../components/training/WeekSelector/WeekSelector";
import EditableExerciseTable from "../../../../components/training/EditableExerciseTable/EditableExerciseTable";
import { getTrainingPlan, saveTrainingPlan } from "../../../../data/trainingPlansStore";
import mockClients from "../../../../data/mockClients";
import "./CoachClientTrainingEdit.css";

/**
 * Course-level helpers (plain JS, no libs)
 */
function buildWeek(weekNumber) {
  return {
    weekNumber,
    focus: "",
    days: [{ day: "Day 1 - Custom", exercises: [] }],
  };
}

function clampMin(n, min) {
  const v = Number(n);
  if (Number.isNaN(v)) return min;
  return Math.max(min, v);
}

function safeText(v) {
  return String(v ?? "").trim();
}

function CoachClientTrainingEdit() {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const client = useMemo(() => {
    return mockClients.find((c) => c.id === clientId) || null;
  }, [clientId]);

  const [plan, setPlan] = useState(() => getTrainingPlan(clientId));
  const [selectedWeek, setSelectedWeek] = useState(() => plan.currentWeek || 1);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Add Day input
  const [newDayName, setNewDayName] = useState("");

  // When route param changes (different client)
  useEffect(() => {
    const next = getTrainingPlan(clientId);
    setPlan(next);
    setSelectedWeek(next.currentWeek || 1);
    setSelectedDayIndex(0);
    setNewDayName("");
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

        const nextDays = (w.days || []).map((d, idx) =>
          idx === selectedDayIndex ? { ...d, exercises: nextExercises } : d
        );

        return { ...w, days: nextDays };
      }),
    }));
  }

  /**
   * + Add Week / Remove Week
   * Duration derived from number of weeks
   */
  function addWeek() {
    // Use functional setPlan so we don't depend on stale plan in closure
    setPlan((prev) => {
      const nextNumber = prev.weeks.length + 1;
      const nextWeeks = [...prev.weeks, buildWeek(nextNumber)];
      return {
        ...prev,
        durationWeeks: nextWeeks.length,
        weeks: nextWeeks,
      };
    });

    // Jump to the new week (next number) + reset day
    setSelectedWeek((prevSelected) => {
      // best-effort: choose last week index based on current plan length
      // (React state updates are async, so we use current plan length here)
      return plan.weeks.length + 1;
    });
    setSelectedDayIndex(0);
    setNewDayName("");
  }

  function removeCurrentWeek() {
    // Don’t allow deleting the last remaining week
    if (plan.weeks.length <= 1) return;

    setPlan((prev) => {
      const remaining = prev.weeks.filter((w) => w.weekNumber !== selectedWeek);

      // Renumber weeks 1..N
      const renumbered = remaining.map((w, idx) => ({
        ...w,
        weekNumber: idx + 1,
      }));

      const nextSelectedWeek = clampMin(
        Math.min(selectedWeek, renumbered.length),
        1
      );

      const nextCurrentWeek = clampMin(
        Math.min(prev.currentWeek || 1, renumbered.length),
        1
      );

      return {
        ...prev,
        durationWeeks: renumbered.length,
        currentWeek: nextCurrentWeek,
        weeks: renumbered,
        __nextSelectedWeek: nextSelectedWeek, // temp hint for effect
      };
    });
  }

  // Cleanup temp field + sync selected week after delete
  useEffect(() => {
    if (plan.__nextSelectedWeek) {
      const nextW = plan.__nextSelectedWeek;

      setPlan((prev) => {
        const { __nextSelectedWeek, ...clean } = prev;
        return clean;
      });

      setSelectedWeek(nextW);
      setSelectedDayIndex(0);
      setNewDayName("");
    }
  }, [plan]);

  /**
   * + Add Day / Remove Day (selected)
   */
  function addDay() {
    const name = safeText(newDayName);
    if (!name) return;

    setPlan((prev) => ({
      ...prev,
      weeks: prev.weeks.map((w) => {
        if (w.weekNumber !== selectedWeek) return w;

        const existing = (w.days || []).some(
          (d) => safeText(d.day).toLowerCase() === name.toLowerCase()
        );
        if (existing) return w;

        const nextDays = [...(w.days || []), { day: name, exercises: [] }];
        return { ...w, days: nextDays };
      }),
    }));

    // Select the new day (last index) using current days length
    setSelectedDayIndex(days.length);
    setNewDayName("");
  }

  function removeCurrentDay() {
    if (!weekData) return;
    if (days.length <= 1) return; // keep at least 1 day (course-level safeguard)

    setPlan((prev) => ({
      ...prev,
      weeks: prev.weeks.map((w) => {
        if (w.weekNumber !== selectedWeek) return w;

        const nextDays = (w.days || []).filter((_, idx) => idx !== selectedDayIndex);

        // If coach removed the selected day, select a safe index afterwards
        return { ...w, days: nextDays };
      }),
    }));

    // Move selection to previous day if possible, else first
    setSelectedDayIndex((prevIdx) => {
      const nextIdx = Math.max(0, prevIdx - 1);
      return nextIdx;
    });

    setNewDayName("");
  }

  function handleSave() {
    saveTrainingPlan(clientId, plan);
    navigate(`/coach/clients/${clientId}/training`);
  }

  const canRemoveWeek = plan.weeks.length > 1;
  const canRemoveDay = days.length > 1;

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

            {/* Duration derived from number of weeks */}
            <div className="editField">
              <label className="editLabel">Duration (weeks)</label>
              <input className="editInput" value={plan.weeks.length} disabled readOnly />
            </div>

            <div className="editField">
              <label className="editLabel">Current Week</label>
              <select
                className="editInput"
                value={plan.currentWeek || 1}
                onChange={(e) => {
                  const v = clampMin(e.target.value, 1);
                  setPlanField("currentWeek", v);
                  setSelectedWeek(v);
                  setSelectedDayIndex(0);
                  setNewDayName("");
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

          {/* Week actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 12,
              flexWrap: "wrap",
            }}
          >
            <button type="button" className="secondaryBtn" onClick={addWeek}>
              + Add Week
            </button>

            <button
              type="button"
              className="secondaryBtn"
              onClick={removeCurrentWeek}
              disabled={!canRemoveWeek}
              title={!canRemoveWeek ? "You must keep at least 1 week." : ""}
            >
              Remove Week
            </button>
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
            setNewDayName("");
          }}
        />
      </div>

      {/* Week focus + Day selection + Day actions */}
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

          <div className="editField" style={{ marginBottom: 12 }}>
            <label className="editLabel">Select Day</label>
            <select
              className="editInput"
              value={selectedDayIndex}
              onChange={(e) => setSelectedDayIndex(Number(e.target.value))}
              disabled={days.length === 0}
            >
              {days.map((d, idx) => (
                <option key={`${d.day}-${idx}`} value={idx}>
                  {d.day}
                </option>
              ))}
            </select>

            {/* Day actions */}
            <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
              <button type="button" className="secondaryBtn" onClick={removeCurrentDay} disabled={!canRemoveDay}>
                Remove Day
              </button>
            </div>
          </div>

          {/* Add Day */}
          <div className="editField">
            <label className="editLabel">Add New Day</label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input
                className="editInput"
                value={newDayName}
                onChange={(e) => setNewDayName(e.target.value)}
                placeholder='e.g. "Day 4 - Cardio"'
              />
              <button
                type="button"
                className="primaryBtn"
                onClick={addDay}
                style={{ whiteSpace: "nowrap" }}
              >
                + Add Day
              </button>
            </div>
            <div style={{ marginTop: 6, fontSize: 12, color: "var(--muted)" }}>
              Tip: Day name must be unique in the selected week.
            </div>
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
