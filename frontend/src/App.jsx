import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  Dashboard,
  PageNotFound,
  Profile,
  Welcome,
  Layout,
  Session,
  Settings,
  DisplaySessionDetails,
} from "./pages";
import { ProtectedRoute } from "./components";
import { useSelector } from "react-redux";
import AuthSuccess from "./pages/AuthSuccess";

const App = () => {
  const user = useSelector((state) => state.user);

  // console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user && user.isAuthenticated ? (
              <Navigate to="/profile" />
            ) : (
              <Welcome />
            )
          }
        />
        <Route
          path="/login"
          element={
            user && user.isAuthenticated ? (
              <Navigate to="/profile" />
            ) : (
              <Login />
            )
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/session" element={<Session />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/session/:sessionID"
              element={<DisplaySessionDetails />}
            />
          </Route>
        </Route>

        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
