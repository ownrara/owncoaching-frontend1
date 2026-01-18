import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import mockNutritionPlan from "../../../data/mockNutritionPlan";

import PlanSelector from "../../../components/nutrition/PlanSelector";
import DaySelector from "../../../components/nutrition/DaySelector";
import MealCard from "../../../components/nutrition/MealCard";
import MacroSummary from "../../../components/nutrition/MacroSummary";
import "../../../components/nutrition/Nutrition.css";
import "./NutritionPlan.css";

function NutritionPlan() {
  const plans = mockNutritionPlan.plans;

  const [selectedPlanId, setSelectedPlanId] = useState(plans[0].id);
  const selectedPlan = useMemo(() => {
    return plans.find((p) => p.id === selectedPlanId);
  }, [plans, selectedPlanId]);

  const [selectedDay, setSelectedDay] = useState(selectedPlan.days[0].day);

  // If plan changes, make sure day is valid for that plan
  function handlePlanChange(newPlanId) {
    setSelectedPlanId(newPlanId);

    const newPlan = plans.find((p) => p.id === newPlanId);
    if (newPlan && newPlan.days.length > 0) {
      setSelectedDay(newPlan.days[0].day);
    }
  }

  const dayData = useMemo(() => {
    if (!selectedPlan) return null;
    return selectedPlan.days.find((d) => d.day === selectedDay);
  }, [selectedPlan, selectedDay]);

  const totals = useMemo(() => {
    if (!dayData) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    dayData.meals.forEach((meal) => {
      meal.items.forEach((item) => {
        calories += item.calories;
        protein += item.protein;
        carbs += item.carbs;
        fat += item.fat;
      });
    });

    return { calories, protein, carbs, fat };
  }, [dayData]);

  return (
    <div>
      <PageHeader
        breadcrumb="Client / My Nutrition Plan"
        title="My Nutrition Plan"
        subtitle="Your personalized meals and daily macro goals"
      />

      {/* Controls */}
      <div className="section card">
        <div className="nutritionTopRow">
          <div className="nutritionControl">
            <label className="nutritionLabel">Plan</label>
            <PlanSelector
              plans={plans}
              selectedPlanId={selectedPlanId}
              onChange={handlePlanChange}
            />
          </div>

          <div className="nutritionControl">
            <label className="nutritionLabel">Day</label>
            <DaySelector
              days={selectedPlan.days}
              selectedDay={selectedDay}
              onChange={setSelectedDay}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section nutritionGrid">
        <div className="nutritionLeft">
          <div className="card">
            <MacroSummary goals={selectedPlan.dailyGoals} />
          </div>

          <div className="card nutritionTotals">
            <h4>Planned Totals (Day)</h4>
            <ul>
              <li>
                <strong>Calories:</strong> {totals.calories}
              </li>
              <li>
                <strong>Protein:</strong> {totals.protein}g
              </li>
              <li>
                <strong>Carbs:</strong> {totals.carbs}g
              </li>
              <li>
                <strong>Fat:</strong> {totals.fat}g
              </li>
            </ul>
          </div>
        </div>

        <div className="nutritionRight">
          {dayData ? (
            dayData.meals.map((meal) => (
              <div key={meal.mealName} className="card">
                <MealCard meal={meal} />
              </div>
            ))
          ) : (
            <div className="card" style={{ padding: "16px" }}>
              No meals found for this day.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NutritionPlan;
