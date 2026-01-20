import "./EditableExerciseTable.css";

function EditableExerciseTable({ exercises, onChangeExercises }) {
  function updateRow(index, field, value) {
    const next = exercises.map((ex, i) =>
      i === index ? { ...ex, [field]: value } : ex
    );
    onChangeExercises(next);
  }

  function removeRow(index) {
    const next = exercises.filter((_, i) => i !== index);
    onChangeExercises(next);
  }

  function addRow() {
    const next = [
      ...exercises,
      { name: "", sets: "", reps: "", notes: "" },
    ];
    onChangeExercises(next);
  }

  return (
    <div className="exerciseTableWrap">
      <table className="exerciseTable">
        <thead>
          <tr>
            <th>Exercise</th>
            <th style={{ width: 90 }}>Sets</th>
            <th style={{ width: 120 }}>Reps</th>
            <th>Notes</th>
            <th style={{ width: 80 }}></th>
          </tr>
        </thead>

        <tbody>
          {exercises.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: 12, color: "var(--muted)" }}>
                No exercises. Add one below.
              </td>
            </tr>
          ) : (
            exercises.map((ex, idx) => (
              <tr key={`${ex.name}-${idx}`}>
                <td>
                  <input
                    className="editInput"
                    value={ex.name}
                    onChange={(e) => updateRow(idx, "name", e.target.value)}
                    placeholder="Exercise name"
                  />
                </td>
                <td>
                  <input
                    className="editInput"
                    value={ex.sets}
                    onChange={(e) => updateRow(idx, "sets", e.target.value)}
                    placeholder="e.g. 4"
                  />
                </td>
                <td>
                  <input
                    className="editInput"
                    value={ex.reps}
                    onChange={(e) => updateRow(idx, "reps", e.target.value)}
                    placeholder="e.g. 6-8"
                  />
                </td>
                <td>
                  <input
                    className="editInput"
                    value={ex.notes}
                    onChange={(e) => updateRow(idx, "notes", e.target.value)}
                    placeholder="Notes"
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    className="smallDangerBtn"
                    onClick={() => removeRow(idx)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{ paddingTop: 10 }}>
        <button type="button" className="smallPrimaryBtn" onClick={addRow}>
          + Add Exercise
        </button>
      </div>
    </div>
  );
}

export default EditableExerciseTable;
