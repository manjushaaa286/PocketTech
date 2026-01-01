import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(){
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("pt_logged_in");
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
}
