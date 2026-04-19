import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useDemoData } from "../contexts/DemoDataContext";

/**
 * ProtectedRoute — Guards authenticated routes
 * 
 * When demo mode is ON, allows access without authentication
 * so the full app can be explored with sample data.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { demoMode } = useDemoData();

  // Allow access if authenticated OR if demo mode is enabled
  if (!isAuthenticated && !demoMode) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
