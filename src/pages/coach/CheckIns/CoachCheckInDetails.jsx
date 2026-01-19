import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import CheckInsTable from "../../../components/coach/CheckInsTable/CheckInsTable";
import mockCheckIns from "../../../data/mockCheckIns";
import mockClients from "../../../data/mockClients";

function CoachCheckInsInbox() {
  const [status, setStatus] = useState("Pending"); // "Pending" | "Reviewed" | "All"

  const rows = useMemo(() => {
    const filtered =
      status === "All"
        ? mockCheckIns
        : mockCheckIns.filter((c) => c.status === status);

    return filtered.map((c) => {
      const client = mockClients.find((x) => x.id === c.clientId);
      return {
        id: c.id,
        clientName: client?.name || c.clientId,
        date: c.date,
        status: c.status,
      };
    });
  }, [status]);

  return (
    <div>
      <PageHeader
        breadcrumb="Coach / Check-Ins"
        title="Check-Ins Inbox"
        subtitle="Review client check-ins and mark them as reviewed."
      />

      {/* Simple filter (course-level) */}
      <div className="section" style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button className="btn" onClick={() => setStatus("Pending")}>
          Pending
        </button>
        <button className="btn" onClick={() => setStatus("Reviewed")}>
          Reviewed
        </button>
        <button className="btn" onClick={() => setStatus("All")}>
          All
        </button>
      </div>

      <div className="section">
        <CheckInsTable
          rows={rows}
          title={status === "All" ? "All Check-Ins" : `${status} Check-Ins`}
          emptyText="No check-ins match this filter."
        />
      </div>
    </div>
  );
}

export default CoachCheckInsInbox;
