import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Report from "./pages/Report";
import Products from "./pages/Products";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/products"
          element={
            // <ProtectedRoute>
              <Products />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            // <ProtectedRoute>
              <Report />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
