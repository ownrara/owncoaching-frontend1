import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import mockNutritionPlan from "../../../data/mockNutritionPlan";

import PlanSelector from "../../../components/nutrition/PlanSelector";
import DaySelector from "../../../components/nutrition/DaySelector";
import InfoStrip from "../../../components/nutrition/InfoStrip/InfoStrip";
import CoachNotesCard from "../../../components/nutrition/CoachNotesCard/CoachNotesCard";
import MacroBreakdownCard from "../../../components/nutrition/MacroBreakdownCard/MacroBreakdownCard";
import MealAccordion from "../../../components/nutrition/MealAccordion/MealAccordion";

import "./NutritionPlan.css";
import "../../../components/nutrition/Nutrition.css";

function NutritionPlan() {
  const plans = mockNutritionPlan.plans;

  const [selectedPlanId, setSelectedPlanId] = useState(plans[0]?.id || "");
  const selectedPlan = useMemo(() => {
    return plans.find((p) => p.id === selectedPlanId) || plans[0];
  }, [plans, selectedPlanId]);

  const [selectedDay, setSelectedDay] = useState(
    selectedPlan?.days?.[0]?.day || ""
  );

  function handlePlanChange(newPlanId) {
    setSelectedPlanId(newPlanId);

    const newPlan = plans.find((p) => p.id === newPlanId);
    if (newPlan?.days?.length) setSelectedDay(newPlan.days[0].day);
    else setSelectedDay("");
  }

  const dayData = useMemo(() => {
    if (!selectedPlan) return null;
    return selectedPlan.days.find((d) => d.day === selectedDay) || null;
  }, [selectedPlan, selectedDay]);

  const totals = useMemo(() => {
    if (!dayData) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    dayData.meals.forEach((meal) => {
      meal.items.forEach((item) => {
        calories += Number(item.calories || 0);
        protein += Number(item.protein || 0);
        carbs += Number(item.carbs || 0);
        fat += Number(item.fat || 0);
      });
    });

    return { calories, protein, carbs, fat };
  }, [dayData]);

  const macroPercents = useMemo(() => {
    const p = Number(selectedPlan?.dailyGoals?.protein || 0);
    const c = Number(selectedPlan?.dailyGoals?.carbs || 0);
    const f = Number(selectedPlan?.dailyGoals?.fat || 0);
    const total = p + c + f;

    if (!total) return { protein: 0, carbs: 0, fat: 0 };

    return {
      protein: Math.round((p / total) * 100),
      carbs: Math.round((c / total) * 100),
      fat: Math.round((f / total) * 100),
    };
  }, [selectedPlan]);

  return (
    <div className="nutritionPage">
      <PageHeader
        breadcrumb="Dashboard / My Nutrition Plan"
        title="My Nutrition Plan"
        subtitle={`Plan: ${selectedPlan?.name || "-"} | Day: ${selectedDay || "-"}`}
      />

      <div className="nutritionGrid">
        {/* LEFT COLUMN */}
        <div className="nutritionLeft">
          {/* top controls card */}
          <div className="card nutritionTopCard">
            <div className="nutritionControlsRow">
              <div className="nutritionControl">
                <div className="nutritionControlLabel">Current Plan</div>
                <PlanSelector
                  plans={plans}
                  selectedPlanId={selectedPlanId}
                  onChange={handlePlanChange}
                />
              </div>

              <div className="nutritionControl">
                <div className="nutritionControlLabel">Select Day</div>
                <DaySelector
                  days={selectedPlan?.days || []}
                  selectedDay={selectedDay}
                  onChange={setSelectedDay}
                />
              </div>
            </div>

            <div className="nutritionInfoStrip">
              <InfoStrip goals={selectedPlan?.dailyGoals} />
            </div>
          </div>

          {/* coach notes */}
          <div className="nutritionSection">
            <CoachNotesCard text={selectedPlan?.coachNotes || ""} />
          </div>

          {/* meals */}
          <div className="card nutritionMealsCard">
            <div className="nutritionMealsHeader">Meals</div>

            <div className="nutritionMealsBody">
              {dayData ? (
                <MealAccordion meals={dayData.meals} />
              ) : (
                <div className="nutritionEmpty">No meals found for this day.</div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="nutritionRight">
          <MacroBreakdownCard
            caloriesGoal={Number(selectedPlan?.dailyGoals?.calories || 0)}
            macroPercents={macroPercents}
            totals={totals}
          />
        </div>
      </div>
    </div>
  );
}

export default NutritionPlan;
