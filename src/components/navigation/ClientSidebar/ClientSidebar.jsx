import { NavLink } from "react-router-dom";
import "./ClientSidebar.css";

function ClientSidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebarBrand">OwnCoaching</div>

      <nav className="sidebarNav">
        <NavLink to="/client/dashboard" className="sidebarLink">
          Dashboard
        </NavLink>

        <NavLink to="/client/training-plan" className="sidebarLink">
          My Training Plan
        </NavLink>

        <NavLink to="/client/nutrition-plan" className="sidebarLink">
          My Nutrition Plan
        </NavLink>

        <NavLink to="/client/weekly-check-in" className="sidebarLink">
          Weekly Check-In
        </NavLink>

        <NavLink to="/client/progress-history" className="sidebarLink">
          Progress History
        </NavLink>

        <NavLink to="/client/profile" className="sidebarLink">
          Client Profile
        </NavLink>
      </nav>
    </aside>
  );
}

export default ClientSidebar;
