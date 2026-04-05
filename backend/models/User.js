// citizen, police, admin schema
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // never return password in queries by default
    },
    role: {
      type: String,
      enum: ["citizen", "police", "admin"],
      default: "citizen",
    },
    // Account status — police accounts start as "pending" until admin approves
    status: {
      type: String,
      enum: ["active", "pending", "suspended"],
      default: function () {
        return this.role === "police" ? "pending" : "active";
      },
    },
    // Police-specific fields
    badgeId: {
      type: String,
      default: null,
    },
    jurisdiction: {
      type: String,
      default: null, // e.g. "Taj Ganj, Agra"
    },
    // Push notification subscription object
    pushSubscription: {
      type: Object,
      default: null,
    },
    // Profile
    avatar: {
      type: String,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive fields from JSON output
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

export default mongoose.model("User", userSchema);
