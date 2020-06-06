import { Schema, model } from "mongoose";

notificationSchema = new Schema({
  uid: {
    type: Schema.Types, ref: "Faculty", required: true
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

export default model('Notification', notificationSchema);
