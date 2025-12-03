import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
