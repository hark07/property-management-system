import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { updateAvatar } from "../../services/profileService";

const AvatarUpload = ({ user, onAvatarChange }) => {
  const fileRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const uploadImage = async (file) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      await updateAvatar(data.secure_url);

      toast.success("Profile photo updated.");

      if (onAvatarChange) {
        onAvatarChange(data.secure_url);
      }
    } catch (error) {
      toast.error("Image upload failed.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    uploadImage(file);
  };

  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow
        p-6
        text-center
      "
    >
      <img
        src={
          user?.avatar
            ? user.avatar
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.name || "User",
              )}&background=2563eb&color=ffffff&size=256`
        }
        alt="Profile"
        className="
          w-32
          h-32
          rounded-full
          object-cover
          mx-auto
          border-4
          border-blue-600
        "
      />

      <button
        type="button"
        onClick={() => fileRef.current.click()}
        disabled={loading}
        className="
          mt-5
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-2
          rounded-lg
        "
      >
        {loading ? "Uploading..." : "Change Photo"}
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFile}
      />
    </div>
  );
};

export default AvatarUpload;
