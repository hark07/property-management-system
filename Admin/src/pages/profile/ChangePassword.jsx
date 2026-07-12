import { useState } from "react";
import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";
import ChangePasswordForm from "../../components/profile/ChangePasswordForm";

import { changePassword } from "../../services/profileService";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const response = await changePassword(formData);

      toast.success(response.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Change Password
      </h1>

      <div
        className="
          max-w-2xl
          mx-auto
        "
      >
        <ChangePasswordForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </Layout>
  );
};

export default ChangePassword;
