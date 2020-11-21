require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const MessagingResponse = require("twilio/lib/twiml/MessagingResponse");
/*
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);
*/
const routes = require("./routes/index");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", routes.BasicGet);
app.use("/api", routes.BasicPost);
app.use("/api", routes.BasicPut);
app.use("/api", routes.BasicDelete);
app.use("/api", routes.Balance);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
