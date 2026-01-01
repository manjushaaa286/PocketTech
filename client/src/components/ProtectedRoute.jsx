import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }){
  const loggedIn = sessionStorage.getItem("pt_logged_in") === "true";
  return loggedIn ? children : <Navigate to="/login" replace />;
}
