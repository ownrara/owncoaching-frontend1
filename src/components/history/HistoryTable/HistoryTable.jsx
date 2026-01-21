import { formatDateShort, formatNumber } from "../../../utils/formatters";
import "./HistoryTable.css";

function HistoryTable({ rows }) {
  return (
    <div className="historyTableWrap">
      <table className="historyTable">
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight</th>
            <th>Notes</th>
            <th>Coach Notes</th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan="4" className="emptyCell">
                No check-ins match the current filters.
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr key={r.id}>
                <td>{formatDateShort(r.date)}</td>
                <td>{formatNumber(r.weight, " kg")}</td>
                <td className="notesCell">{r.notes || "-"}</td>
                <td className="notesCell">{r.coachNotes ? r.coachNotes : "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;
