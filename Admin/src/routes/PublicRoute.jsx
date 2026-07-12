import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    switch (user?.role) {
      case "admin":
        return <Navigate to="/admin" replace />;

      case "owner":
        return <Navigate to="/owner" replace />;

      case "tenant":
        return <Navigate to="/tenant" replace />;

      case "staff":
        return <Navigate to="/staff" replace />;

      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default PublicRoute;
