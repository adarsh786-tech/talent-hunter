// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUserProject extends Document {
  userId: mongoose.Schema.Types.ObjectId; // Reference to UserAuth model
  projects: mongoose.Schema.Types.ObjectId[]; // Array of project IDs
}

const userProjectSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User ID is required"],
    ref: "UserAuth", // Reference the UserAuth model
  },
  projects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Project", // Reference the Project model (if applicable)
  },
});

const UserProject =
  mongoose.models.projusers || mongoose.model("projusers", userProjectSchema);
export default UserProject;
