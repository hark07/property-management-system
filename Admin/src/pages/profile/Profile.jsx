import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";
import AvatarUpload from "../../components/profile/AvatarUpload";
import ProfileForm from "../../components/profile/ProfileForm";

import { getProfile, updateProfile } from "../../services/profileService";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setPageLoading(true);

      const data = await getProfile();

      setUser(data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load profile.");
    } finally {
      setPageLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      setLoading(true);

      const response = await updateProfile(formData);

      toast.success(response.message);

      setUser(response.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (avatar) => {
    setUser((prev) => ({
      ...prev,
      avatar,
    }));
  };

  if (pageLoading) {
    return (
      <Layout>
        <div className="bg-white rounded-xl shadow p-8 text-center">
          Loading profile...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <AvatarUpload user={user} onAvatarChange={handleAvatarChange} />

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Account Information</h2>

            <div className="space-y-3">
              <div>
                <p className="text-gray-500 text-sm">Full Name</p>

                <p className="font-semibold">{user?.name}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Email</p>

                <p className="font-semibold">{user?.email}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Phone</p>

                <p className="font-semibold">{user?.phone || "N/A"}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Address</p>

                <p className="font-semibold">{user?.address || "N/A"}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Role</p>

                <p className="font-semibold capitalize">{user?.role}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Account Status</p>

                <span
                  className={`px-3 py-1 rounded-full text-sm text-white ${
                    user?.isActive ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {user?.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Email Verified</p>

                <span
                  className={`px-3 py-1 rounded-full text-sm text-white ${
                    user?.isVerified ? "bg-green-600" : "bg-yellow-500"
                  }`}
                >
                  {user?.isVerified ? "Verified" : "Pending"}
                </span>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Member Since</p>

                <p className="font-semibold">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <ProfileForm user={user} onSubmit={handleUpdate} loading={loading} />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
