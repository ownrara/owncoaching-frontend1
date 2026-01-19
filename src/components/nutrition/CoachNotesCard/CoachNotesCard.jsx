import "./CoachNotesCard.css";

function CoachNotesCard({ notes }) {
  return (
    <div className="card nutritionLegacyCard">
      <div className="nutritionLegacyCardTitle">Coach Notes</div>
      <div className="nutritionLegacyNotes">{notes}</div>
    </div>
  );
}

export default CoachNotesCard;
