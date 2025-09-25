// models/Parfum.js
const mongoose = require("mongoose");

const parfumSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    marque: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    notes: {
      type: [String], // ex: ["boisé", "floral", "vanillé"]
    },
    prix: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // relation avec User
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parfum", parfumSchema);
