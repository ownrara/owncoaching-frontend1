import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import mockNutritionLegacy from "../../../data/mockNutritionLegacy";
import "./NutritionPlan.css";

function NutritionPlan() {
  const plans = mockNutritionLegacy.plans;

  const [selectedPlanId, setSelectedPlanId] = useState(plans[0].id);
  const selectedPlan = useMemo(() => {
    return plans.find((p) => p.id === selectedPlanId);
  }, [plans, selectedPlanId]);

  const [selectedDayId, setSelectedDayId] = useState(selectedPlan.days[0].id);

  // If plan changes, reset day safely
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
    const totalGrams = plannedTotals.protein + plannedTotals.carbs + plannedTotals.fat;
    if (!totalGrams) return { protein: 0, carbs: 0, fat: 0 };

    return {
      protein: Math.round((plannedTotals.protein / totalGrams) * 100),
      carbs: Math.round((plannedTotals.carbs / totalGrams) * 100),
      fat: Math.round((plannedTotals.fat / totalGrams) * 100),
    };
  }, [plannedTotals]);

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
          {/* Controls card (matches screenshot top controls block) */}
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

            <div className="nutritionLegacyGoalsStrip">
              <strong>Daily Calorie Goal:</strong> {selectedPlan.dailyGoals.calories} kcal{" "}
              | <strong>Protein:</strong> {selectedPlan.dailyGoals.protein}g |{" "}
              <strong>Carbs:</strong> {selectedPlan.dailyGoals.carbs}g |{" "}
              <strong>Fat:</strong> {selectedPlan.dailyGoals.fat}g
            </div>
          </div>

          {/* Coach notes card */}
          <div className="card nutritionLegacyCard">
            <div className="nutritionLegacyCardTitle">Coach Notes</div>
            <div className="nutritionLegacyNotes">{selectedPlan.coachNotes}</div>
          </div>

          {/* Meals card (accordion/table will be componentized in Step 2/3) */}
          <div className="card nutritionLegacyCard">
            <div className="nutritionLegacyCardTitle">Meals</div>

            {/* Placeholder structure: in Step 2/3 we rebuild as components */}
            <div className="nutritionLegacyMealsPlaceholder">
              {selectedDay?.meals.map((meal, idx) => (
                <div key={meal.id} className="nutritionLegacyMealRow">
                  <div className="nutritionLegacyMealHeader">
                    <div className="nutritionLegacyMealTitle">
                      {meal.title}
                    </div>
                    <div className="nutritionLegacyMealTime">{meal.time}</div>
                  </div>

                  {/* Only the first meal shows table preview (like screenshot expanded) */}
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
          <div className="card nutritionLegacyCard">
            <div className="nutritionLegacyCardTitle">Today's Macro Breakdown</div>

            <div className="nutritionLegacyRingWrap">
              <div className="nutritionLegacyRing">
                <div className="nutritionLegacyRingCenter">
                  <div className="nutritionLegacyRingValue">
                    {selectedPlan.dailyGoals.calories}
                  </div>
                  <div className="nutritionLegacyRingUnit">kcal</div>
                </div>
              </div>
            </div>

            <div className="nutritionLegacyMacroList">
              <div className="nutritionLegacyMacroRow">
                <div className="nutritionLegacyMacroTop">
                  <span>Protein</span>
                  <strong>{macroPercents.protein}%</strong>
                </div>
                <div className="nutritionLegacyBar">
                  <div
                    className="nutritionLegacyBarFill"
                    style={{ width: `${macroPercents.protein}%` }}
                  />
                </div>
              </div>

              <div className="nutritionLegacyMacroRow">
                <div className="nutritionLegacyMacroTop">
                  <span>Carbs</span>
                  <strong>{macroPercents.carbs}%</strong>
                </div>
                <div className="nutritionLegacyBar">
                  <div
                    className="nutritionLegacyBarFill"
                    style={{ width: `${macroPercents.carbs}%` }}
                  />
                </div>
              </div>

              <div className="nutritionLegacyMacroRow">
                <div className="nutritionLegacyMacroTop">
                  <span>Fat</span>
                  <strong>{macroPercents.fat}%</strong>
                </div>
                <div className="nutritionLegacyBar">
                  <div
                    className="nutritionLegacyBarFill"
                    style={{ width: `${macroPercents.fat}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="nutritionLegacyTotalCalories">
              <strong>Total Calories:</strong> {selectedPlan.dailyGoals.calories} kcal
            </div>

            <button className="nutritionLegacyOutlineBtn" type="button">
              View Nutrition History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionPlan;
