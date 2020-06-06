const mongoose = require("mongoose");

notificationSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types, ref: "Faculty", required: true
  },
  createdAt: {
    type: Date, default: Date.now()
  },
  content: {
    type: String, required: true
  },
  department: {
    type: String, required: true
  },
  isCollegeNotification: {
    type: Boolean, default: false,
  },
  storedDepartment: {
    type: String, required: true,
  },
  imageUrl: {
    type: String, required: true
  }
});
