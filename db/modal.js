const mongoose = require("mongoose");

const saccoSchema = new mongoose.Schema({
  saccoName: {
    type: String,
  },
  saccoId: String,
  numberOfMembers: Number,
  minSaving: Number,
  meetingDay: String,
  meetingTime: Object,
  saccoPeriod: Number,
  saccoMembers: Object,
});

module.exports = mongoose.model("Sacco", saccoSchema);
