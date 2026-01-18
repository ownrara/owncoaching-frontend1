import { Outlet } from "react-router-dom";
import ClientSidebar from "../../components/navigation/ClientSidebar/ClientSidebar";
import Topbar from "../../components/navigation/Topbar/Topbar";
import "./ClientLayout.css";

function ClientLayout() {
  return (
    <div className="clientLayout">
      <ClientSidebar />

      <div className="clientMain">
        <Topbar />
         <main className="clientContent page">
        <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ClientLayout;
