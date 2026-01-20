import "./CoachNotesCard.css";

function CoachNotesCard({ text }) {
  return (
    <div className="card nutritionLegacyCard">
      <div className="nutritionLegacyCardTitle">Coach Notes</div>
      <div className="nutritionLegacyNotes">{text && text.trim() ? text : "-"}</div>
    </div>
  );
}

export default CoachNotesCard;
