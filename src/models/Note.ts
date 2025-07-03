import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: String, default: new Date().toISOString() },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const NoteModel = mongoose.model("Note", noteSchema);