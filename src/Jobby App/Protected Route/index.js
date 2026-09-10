import { Route, Navigate } from "react-router-dom";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  const jwtToken = Cookies.get("jwt_token");

  // console.log(jwtToken);
  if (jwtToken === undefined || jwtToken === null) {
    return <Navigate to="/jobbyApp-login" replace />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;

export const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};
