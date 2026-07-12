import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import AdminDashboard from "../pages/admin/Dashboard";
import OwnerDashboard from "../pages/owner/Dashboard";
import TenantDashboard from "../pages/dashboard/Dashboard";
import StaffDashboard from "../pages/staff/Dashboard";

import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import PropertyList from "../pages/property/PropertyList";
import AddProperty from "../pages/property/AddProperty";
import EditProperty from "../pages/property/EditProperty";
import PropertyDetails from "../pages/property/PropertyDetails";

import TenantList from "../pages/tenant/TenantList";
import AddTenant from "../pages/tenant/AddTenant";
import EditTenant from "../pages/tenant/EditTenant";
import TenantDetails from "../pages/tenant/TenantDetails";

import MaintenanceList from "../pages/maintenance/MaintenanceList";
import AddMaintenance from "../pages/maintenance/AddMaintenance";
import EditMaintenance from "../pages/maintenance/EditMaintenance";
import MaintenanceDetails from "../pages/maintenance/MaintenanceDetails";

import BookingList from "../pages/booking/BookingList";
import AddBooking from "../pages/booking/AddBooking";
import EditBooking from "../pages/booking/EditBooking";
import BookingDetails from "../pages/booking/BookingDetails";

import AmenityList from "../pages/amenity/AmenityList";
import AddAmenity from "../pages/amenity/AddAmenity";
import EditAmenity from "../pages/amenity/EditAmenity";
import AmenityDetails from "../pages/amenity/AmenityDetails";

import Profile from "../pages/profile/Profile";
import Notifications from "../pages/notification/Notifications";
import ChangePassword from "../pages/profile/ChangePassword";
import AdminUsers from "../pages/admin/AdminUsers";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}

      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Dashboard Routes */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner"
        element={
          <ProtectedRoute roles={["owner"]}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tenant"
        element={
          <ProtectedRoute roles={["tenant"]}>
            <TenantDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/staff"
        element={
          <ProtectedRoute roles={["staff"]}>
            <StaffDashboard />
          </ProtectedRoute>
        }
      />

      {/* Property Routes */}

      <Route
        path="/properties"
        element={
          <ProtectedRoute roles={["admin", "owner"]}>
            <PropertyList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/properties/add"
        element={
          <ProtectedRoute roles={["admin", "owner"]}>
            <AddProperty />
          </ProtectedRoute>
        }
      />

      <Route
        path="/properties/edit/:id"
        element={
          <ProtectedRoute roles={["admin", "owner"]}>
            <EditProperty />
          </ProtectedRoute>
        }
      />

      <Route
        path="/properties/:id"
        element={
          <ProtectedRoute roles={["admin", "owner", "tenant"]}>
            <PropertyDetails />
          </ProtectedRoute>
        }
      />

      {/* Tenant Routes */}

      <Route
        path="/tenants"
        element={
          <ProtectedRoute roles={["admin", "owner"]}>
            <TenantList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tenants/add"
        element={
          <ProtectedRoute roles={["admin", "owner"]}>
            <AddTenant />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tenants/edit/:id"
        element={
          <ProtectedRoute roles={["admin", "owner"]}>
            <EditTenant />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tenants/:id"
        element={
          <ProtectedRoute roles={["admin", "owner", "tenant"]}>
            <TenantDetails />
          </ProtectedRoute>
        }
      />

      {/* Maintenance Routes */}

      <Route
        path="/maintenance"
        element={
          <ProtectedRoute roles={["admin", "owner", "tenant", "staff"]}>
            <MaintenanceList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/maintenance/add"
        element={
          <ProtectedRoute roles={["admin", "owner", "tenant"]}>
            <AddMaintenance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/maintenance/edit/:id"
        element={
          <ProtectedRoute roles={["admin", "owner", "staff"]}>
            <EditMaintenance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/maintenance/:id"
        element={
          <ProtectedRoute roles={["admin", "owner", "tenant", "staff"]}>
            <MaintenanceDetails />
          </ProtectedRoute>
        }
      />

      {/* Booking Routes */}

      <Route
        path="/bookings"
        element={
          <ProtectedRoute roles={["admin", "owner", "tenant", "staff"]}>
            <BookingList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookings/add"
        element={
          <ProtectedRoute roles={["admin", "owner", "tenant"]}>
            <AddBooking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookings/edit/:id"
        element={
          <ProtectedRoute roles={["admin", "owner", "tenant"]}>
            <EditBooking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookings/:id"
        element={
          <ProtectedRoute roles={["admin", "owner", "tenant", "staff"]}>
            <BookingDetails />
          </ProtectedRoute>
        }
      />

      {/* Amenity Routes */}

      <Route
        path="/amenities"
        element={
          <ProtectedRoute roles={["admin", "owner", "staff"]}>
            <AmenityList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/amenities/add"
        element={
          <ProtectedRoute roles={["admin", "owner"]}>
            <AddAmenity />
          </ProtectedRoute>
        }
      />

      <Route
        path="/amenities/edit/:id"
        element={
          <ProtectedRoute roles={["admin", "owner"]}>
            <EditAmenity />
          </ProtectedRoute>
        }
      />

      <Route
        path="/amenities/:id"
        element={
          <ProtectedRoute roles={["admin", "owner", "tenant", "staff"]}>
            <AmenityDetails />
          </ProtectedRoute>
        }
      />

      {/* Profile */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute roles={["admin", "owner", "tenant", "staff"]}>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Notifications */}

      <Route
        path="/notifications"
        element={
          <ProtectedRoute roles={["admin", "owner", "tenant", "staff"]}>
            <Notifications />
          </ProtectedRoute>
        }
      />

      {/* Change Password */}

      <Route
        path="/change-password"
        element={
          <ProtectedRoute roles={["admin", "owner", "tenant", "staff"]}>
            <ChangePassword />
          </ProtectedRoute>
        }
      />

      {/* Admin Users */}

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      {/* 404 */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
