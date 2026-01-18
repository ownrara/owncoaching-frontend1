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
            <th>Waist</th>
            <th>Sleep</th>
            <th>Energy</th>
            <th>Adherence</th>
            <th>Notes</th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan="7" className="emptyCell">
                No check-ins match the current filters.
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr key={r.id}>
                <td>{formatDateShort(r.date)}</td>
                <td>{formatNumber(r.weight, " kg")}</td>
                <td>{formatNumber(r.waist, " cm")}</td>
                <td>{formatNumber(r.sleepHours, " h")}</td>
                <td>{r.energy || "-"}</td>
                <td>{formatNumber(r.adherence, "%")}</td>
                <td className="notesCell">{r.notes || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;
