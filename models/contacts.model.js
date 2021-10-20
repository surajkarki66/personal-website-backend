import mongoose from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema({
  from: String,
  emailAddress: String,
  subjectLine: String,
  body: String,
  date: Date,
});

const contact = mongoose.model("contacts", contactSchema);
export default contact;
