const mongoose = require("mongoose");

// Creating a schema for the URL
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Creating a model
const Url = mongoose.model("Url", urlSchema);

// Exporting the model
module.exports = Url;
