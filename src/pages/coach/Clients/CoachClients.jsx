import { useMemo } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import mockClients from "../../../data/mockClients";
import ClientsTable from "../../../components/coach/ClientsTable/ClientsTable";
// console.log("CoachClients loaded");

function CoachClients() {
  const rows = useMemo(() => {
    // safe sort (won't crash if name is missing)
    return [...mockClients].sort((a, b) =>
      String(a.name || "").localeCompare(String(b.name || ""))
    );
  }, []);

  return (
    <div>
      <PageHeader
        breadcrumb="Coach / Clients"
        title="Clients"
        subtitle="View and manage your client list"
      />

      <div className="section">
        <ClientsTable rows={rows} />
      </div>
    </div>
  );
}

export default CoachClients;
