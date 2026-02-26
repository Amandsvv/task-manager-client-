import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // still loading user
  if (user === undefined) {
    return <div className="p-6">Loading...</div>;
  }

  // not authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}