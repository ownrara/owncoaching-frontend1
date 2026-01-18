import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import StatCard from "../../../components/common/StatCard/StatCard";
import ActionCard from "../../../components/common/ActionCard/ActionCard";
import SectionCard from "../../../components/common/SectionCard/SectionCard";
import mockClientDashboard from "../../../data/mockClientDashboard";
import "./ClientDashboard.css";

function ClientDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        breadcrumb="Client / Dashboard"
        title="Dashboard"
        subtitle="Overview of your fitness journey"
      />

      {/* Overview cards */}
      <div className="section">
        <div className="dashboardGrid3">
          {mockClientDashboard.overview.map((item) => (
            <div key={item.id} className="card">
              <StatCard
                label={item.label}
                value={item.value}
                subtext={item.subtext}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="section">
        <h3 className="sectionTitle">Quick Actions</h3>

        <div className="dashboardGrid2">
          {mockClientDashboard.quickActions.map((action) => (
            <div key={action.id} className="card">
              <ActionCard
                label={action.label}
                description={action.description}
                to={action.to}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Recent check-in & coach update */}
      <div className="section">
        {/* SectionCard already looks like a card, so no extra .card wrapper */}
        <SectionCard
          title="Recent Check-In & Coach Update"
          rightText="View Progress History"
          onRightClick={() => navigate("/client/progress-history")}
        >
          <div className="recentRow">
            <div>
              <div className="recentDate">{mockClientDashboard.recent.date}</div>

              <ul className="recentStats">
                {mockClientDashboard.recent.stats.map((stat) => (
                  <li key={stat.label}>
                    <strong>{stat.label}:</strong> {stat.value}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="recentLabel">Coach Notes</div>
              <p className="recentText">{mockClientDashboard.recent.coachUpdate}</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export default ClientDashboard;
