import { useMemo } from "react";
import { useParams } from "react-router-dom";

import CheckInsTable from "../../../../components/coach/CheckInsTable/CheckInsTable";
import { getCheckIns } from "../../../../data/checkInsStore";
import mockClients from "../../../../data/mockClients";

function CoachClientCheckInsTab() {
  const { clientId } = useParams();

  const rows = useMemo(() => {
    const all = getCheckIns();

    const filtered = all
      .filter((c) => c.clientId === clientId)
      .sort((a, b) => (a.date < b.date ? 1 : -1));

    const client = mockClients.find((x) => x.id === clientId);

    return filtered.map((c) => ({
      id: c.id,
      clientName: client?.name || clientId,
      date: c.date,
      status: c.status || "Pending",
    }));
  }, [clientId]);

  return (
    <div className="section">
      <CheckInsTable
        rows={rows}
        title="Client Check-Ins"
        emptyText="No check-ins found for this client."
      />
    </div>
  );
}

export default CoachClientCheckInsTab;
