const express = require("express");
const app = express();
const port = 3000;
const ratingRouter = require("./routes/bookrating");

app.use(express.json());


app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "ok"});
});

app.use("/rating", ratingRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
    console.log(`Example API running on http://localhost:${port}`);
});


