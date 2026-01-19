import PageHeader from "../../../components/common/PageHeader/PageHeader";

function CoachDashboard() {
  return (
    <div>
      <PageHeader
        breadcrumb="Coach / Dashboard"
        title="Coach Dashboard"
        subtitle="Review priorities and pending check-ins"
      />

      <div className="card" style={{ padding: 16 }}>
        This is a placeholder. Next branch will implement the dashboard content.
      </div>
    </div>
  );
}

export default CoachDashboard;
