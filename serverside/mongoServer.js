var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
var studentMongo = require("./studentMongo.js");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/student", async function (req, res) {
  try {
    var list = await studentMongo.getAll();
    res.json(list);
  } catch (e) {
    res.status(404).send("Error getting student list.");
  }
});

app.get("/student/:id", async function (req, res) {
  try {
    let student = await studentMongo.findByID(req.params.id);
    if (student == null) {
      res.status(404).send("Student does not exist");
    } else res.json(student);
  } catch (e) {
    res.status(404).send("Error getting student by ID.");
  }
});

app.post("/student", async (req, res) => {
  try {
    let student = req.body;
    await studentMongo.addStudent(student);
    res.status(200).send("Student added");
  } catch (e) {
    res.status(404).send("Error adding student");
  }
});

app.delete("/student/:id", async (req, res) => {
  try {
    let ret = await studentMongo.deleteStudent(req.params.id);
    if (ret != 0) res.status(200).send("Student deleted");
    else res.status(404).send("Student deletion failed");
  } catch (e) {
    res.status(404).send("Error getting deleted by ID.");
  }
});

app.put("/student/:id", async (req, res) => {
  try {
    let student = req.body;
    let id = req.params.id;
    await studentMongo.updateStudent(student, id);
    res.status(200).send("Student updated sucessfully");
  } catch (e) {
    res.status(404).send("Error updating student");
  }

var server = app.listen(5500, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
