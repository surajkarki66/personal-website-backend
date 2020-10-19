import mongoose from "mongoose";
const { Schema } = mongoose;

const constactSchema = new Schema({
  from: String,
  emailAddress: String,
  subjectLine: String,
  body: String,
  date: Date,
});

const contact = mongoose.model("contacts", constactSchema);
export default contact;
