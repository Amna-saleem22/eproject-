import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },
    // role: {
    //   type: String,
    //   enum: ["guest", "staff", "admin"],
    //   default: "guest"
    // }
    
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
