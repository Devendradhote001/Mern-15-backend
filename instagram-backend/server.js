require("dotenv").config();
const connectDb = require("./src/config/db");
const app = require("./src/app");

connectDb();

let port = process.env.PORT || 4000;


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
