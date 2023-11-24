import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const ProtectedRoute = ({children}) => {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRoute;