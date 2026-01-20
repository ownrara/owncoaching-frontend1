import "./EditableExerciseTable.css";

function EditableExerciseTable({ exercises, onChangeExercises }) {
  function updateRow(index, field, value) {
    const next = exercises.map((ex, i) =>
      i === index ? { ...ex, [field]: value } : ex
    );
    onChangeExercises(next);
  }

  function addRow() {
    const next = [
      ...exercises,
      { name: "", sets: "", reps: "", notes: "" },
    ];
    onChangeExercises(next);
  }

  function removeRow(index) {
    const next = exercises.filter((_, i) => i !== index);
    onChangeExercises(next);
  }

  return (
    <div className="editTableWrap">
      <table className="editTable">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {exercises.length === 0 ? (
            <tr>
              <td colSpan="5" className="editEmpty">
                No exercises. Click “Add Exercise”.
              </td>
            </tr>
          ) : (
            exercises.map((ex, idx) => (
              <tr key={`${ex.name}-${idx}`}>
                <td>
                  <input
                    className="editCellInput"
                    value={ex.name}
                    onChange={(e) => updateRow(idx, "name", e.target.value)}
                    placeholder="Bench Press"
                  />
                </td>
                <td>
                  <input
                    className="editCellInput"
                    value={ex.sets}
                    onChange={(e) => updateRow(idx, "sets", e.target.value)}
                    placeholder="4"
                  />
                </td>
                <td>
                  <input
                    className="editCellInput"
                    value={ex.reps}
                    onChange={(e) => updateRow(idx, "reps", e.target.value)}
                    placeholder="6-8"
                  />
                </td>
                <td>
                  <input
                    className="editCellInput"
                    value={ex.notes || ""}
                    onChange={(e) => updateRow(idx, "notes", e.target.value)}
                    placeholder="RPE 7"
                  />
                </td>
                <td className="editActionsCell">
                  <button
                    type="button"
                    className="dangerBtn"
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

      <div className="editFooter">
        <button type="button" className="secondaryBtn" onClick={addRow}>
          + Add Exercise
        </button>
      </div>
    </div>
  );
}

export default EditableExerciseTable;
