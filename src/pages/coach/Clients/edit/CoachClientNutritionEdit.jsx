import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../../components/common/PageHeader/PageHeader";

import mockClients from "../../../../data/mockClients";
import { getNutritionState, saveNutritionState } from "../../../../data/nutritionPlansStore";

import "./CoachClientNutritionEdit.css";

function CoachClientNutritionEdit() {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const client = useMemo(() => {
    return mockClients.find((c) => c.id === clientId) || null;
  }, [clientId]);

  const [state, setState] = useState(() => getNutritionState(clientId));
  const [selectedPlanId, setSelectedPlanId] = useState(state.currentPlanId || state.plans?.[0]?.id || "");

  useEffect(() => {
    const next = getNutritionState(clientId);
    setState(next);
    setSelectedPlanId(next.currentPlanId || next.plans?.[0]?.id || "");
  }, [clientId]);

  const plans = state.plans || [];
  const planIndex = plans.findIndex((p) => p.id === selectedPlanId);
  const plan = planIndex >= 0 ? plans[planIndex] : plans[0];

  function setPlanField(name, value) {
    setState((prev) => {
      const nextPlans = [...(prev.plans || [])];
      const idx = nextPlans.findIndex((p) => p.id === selectedPlanId);
      if (idx === -1) return prev;

      nextPlans[idx] = { ...nextPlans[idx], [name]: value };
      return { ...prev, plans: nextPlans };
    });
  }

  function setGoalsField(name, value) {
    setState((prev) => {
      const nextPlans = [...(prev.plans || [])];
      const idx = nextPlans.findIndex((p) => p.id === selectedPlanId);
      if (idx === -1) return prev;

      const current = nextPlans[idx];
      nextPlans[idx] = {
        ...current,
        dailyGoals: {
          ...(current.dailyGoals || {}),
          [name]: value === "" ? "" : Number(value),
        },
      };

      return { ...prev, plans: nextPlans };
    });
  }

  function handleSave() {
    // also persist which plan is current (simple)
    const nextState = {
      ...state,
      currentPlanId: selectedPlanId,
    };

    saveNutritionState(clientId, nextState);
    navigate(`/coach/clients/${clientId}/nutrition`);
  }

  if (!plan) {
    return (
      <div>
        <PageHeader
          breadcrumb="Coach / Clients / Nutrition / Edit"
          title="Edit Nutrition Plan"
          subtitle={`${client?.name || clientId}`}
        />
        <div className="card" style={{ padding: 16 }}>
          No nutrition plan found for this client.
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumb="Coach / Clients / Nutrition / Edit"
        title="Edit Nutrition Plan"
        subtitle={`${client?.name || clientId}`}
      />

      <div className="section">
        <div className="card editCard">
          <div className="editGrid">
            <div className="editField" style={{ gridColumn: "1 / -1" }}>
              <label className="editLabel">Plan</label>
              <select
                className="editInput"
                value={selectedPlanId}
                onChange={(e) => setSelectedPlanId(e.target.value)}
              >
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="editField" style={{ gridColumn: "1 / -1" }}>
              <label className="editLabel">Plan Name</label>
              <input
                className="editInput"
                value={plan.name || ""}
                onChange={(e) => setPlanField("name", e.target.value)}
              />
            </div>

            <div className="editField" style={{ gridColumn: "1 / -1" }}>
              <label className="editLabel">Description</label>
              <textarea
                className="editTextArea"
                rows={4}
                value={plan.description || ""}
                onChange={(e) => setPlanField("description", e.target.value)}
                placeholder="Short goal or instructions..."
              />
            </div>

            <div className="editField">
              <label className="editLabel">Duration (weeks)</label>
              <input
                className="editInput"
                type="number"
                min="1"
                value={plan.durationWeeks ?? ""}
                onChange={(e) => setPlanField("durationWeeks", Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="card editCard">
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Daily Goals</div>

          <div className="editGrid">
            <div className="editField">
              <label className="editLabel">Calories</label>
              <input
                className="editInput"
                type="number"
                min="0"
                value={plan.dailyGoals?.calories ?? ""}
                onChange={(e) => setGoalsField("calories", e.target.value)}
              />
            </div>

            <div className="editField">
              <label className="editLabel">Protein (g)</label>
              <input
                className="editInput"
                type="number"
                min="0"
                value={plan.dailyGoals?.protein ?? ""}
                onChange={(e) => setGoalsField("protein", e.target.value)}
              />
            </div>

            <div className="editField">
              <label className="editLabel">Carbs (g)</label>
              <input
                className="editInput"
                type="number"
                min="0"
                value={plan.dailyGoals?.carbs ?? ""}
                onChange={(e) => setGoalsField("carbs", e.target.value)}
              />
            </div>

            <div className="editField">
              <label className="editLabel">Fat (g)</label>
              <input
                className="editInput"
                type="number"
                min="0"
                value={plan.dailyGoals?.fat ?? ""}
                onChange={(e) => setGoalsField("fat", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="card editCard">
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Coach Notes</div>
          <textarea
            className="editTextArea"
            rows={6}
            value={plan.coachNotes || ""}
            onChange={(e) => setPlanField("coachNotes", e.target.value)}
            placeholder="Notes the client will see on their Nutrition Plan page..."
          />
        </div>
      </div>

      <div className="section">
        <div className="editActions">
          <Link className="secondaryBtn" to={`/coach/clients/${clientId}/nutrition`}>
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

export default CoachClientNutritionEdit;
