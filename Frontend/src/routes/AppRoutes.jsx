import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Properties from "../pages/Properties";
import PropertyDetails from "../pages/PropertyDetails";
import Booking from "../pages/Booking";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Profile from "../pages/Profile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/properties" element={<Properties />} />

          <Route path="/properties/:id" element={<PropertyDetails />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/booking/:propertyId"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
