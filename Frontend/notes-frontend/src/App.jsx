import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotesDashboard from "./components/NotesDashBoard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/notes" : "/login"} replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/notes" : "/login"} replace />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
