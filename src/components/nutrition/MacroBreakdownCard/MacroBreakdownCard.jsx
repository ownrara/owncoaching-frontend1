import "./MacroBreakdownCard.css";

function MacroBreakdownCard({
  caloriesGoal,
  macroPercents,
  onViewHistory,
}) {
  return (
    <div className="card nutritionLegacyCard">
      <div className="nutritionLegacyCardTitle">Today's Macro Breakdown</div>

      <div className="nutritionLegacyRingWrap">
        <div className="nutritionLegacyRing">
          <div className="nutritionLegacyRingCenter">
            <div className="nutritionLegacyRingValue">{caloriesGoal}</div>
            <div className="nutritionLegacyRingUnit">kcal</div>
          </div>
        </div>
      </div>

      <div className="nutritionLegacyMacroList">
        <MacroRow label="Protein" percent={macroPercents.protein} />
        <MacroRow label="Carbs" percent={macroPercents.carbs} />
        <MacroRow label="Fat" percent={macroPercents.fat} />
      </div>

      <div className="nutritionLegacyTotalCalories">
        <strong>Total Calories:</strong> {caloriesGoal} kcal
      </div>

      <button
        className="nutritionLegacyOutlineBtn"
        type="button"
        onClick={onViewHistory}
      >
        View Nutrition History
      </button>
    </div>
  );
}

function MacroRow({ label, percent }) {
  return (
    <div className="nutritionLegacyMacroRow">
      <div className="nutritionLegacyMacroTop">
        <span>{label}</span>
        <strong>{percent}%</strong>
      </div>
      <div className="nutritionLegacyBar">
        <div
          className="nutritionLegacyBarFill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default MacroBreakdownCard;
