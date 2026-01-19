import "./InfoStrip.css";

function InfoStrip({ calories, protein, carbs, fat }) {
  return (
    <div className="nutritionLegacyGoalsStrip">
      <strong>Daily Calorie Goal:</strong> {calories} kcal |{" "}
      <strong>Protein:</strong> {protein}g | <strong>Carbs:</strong> {carbs}g |{" "}
      <strong>Fat:</strong> {fat}g
    </div>
  );
}

export default InfoStrip;
