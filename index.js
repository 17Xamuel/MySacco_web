const express = require("express");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.static("public", { extensions: ["html", "htm"] }));

app.listen(PORT, () => {
  console.log(`Server Started on port: ${PORT}`);
});
