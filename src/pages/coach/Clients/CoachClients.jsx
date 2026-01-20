import { useMemo } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import mockClients from "../../../data/mockClients";
import ClientsTable from "../../../components/coach/ClientsTable/ClientsTable";

function CoachClients() {
  const rows = useMemo(() => {
    return [...mockClients].sort((a, b) => a.name.localeCompare(b.name));
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
