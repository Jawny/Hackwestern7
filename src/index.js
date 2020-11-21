require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const MessagingResponse = require("twilio/lib/twiml/MessagingResponse");
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);
const routes = require("./routes/index");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes.BasicGet);
app.use(routes.BasicPost);
app.use(routes.BasicPut);
app.use(routes.BasicDelete);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
