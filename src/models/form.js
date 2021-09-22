const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataPost = new Schema(
  {
    nim: {
      type: Number,
      required: true,
    },
    nama_depan: {
      type: String,
      required: true,
    },
    nama_belakang: {
      type: String,
      required: true,
    },
    email_1: {
      type: String,
      required: true,
    },
    email_2: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    jenis_email: {
      type: String,
      required: true,
    },
    no_hp: {
      type: String,
      required: true,
    },
    setuju: {
      type: Boolean,
      required: false,
    },
    pesan: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("DataPost", DataPost);
