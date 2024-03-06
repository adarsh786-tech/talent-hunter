// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  projectName: string;
  projectDescription: string;
  projectURL: string;
  projectStack: string;
}

const projectSchema: Schema = new Schema({
  projectName: {
    type: String,
    required: [true, "Please provide a project name"],
    unique: true,
  },
  projectDescription: {
    type: String,
    required: [true, "Please provide a project description"],
    unique: true,
  },
  projectURL: {
    type: String,
    required: [true, "Please provide a valid project url"],
    unique: true,
  },
  projectStack: {
    type: String,
    required: [true, "Please provide tech stacks separated by ,"],
  },
});
const Projects =
  mongoose.models.projects || mongoose.model("projects", projectSchema);
export default Projects;
