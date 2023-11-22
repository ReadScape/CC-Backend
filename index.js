const express = require("express");
const app = express();
const port = 3000;
const ratingRouter = require("./routes/bookrating");
const fanfictRouter = require("./routes/fanfict");
const chaptersRouter = require("./routes/chapters");
const fictionRatingRouter = require("./routes/fiction_rating");
const pdfToDatabaseRouter = require("./routes/pdfToDatabase");
const usersRouter = require("./routes/users");
const calculatedRatingRouter = require("./routes/calculate_fiction_rating");
const postDataRouter = require("./routes/post_data");
const bodyParser = require('body-parser');


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "ok"});
});
app.get("/pm2test",(req, res) => {;
    res.json({ message: "this is to test pm2 restart it should change again and retest"})
});

app.use("/rating", ratingRouter);
app.use("/fiction", fanfictRouter);
app.use("/chapters", chaptersRouter);
app.use("/fiction_ratings", fictionRatingRouter);
app.use("/pdftodatabase", pdfToDatabaseRouter);
app.use("/users", usersRouter);
app.use("/calculatedrating",calculatedRatingRouter);
app.use("/post_data",postDataRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});


app.listen(port, () => {
    console.log(`Example API running on http://readscape.live:${port}`);
});


