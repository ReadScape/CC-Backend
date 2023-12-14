const express = require("express");
const MySQLEvents = require("@rodrigogs/mysql-events");
const axios = require('axios');
const mysql = require('mysql');
const config = require("./config");
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
const userTagDataRouter = require("./routes/userTagData");
const interDataRouter = require("./routes/interData");
const calcPostPopRouter = require("./routes/calcPostPopularity");
const searchRouter = require("./routes/search");
const plagarismRouter = require("./routes/plagarism");
const detailsRouter = require("./routes/details");
const finalsRouter = require("./routes/finals");
const bodyParser = require('body-parser');

//The import thingy
const { exec } = require('child_process');

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
const program = async () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'gustira1708',
      });    const instance = new MySQLEvents(connection, {
      startAtEnd: true,
      excludedSchemas: {
        mysql: true,
      },
    });
  
    await instance.start();
  
    instance.addTrigger({
      name: 'TEST',
      expression: '*',
      statement: MySQLEvents.STATEMENTS.ALL,
      onEvent: (event) => { // You will receive the events here

        if (event.table === 'chapters' && event.type === 'INSERT') {
            console.log('INSERT event:', event.affectedColumns);
            const apiUrl = 'https://readscape.live/pdftodatabase';
            axios.post(apiUrl)
            .then(response => {
                console.log('Response: ', response.data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            })
          }
        }
   });

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
  };
  
  program()
    .then(() => console.log('Waiting for database events...'))
    .catch(console.error);
app.get("/pm2test",(req, res) => {;
    res.json({ message: "this is to test pm2 restart it should change again and retest"})
});

// =====================================Phyton Code======================================= //

function continuouslyRunningFunction() {
    const pythonProcess = exec('python3 services/calculateRating.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing the calculateRating: ${error}`);
            return;
        }
        console.log(`Python script output:\n${stdout}`);
    });
    
}

setInterval(continuouslyRunningFunction, 900000); // change after its all done

// ====================================================================================== //

app.use("/rating", ratingRouter);
app.use("/fiction", fanfictRouter);
app.use("/chapters", chaptersRouter);
app.use("/fiction_ratings", fictionRatingRouter);
app.use("/pdftodatabase", pdfToDatabaseRouter);
app.use("/users", usersRouter);
app.use("/calculatedrating",calculatedRatingRouter);
app.use("/post_data",postDataRouter);
app.use("/userTagData",userTagDataRouter);
app.use("/interData", interDataRouter);
app.use("/calcPostPopularity", calcPostPopRouter);
app.use("/search", searchRouter);
app.use("/simcheck", plagarismRouter);
app.use("/simdetails", detailsRouter);
app.use("/simfinals", finalsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});


app.listen(port, () => {
    console.log(`Example API running on https://readscape.live`);
});


