import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/forgotpassoword";
import ResetPassword from "./pages/resetpassword";
import AdminLogin from "./pages/AdminLogin";
import Lis from "./pages/Book";
import Book from "./pages/ShowEachBook";
import Createbook from "./pages/createbook";
import { PrivateRoute, AdminRoute } from "./pages/AuthRoutes";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/reset-password/:userId/:token"
        element={<ResetPassword />}
      />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/exp" element={<Lis />} />
      <Route path="/book/:id" element={<Book />} />
      <Route
        path="/admin/create-book"
        element={
          <AdminRoute>
            <Createbook />
          </AdminRoute>
        }
      />
      {/* <Route
        path="/profile"
        element={
          <ProtectedRoutes
            isAuth={isAuth}
            path="/profile"
            component={Createbook}
          />
        }
      /> */}
      {/* <ProtectedRoutes isAuth={isAuth} path="/profile" component={Createbook} /> */}
      {/* <Route path="/admin/create-book" element={<CreateBook />} /> */}
      {/* <ProtectedRoutes path="/admin/create-book" component={Createbook} /> */}
    </Routes>
  );
}

export default App;
