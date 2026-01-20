import { Outlet, useParams } from "react-router-dom";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import Tabs from "../../../components/common/Tabs/Tabs";
import mockClients from "../../../data/mockClients";

function CoachClientDetails() {
  const { clientId } = useParams();

  const client = mockClients.find((c) => String(c.id) === String(clientId));

  // If clientId is invalid (mock-only project), keep it safe
  if (!client) {
    return (
      <div>
        <PageHeader
          breadcrumb="Coach / Clients / Details"
          title="Client Details"
          subtitle={`Not found: ${clientId}`}
        />
        <div className="card" style={{ padding: 16 }}>
          This client does not exist in mock data.
        </div>
      </div>
    );
  }

  const tabs = [
    { label: "Overview", to: "overview" },
    { label: "Progress", to: "progress" },
    { label: "Check-Ins", to: "check-ins" },
    { label: "Training Plan", to: "training" },
    { label: "Nutrition Plan", to: "nutrition" },
  ];

  return (
    <div>
      <PageHeader
        breadcrumb="Coach / Clients / Details"
        title="Client Details"
        subtitle={`${client.name} (ID: ${client.id})`}
      />

      <Tabs items={tabs} />

      {/* Child tab content renders here */}
      <Outlet />
    </div>
  );
}

export default CoachClientDetails;
