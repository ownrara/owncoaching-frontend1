import { NavLink } from "react-router-dom";
import "./CoachSidebar.css";

function CoachSidebar() {
  const linkClass = ({ isActive }) =>
    isActive ? "coachNavLink isActive" : "coachNavLink";

  return (
    <aside className="coachSidebar">
      <div className="coachBrand">
        <div className="coachBrandTitle">OwnCoaching</div>
        <div className="coachBrandSub">Coach Portal</div>
      </div>

      <nav className="coachNav">
        <NavLink to="/coach/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/coach/clients" className={linkClass}>
          Clients
        </NavLink>
        <NavLink to="/coach/check-ins" className={linkClass}>
          Check-Ins
        </NavLink>
      </nav>

      <div className="coachSidebarFooter">© OwnCoaching</div>
    </aside>
  );
}

export default CoachSidebar;
