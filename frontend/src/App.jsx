import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";

// 3. Import Pages
import Home from "./pages/Home";
import ReportForm from "./components/ReportForm";
// Placeholder components for routes that aren't built yet
import MapView from "./components/MapView";
import IncidentDetail from "./pages/IncidentDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
const Dashboard = () => (
  <div className="p-20 text-white">Citizen Dashboard</div>
);
const AdminPanel = () => <div className="p-20 text-white">Admin Analytics</div>;

/**
 * PROTECTED ROUTE COMPONENT
 * Redirects to Login if no user is found.
 * Redirects to Home if the user doesn't have the required role.
 */
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   // Replace this with your actual AuthContext logic later
//   const user = { role: "citizen" }; // TEMPORARY: Hardcoded for testing
//   const loading = false;

//   if (loading)
//     return (
//       <div className="h-screen bg-black flex items-center justify-center text-red-600">
//         LOADING...
//       </div>
//     );

//   if (!user) return <Navigate to="/login" replace />;

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="h-screen bg-black flex items-center justify-center text-red-600">
        LOADING...
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default function App() {
  return (
    <Router>
      <Routes>
        {/* --- MAIN WRAPPER (Includes Navbar) --- */}
        <Route path="/" element={<Layout />}>
          {/* Public Landing Page */}
          <Route index element={<Home />} />
          <Route path="incidents/:id" element={<IncidentDetail />} />
          {/* Public Auth Pages */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* CITIZEN ROUTES */}
          <Route
            path="report"
            element={
              <ProtectedRoute allowedRoles={["citizen", "police", "admin"]}>
                <ReportForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={["citizen", "police", "admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* SHARED LIVE MAP */}
          <Route
            path="map"
            element={
              <ProtectedRoute allowedRoles={["citizen", "police", "admin"]}>
                <MapView />
              </ProtectedRoute>
            }
          />

          {/* ADMIN & POLICE ROUTES */}
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 404 CATCH-ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
