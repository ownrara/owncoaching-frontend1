import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout/ClientLayout";
import ClientDashboard from "../pages/client/Dashboard/ClientDashboard";
import TrainingPlan from "../pages/client/TrainingPlan/TrainingPlan";
import NutritionPlan from "../pages/client/NutritionPlan/NutritionPlan";
import WeeklyCheckIn from "../pages/client/WeeklyCheckIn/WeeklyCheckIn";
import ProgressHistory from "../pages/client/ProgressHistory/ProgressHistory";
import ClientProfile from "../pages/client/ClientProfile/ClientProfile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/client/dashboard" replace />} />

        {/* Client routes */}
        <Route path="/client" element={<ClientLayout />}>
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="training-plan" element={<TrainingPlan />} />
          <Route path="nutrition-plan" element={<NutritionPlan />} />
          <Route path="weekly-check-in" element={<WeeklyCheckIn />} />
          <Route path="progress-history" element={<ProgressHistory />} />
          <Route path="profile" element={<ClientProfile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/client/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
