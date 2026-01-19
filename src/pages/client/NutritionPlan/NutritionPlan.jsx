import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import mockNutritionLegacy from "../../../data/mockNutritionLegacy";
import InfoStrip from "../../../components/nutrition/InfoStrip/InfoStrip";
import CoachNotesCard from "../../../components/nutrition/CoachNotesCard/CoachNotesCard";
import MacroBreakdownCard from "../../../components/nutrition/MacroBreakdownCard/MacroBreakdownCard";
import "./NutritionPlan.css";

function NutritionPlan() {
  const plans = mockNutritionLegacy.plans;

  const [selectedPlanId, setSelectedPlanId] = useState(plans[0].id);
  const selectedPlan = useMemo(() => {
    return plans.find((p) => p.id === selectedPlanId);
  }, [plans, selectedPlanId]);

  const [selectedDayId, setSelectedDayId] = useState(selectedPlan.days[0].id);

  function handlePlanChange(e) {
    const newPlanId = e.target.value;
    setSelectedPlanId(newPlanId);

    const newPlan = plans.find((p) => p.id === newPlanId);
    if (newPlan && newPlan.days.length > 0) {
      setSelectedDayId(newPlan.days[0].id);
    }
  }

  const selectedDay = useMemo(() => {
    if (!selectedPlan) return null;
    return selectedPlan.days.find((d) => d.id === selectedDayId) || null;
  }, [selectedPlan, selectedDayId]);

  const plannedTotals = useMemo(() => {
    if (!selectedDay) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    selectedDay.meals.forEach((meal) => {
      meal.items.forEach((item) => {
        calories += item.cals;
        protein += item.protein;
        carbs += item.carbs;
        fat += item.fat;
      });
    });

    return { calories, protein, carbs, fat };
  }, [selectedDay]);

  const macroPercents = useMemo(() => {
    const totalGrams =
      plannedTotals.protein + plannedTotals.carbs + plannedTotals.fat;
    if (!totalGrams) return { protein: 0, carbs: 0, fat: 0 };

    return {
      protein: Math.round((plannedTotals.protein / totalGrams) * 100),
      carbs: Math.round((plannedTotals.carbs / totalGrams) * 100),
      fat: Math.round((plannedTotals.fat / totalGrams) * 100),
    };
  }, [plannedTotals]);

  function handleViewHistory() {
    // Placeholder only (we’ll connect to a page later if you want)
    alert("Nutrition history will be added later.");
  }

  return (
    <div>
      <PageHeader
        breadcrumb="Dashboard / My Nutrition Plan"
        title="My Nutrition Plan"
        subtitle={`Plan: ${selectedPlan.name} | ${mockNutritionLegacy.weekLabel}`}
      />

      <div className="nutritionLegacyLayout">
        {/* LEFT COLUMN */}
        <div className="nutritionLegacyLeft">
          <div className="card nutritionLegacyCard">
            <div className="nutritionLegacyControlsRow">
              <div className="nutritionLegacyControl">
                <div className="nutritionLegacyLabel">Current Plan</div>
                <select
                  className="nutritionLegacySelect"
                  value={selectedPlanId}
                  onChange={handlePlanChange}
                >
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="nutritionLegacyControl">
                <div className="nutritionLegacyLabel">Select Day</div>
                <select
                  className="nutritionLegacySelect"
                  value={selectedDayId}
                  onChange={(e) => setSelectedDayId(e.target.value)}
                >
                  {selectedPlan.days.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <InfoStrip
              calories={selectedPlan.dailyGoals.calories}
              protein={selectedPlan.dailyGoals.protein}
              carbs={selectedPlan.dailyGoals.carbs}
              fat={selectedPlan.dailyGoals.fat}
            />
          </div>

          <CoachNotesCard notes={selectedPlan.coachNotes} />

          <div className="card nutritionLegacyCard">
            <div className="nutritionLegacyCardTitle">Meals</div>

            <div className="nutritionLegacyMealsPlaceholder">
              {selectedDay?.meals.map((meal, idx) => (
                <div key={meal.id} className="nutritionLegacyMealRow">
                  <div className="nutritionLegacyMealHeader">
                    <div className="nutritionLegacyMealTitle">{meal.title}</div>
                    <div className="nutritionLegacyMealTime">{meal.time}</div>
                  </div>

                  {idx === 0 ? (
                    <div className="nutritionLegacyMealTablePlaceholder">
                      Table preview will be rebuilt as a reusable component in Step 3.
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="nutritionLegacyRight">
          <MacroBreakdownCard
            caloriesGoal={selectedPlan.dailyGoals.calories}
            macroPercents={macroPercents}
            onViewHistory={handleViewHistory}
          />
        </div>
      </div>
    </div>
  );
}

export default NutritionPlan;
