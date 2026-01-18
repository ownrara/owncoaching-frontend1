import { NavLink } from "react-router-dom";
import "./ClientSidebar.css";

function ClientSidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebarBrand">OwnCoaching</div>

      <nav className="sidebarNav">
        <NavLink
          to="/client/dashboard"
          className={({ isActive }) => (isActive ? "navItem active" : "navItem")}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/client/training-plan"
          className={({ isActive }) => (isActive ? "navItem active" : "navItem")}
        >
          Training Plan
        </NavLink>

        <NavLink
          to="/client/nutrition-plan"
          className={({ isActive }) => (isActive ? "navItem active" : "navItem")}
        >
          Nutrition Plan
        </NavLink>

        <NavLink
          to="/client/weekly-check-in"
          className={({ isActive }) => (isActive ? "navItem active" : "navItem")}
        >
          Weekly Check-In
        </NavLink>

        <NavLink
          to="/client/progress-history"
          className={({ isActive }) => (isActive ? "navItem active" : "navItem")}
        >
          Progress History
        </NavLink>

        <NavLink
          to="/client/profile"
          className={({ isActive }) => (isActive ? "navItem active" : "navItem")}
        >
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}

export default ClientSidebar;
