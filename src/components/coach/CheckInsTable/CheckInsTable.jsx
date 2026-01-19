import { Link } from "react-router-dom";
import "./CheckInsTable.css";

function CheckInsTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <div className="card" style={{ padding: 16 }}>No pending check-ins.</div>;
  }

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "12px 14px", fontWeight: 900, borderBottom: "1px solid var(--border)" }}>
        Pending Check-Ins ({rows.length})
      </div>

      <div className="checkInsTableWrap">
        <table className="checkInsTable">
          <thead>
            <tr>
              <th>Client</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.clientName}</td>
                <td>{r.date}</td>
                <td>
                  <span className={r.status === "Pending" ? "badge badgePending" : "badge"}>
                    {r.status}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Link className="reviewBtn" to={`/coach/check-ins/${r.id}`}>
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CheckInsTable;
