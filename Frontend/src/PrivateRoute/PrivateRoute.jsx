import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { Login } from "../components/common/Login";

const useAuth = () => {
  const [authState, setAuthState] = useState({ isLoggedin: false, role: "" });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("user");
    if (id) {
      setAuthState({ isLoggedin: true, role: role });
    }
    setIsLoading(false);
  }, []);
  return { ...authState, isLoading };
};

const PrivateRoutes = () => {
  const auth = useAuth();
  if (auth.isLoading) {
    return <h1>Loading.........</h1>;
  }
  return auth.isLoggedin ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login"></Navigate>
  );
};
export default PrivateRoutes;
