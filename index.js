const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const sacco = require("./db/modal");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public", { extensions: ["html", "htm"] }));

//db
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      throw error;
    } else {
      console.log("Connected to Db....");
    }
  }
);
//db

app.get("/api/sacco-id/:name", async (req, res) => {
  function _c(l) {
    let rc = "1927384560abcdefghijklmnopqrstuvwxyz";
    let r = "";
    for (let i = 0; i < l; i++) {
      r += rc.charAt(Math.floor(Math.random() * rc.length));
    }
    return r;
  }
  let id = `${req.params.name}-${_c(3)}`;
  //db stuff
  const saccoExists = await sacco.findOne({ saccoId: id });
  //db stuff
  if (saccoExists) {
    return res.status(200).send("Retype Name....");
  } else {
    res.status(200).send(id);
  }
});

app.post("/new-sacco", async (req, res) => {
  let members = {};
  for (let i = 1; i <= parseInt(req.body.members_number); i++) {
    members[`member_${i}`] = {
      memberId: req.body[`member_number_${i}`],
      memberName: req.body[`member_name_${i}`],
      memberEmail: req.body[`member_email_${i}`],
      memberPhone: req.body[`member_phone_${i}`],
      confirmed: false,
    };
  }
  let newSacco = {
    saccoName: req.body.sacco_name,
    saccoId: req.body.sacco_id,
    numberOfMembers: parseInt(req.body.members_number),
    minSaving: parseInt(req.body.min_saving),
    meetingDay: req.body.meeting_day,
    meetingTime: {
      start: req.body.s_meeting_time,
      end: req.body.e_meeting_time,
    },
    period: req.body.s_period,
    saccoMembers: members,
  };
  const new_sacco = new sacco(newSacco);
  try {
    const dbSacco = await new_sacco.save();
    res.send(dbSacco);
  } catch (error) {
    res.send("An error occured");
  }
});
app.listen(PORT, () => {
  console.log(`Server Started on port: ${PORT}`);
});
