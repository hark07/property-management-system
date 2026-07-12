import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    leaseStart: {
      type: Date,
      required: true,
    },

    leaseEnd: {
      type: Date,
      required: true,
    },

    monthlyRent: {
      type: Number,
      required: true,
    },

    securityDeposit: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Active", "Expired", "Terminated"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

const Tenant = mongoose.model("Tenant", tenantSchema);

export default Tenant;
