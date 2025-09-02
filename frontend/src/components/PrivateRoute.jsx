import { Navigate } from "react-router-dom";

function PrivateRoute({ children, role, user }) {
  // For now we fake user role (later link with backend/auth)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
