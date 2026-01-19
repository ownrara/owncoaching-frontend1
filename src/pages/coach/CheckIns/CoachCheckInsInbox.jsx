import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import { getCheckIns } from "../../../data/checkInsStore";
import mockClients from "../../../data/mockClients";
import CheckInsTable from "../../../components/coach/CheckInsTable/CheckInsTable";
import "./CoachCheckInsInbox.css";

const STATUS_OPTIONS = ["All", "Pending", "Reviewed"];

function CoachCheckInsInbox() {
  const [status, setStatus] = useState("All");

  // course-level "store read" (one-time init)
  const [checkIns] = useState(() => getCheckIns());

  const rows = useMemo(() => {
    const filtered =
      status === "All"
        ? checkIns
        : checkIns.filter((c) => c.status === status);

    // newest first (ISO date string)
    const sorted = [...filtered].sort((a, b) => (a.date < b.date ? 1 : -1));

    return sorted.map((c) => {
      const client = mockClients.find((x) => x.id === c.clientId);
      return {
        id: c.id,
        clientName: client?.name || c.clientId,
        date: c.date,
        status: c.status,
      };
    });
  }, [status, checkIns]);

  const summary = useMemo(() => {
    const pending = checkIns.filter((c) => c.status === "Pending").length;
    const reviewed = checkIns.filter((c) => c.status === "Reviewed").length;
    return { pending, reviewed, total: checkIns.length };
  }, [checkIns]);

  return (
    <div>
      <PageHeader
        breadcrumb="Coach / Check-Ins"
        title="Check-Ins Inbox"
        subtitle="Review client submissions and add coaching feedback"
      />

      <div className="checkInsInboxTop">
        <div className="checkInsStats">
          <div className="checkInsStat">
            <div className="checkInsStatLabel">Total</div>
            <div className="checkInsStatValue">{summary.total}</div>
          </div>
          <div className="checkInsStat">
            <div className="checkInsStatLabel">Pending</div>
            <div className="checkInsStatValue">{summary.pending}</div>
          </div>
          <div className="checkInsStat">
            <div className="checkInsStatLabel">Reviewed</div>
            <div className="checkInsStatValue">{summary.reviewed}</div>
          </div>
        </div>

        <div className="checkInsFilter">
          <label className="checkInsFilterLabel">Status</label>
          <select
            className="checkInsSelect"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
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
