import { useMemo } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import mockCheckIns from "../../../data/mockCheckIns";
import mockClients from "../../../data/mockClients";
import CheckInsTable from "../../../components/coach/CheckInsTable/CheckInsTable";

function CoachDashboard() {
  const pendingRows = useMemo(() => {
    const pending = mockCheckIns.filter((c) => c.status === "Pending");

    return pending.map((c) => {
      const client = mockClients.find((x) => x.id === c.clientId);
      return {
        id: c.id,
        clientName: client?.name || c.clientId,
        date: c.date,
        status: c.status,
      };
    });
  }, []);

  return (
    <div>
      <PageHeader
        breadcrumb="Coach / Dashboard"
        title="Coach Dashboard"
        subtitle="Priorities for today"
      />

      <div className="section">
        <CheckInsTable rows={pendingRows} />
      </div>
    </div>
  );
}

export default CoachDashboard;
