import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import StatsGrid from "../../components/dashboard/StatsGrid";

import RecentMaintenance from "../../components/dashboard/RecentMaintenance";

import RecentBookings from "../../components/dashboard/RecentBookings";

import { getAdminDashboard } from "../../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,

    properties: 0,

    tenants: 0,

    maintenances: 0,

    amenities: 0,

    bookings: 0,

    pendingMaintenance: 0,

    completedMaintenance: 0,

    pendingBookings: 0,

    approvedBookings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getAdminDashboard();

      console.log("Dashboard Response:", response);

      setStats({
        users: response?.dashboard?.users || 0,

        properties: response?.dashboard?.properties || 0,

        tenants: response?.dashboard?.tenants || 0,

        maintenances: response?.dashboard?.maintenances || 0,

        amenities: response?.dashboard?.amenities || 0,

        bookings: response?.dashboard?.bookings || 0,

        pendingMaintenance: response?.dashboard?.pendingMaintenance || 0,

        completedMaintenance: response?.dashboard?.completedMaintenance || 0,

        pendingBookings: response?.dashboard?.pendingBookings || 0,

        approvedBookings: response?.dashboard?.approvedBookings || 0,
      });
    } catch (error) {
      console.log(error);

      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div
          className="
            bg-white
            p-6
            rounded-xl
            shadow
            text-center
          "
        >
          Loading...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Admin Dashboard
      </h1>

      <StatsGrid stats={stats} />

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
          mt-8
        "
      >
        <RecentMaintenance count={stats.pendingMaintenance} />

        <RecentBookings count={stats.pendingBookings} />
      </div>
    </Layout>
  );
};

export default Dashboard;
