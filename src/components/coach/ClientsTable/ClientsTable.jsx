import { Link } from "react-router-dom";
import "./ClientsTable.css";

function ClientsTable({ rows }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="card" style={{ padding: 16 }}>
        No clients found.
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div className="clientsTableHeader">
        Clients ({rows.length})
      </div>

      <div className="clientsTableWrap">
        <table className="clientsTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Client ID</th>
              <th style={{ textAlign: "right" }}></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.id}</td>
                <td style={{ textAlign: "right" }}>
                  <Link className="viewBtn" to={`/coach/clients/${c.id}`}>
                    View
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

export default ClientsTable;
