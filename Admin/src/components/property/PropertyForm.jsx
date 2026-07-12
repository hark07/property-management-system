import { useState } from "react";
import { toast } from "react-toastify";

const PropertyForm = ({ initialData = {}, onSubmit, loading = false }) => {
  const [images, setImages] = useState([]);

  const [previewImages, setPreviewImages] = useState(initialData.images || []);

  const [formData, setFormData] = useState({
    title: initialData.title || "",

    type: initialData.type || "Apartment",

    description: initialData.description || "",

    address: initialData.address || "",

    city: initialData.city || "",

    state: initialData.state || "",

    country: initialData.country || "",

    pincode: initialData.pincode || "",

    rent: initialData.rent || "",

    bedrooms: initialData.bedrooms || 1,

    bathrooms: initialData.bathrooms || 1,

    area: initialData.area || "",

    status: initialData.status || "Available",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));

    setPreviewImages(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.address ||
      !formData.city ||
      !formData.rent
    ) {
      toast.error("Please fill required fields");

      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    images.forEach((image) => {
      data.append("images", image);
    });

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
bg-white
rounded-xl
shadow
p-6
space-y-6
"
    >
      <h2
        className="
text-2xl
font-bold
"
      >
        Property Information
      </h2>

      <div
        className="
grid
grid-cols-1
md:grid-cols-2
gap-5
"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Property Title"
          className="
border
rounded-lg
p-3
"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="
border
rounded-lg
p-3
"
        >
          <option>Apartment</option>

          <option>House</option>

          <option>Hostel</option>

          <option>Office</option>
        </select>
      </div>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows="4"
        className="
w-full
border
rounded-lg
p-3
"
      />

      <h2
        className="
text-2xl
font-bold
"
      >
        Location Information
      </h2>

      <div
        className="
grid
grid-cols-1
md:grid-cols-2
gap-5
"
      >
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="
border
rounded-lg
p-3
"
        />

        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="
border
rounded-lg
p-3
"
        />

        <input
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          className="
border
rounded-lg
p-3
"
        />

        <input
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          className="
border
rounded-lg
p-3
"
        />

        <input
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className="
border
rounded-lg
p-3
"
        />
      </div>

      <h2
        className="
text-2xl
font-bold
"
      >
        Property Details
      </h2>

      <div
        className="
grid
grid-cols-1
md:grid-cols-2
gap-5
"
      >
        <input
          type="number"
          name="rent"
          value={formData.rent}
          onChange={handleChange}
          placeholder="Monthly Rent"
          className="
border
rounded-lg
p-3
"
        />

        <input
          type="number"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          placeholder="Bedrooms"
          className="
border
rounded-lg
p-3
"
        />

        <input
          type="number"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          placeholder="Bathrooms"
          className="
border
rounded-lg
p-3
"
        />

        <input
          type="number"
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Area"
          className="
border
rounded-lg
p-3
"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="
border
rounded-lg
p-3
"
        >
          <option>Available</option>

          <option>Occupied</option>

          <option>Maintenance</option>
        </select>
      </div>

      <h2
        className="
text-2xl
font-bold
"
      >
        Images
      </h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="
border
rounded-lg
p-3
w-full
"
      />

      {previewImages.length > 0 && (
        <div
          className="
grid
grid-cols-2
md:grid-cols-4
gap-4
"
        >
          {previewImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="preview"
              className="
h-32
w-full
object-cover
rounded-lg
"
            />
          ))}
        </div>
      )}

      <button
        disabled={loading}
        className="
bg-blue-600
hover:bg-blue-700
text-white
px-6
py-3
rounded-lg
font-semibold
"
      >
        {loading ? "Saving..." : "Save Property"}
      </button>
    </form>
  );
};

export default PropertyForm;
