import React, { useState } from "react";
import { Navigate, Outlet, RouteProps } from "react-router";
import { Route, useNavigate, Routes } from "react-router-dom";
import { useSelector, TypedUseSelectorHook, RootStateOrAny } from "react-redux";
// interface Props extends RouteProps {
//   isAuth: boolean;
//   component: React.FC;
// }

function useAuth() {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
}
function CheckAdmin() {
  if (localStorage.getItem("admin")) {
    return true;
  } else return false;
}
function PrivateRoute({ children }: any) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }: any) {
  const isAdmin = CheckAdmin();
  return isAdmin ? children : <Navigate to="/admin/login" />;
}
// export default function ProtectedRoutes({ isAuth, ...routeProps }: Props) {
//     if (isAuth) return <Route {...routeProps} />;
//     return <Navigate to={"/login"} />;
//   }

// export default function ProtectedRoutes({
//   component: Component,
//   roles,
//   ...rest
// }: any) {
//   const navigate = useNavigate();

//   return (
//     <Route
//       {...rest}
//       render={(props: any) => {
//         if (localStorage.getItem("token")) {
//           return (
//             <Routes>
//               <Route {...props} element={<Component />} />
//             </Routes>
//           );
//         }
//         // return <Component {...props} />;
//         else {
//           <Routes>
//             <Route path="/login" />
//           </Routes>;
//         }
//         // else
//         // <Redirect
//         //   to={{ path: "/login", state: { from: props.location } }}
//         // />
//       }}
//     />
//   );
// }
export { PrivateRoute, useAuth, AdminRoute };
