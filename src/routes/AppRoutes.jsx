import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ========== CLIENT ========== */
import ClientLayout from "../layouts/ClientLayout/ClientLayout";
import ClientDashboard from "../pages/client/Dashboard/ClientDashboard";
import TrainingPlan from "../pages/client/TrainingPlan/TrainingPlan";
import NutritionPlan from "../pages/client/NutritionPlan/NutritionPlan";
import WeeklyCheckIn from "../pages/client/WeeklyCheckIn/WeeklyCheckIn";
import ProgressHistory from "../pages/client/ProgressHistory/ProgressHistory";
import ClientProfile from "../pages/client/ClientProfile/ClientProfile";

/* ========== COACH ========== */
import CoachLayout from "../layouts/CoachLayout/CoachLayout";
import CoachDashboard from "../pages/coach/Dashboard/CoachDashboard";
import CoachClients from "../pages/coach/Clients/CoachClients";

import CoachClientDetails from "../pages/coach/Clients/CoachClientDetails";
import CoachClientOverviewTab from "../pages/coach/Clients/tabs/CoachClientOverviewTab";
import CoachClientProgressTab from "../pages/coach/Clients/tabs/CoachClientProgressTab";
import CoachClientCheckInsTab from "../pages/coach/Clients/tabs/CoachClientCheckInsTab";
import CoachClientTrainingTab from "../pages/coach/Clients/tabs/CoachClientTrainingTab";
import CoachClientNutritionTab from "../pages/coach/Clients/tabs/CoachClientNutritionTab";

import CoachCheckInsInbox from "../pages/coach/CheckIns/CoachCheckInsInbox";
import CoachCheckInDetails from "../pages/coach/CheckIns/CoachCheckInDetails";

import CoachClientTrainingEdit from "../pages/coach/Clients/edit/CoachClientTrainingEdit";
import CoachClientNutritionEdit from "../pages/coach/Clients/edit/CoachClientNutritionEdit";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROOT */}
        <Route path="/" element={<Navigate to="/client/dashboard" replace />} />

        {/* ================= CLIENT ROUTES ================= */}
        <Route path="/client" element={<ClientLayout />}>
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="training-plan" element={<TrainingPlan />} />
          <Route path="nutrition-plan" element={<NutritionPlan />} />
          <Route path="weekly-check-in" element={<WeeklyCheckIn />} />
          <Route path="progress-history" element={<ProgressHistory />} />
          <Route path="profile" element={<ClientProfile />} />
        </Route>

        {/* ================= COACH ROUTES ================= */}
        <Route path="/coach" element={<CoachLayout />}>
          <Route path="dashboard" element={<CoachDashboard />} />
          <Route path="clients" element={<CoachClients />} />

          {/* Edit Training (keep it OUTSIDE tabs nesting to avoid path confusion) */}
          <Route
            path="clients/:clientId/training/edit"
            element={<CoachClientTrainingEdit />}
          />
          {/* Edit Nutrition (keep it OUTSIDE tabs nesting to avoid path confusion) */}
          <Route
            path="clients/:clientId/nutrition/edit"
            element={<CoachClientNutritionEdit />}
          />

          {/* CLIENT DETAILS (nested tabs) */}
          <Route path="clients/:clientId" element={<CoachClientDetails />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<CoachClientOverviewTab />} />
            <Route path="progress" element={<CoachClientProgressTab />} />
            <Route path="check-ins" element={<CoachClientCheckInsTab />} />
            <Route path="training" element={<CoachClientTrainingTab />} />
            <Route path="nutrition" element={<CoachClientNutritionTab />} />
          </Route>

          {/* CHECK-INS */}
          <Route path="check-ins" element={<CoachCheckInsInbox />} />
          <Route path="check-ins/:checkInId" element={<CoachCheckInDetails />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/client/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
