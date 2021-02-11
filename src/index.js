import cors from "cors";
import express from "express";
const fs = require("fs");

const PORT = 3000;

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  UserInfo(req);
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  UserInfo(req);
  res.send("Hello World! from test");
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

function UserInfo(req) {
  var ip = (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    ""
  )
    .split(",")[0]
    .trim();
  fs.writeFileSync(
    "reports",
    JSON.stringify({
      Date: new Date(),
      requestPath: req.originalUrl,
      ip,
    })
  );
}
