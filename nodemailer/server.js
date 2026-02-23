const express = require("express");
const sendMail = require("./services/mail.service");
const successOrder = require("./utils/emailTemplate");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());

// body parser
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.render("index");
});

app.post("/send", async (req, res) => {
  let { email, subject, body } = req.body;

  let template = successOrder("Devank");

  await sendMail(email, subject, template);

  return res.send("ok mail chla gya");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
