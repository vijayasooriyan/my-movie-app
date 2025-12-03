import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./auth/ProtectedRoute";
import Home from "./Pages/Home";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
