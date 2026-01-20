import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import mockClients from "../../../../data/mockClients";
import { getCheckIns } from "../../../../data/checkInsStore";
import "./CoachClientOverviewTab.css";

function CoachClientOverviewTab() {
  const { clientId } = useParams();

  const client = useMemo(() => {
    return mockClients.find((c) => c.id === clientId) || null;
  }, [clientId]);

  const stats = useMemo(() => {
    const all = getCheckIns();
    const mine = all.filter((c) => c.clientId === clientId);

    const pending = mine.filter((c) => c.status === "Pending").length;
    const reviewed = mine.filter((c) => c.status === "Reviewed").length;

    // newest first (ISO date works lexicographically)
    const sorted = [...mine].sort((a, b) => (a.date < b.date ? 1 : -1));
    const lastDate = sorted[0]?.date || "-";

    return {
      total: mine.length,
      pending,
      reviewed,
      lastDate,
    };
  }, [clientId]);

  if (!client) {
    return (
      <div className="card" style={{ padding: 16 }}>
        Client not found: <strong>{clientId}</strong>
      </div>
    );
  }

  return (
    <div className="overviewWrap">
      <div className="card overviewCard">
        <div className="overviewTitle">Client Summary</div>

        <div className="overviewGrid">
          <div className="overviewItem">
            <div className="overviewLabel">Client Name</div>
            <div className="overviewValue">{client.name}</div>
          </div>

          <div className="overviewItem">
            <div className="overviewLabel">Client ID</div>
            <div className="overviewValue">{client.id}</div>
          </div>

          <div className="overviewItem">
            <div className="overviewLabel">Last Check-In</div>
            <div className="overviewValue">{stats.lastDate}</div>
          </div>
        </div>
      </div>

      <div className="overviewRow">
        <div className="card overviewCard">
          <div className="overviewTitle">Check-Ins</div>

          <div className="miniStats">
            <div className="miniStat">
              <div className="miniLabel">Total</div>
              <div className="miniValue">{stats.total}</div>
            </div>

            <div className="miniStat">
              <div className="miniLabel">Pending</div>
              <div className="miniValue">{stats.pending}</div>
            </div>

            <div className="miniStat">
              <div className="miniLabel">Reviewed</div>
              <div className="miniValue">{stats.reviewed}</div>
            </div>
          </div>

          <div className="overviewActions">
            <Link className="reviewBtn" to={`/coach/clients/${clientId}/check-ins`}>
              View Check-Ins
            </Link>
          </div>
        </div>

        <div className="card overviewCard">
          <div className="overviewTitle">Quick Actions</div>

          <div className="quickLinks">
            <Link className="quickLink" to={`/coach/clients/${clientId}/training/edit`}>
              Edit Training Plan →
            </Link>

            <Link className="quickLink" to={`/coach/clients/${clientId}/nutrition/edit`}>
              Edit Nutrition Plan →
            </Link>

            <Link className="quickLink" to={`/coach/check-ins`}>
              Open Check-Ins Inbox →
            </Link>
          </div>

          <div className="overviewHint">
            Tip: Review pending check-ins first, then adjust plans.
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoachClientOverviewTab;
