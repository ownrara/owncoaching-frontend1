import "./CoachNotesBox.css";

function CoachNotesBox({
  value,
  onChange,
  onSave,
  onMarkReviewed,
  status,
}) {
  const isReviewed = status === "Reviewed";

  return (
    <div className="card coachNotesCard">
      <div className="coachNotesHeader">
        <div>
          <div className="coachNotesTitle">Coach Notes</div>
          <div className="coachNotesSub">
            Visible to the client in Progress History only.
          </div>
        </div>

        <span className={isReviewed ? "badge" : "badge badgePending"}>
          {status}
        </span>
      </div>

      <textarea
        className="coachNotesArea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write feedback, adjustments, and next steps..."
        rows={7}
      />

      <div className="coachNotesActions">
        <button type="button" className="btnSecondary" onClick={onSave}>
          Save Notes
        </button>

        <button
          type="button"
          className="btnPrimary"
          onClick={onMarkReviewed}
          disabled={isReviewed}
          title={isReviewed ? "Already reviewed" : "Mark this check-in as reviewed"}
        >
          Mark Reviewed
        </button>
      </div>
    </div>
  );
}

export default CoachNotesBox;
