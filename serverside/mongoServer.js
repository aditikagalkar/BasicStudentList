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
    console.log("in server " + list);
    // if (list.length == 0) res.status(404).send("Empty Students List");
    //else
    res.json(list);
  } catch (e) {
    res.status(404).send("Error getting student list.");
  }
});

app.get("/student/:id", async function (req, res) {
  try {
    console.log("ID " + req.params.id);
    let student = await studentMongo.findByID(req.params.id);
    console.log(student);
    if (student == null) {
      res.status(404).send("Student does not exist");
    } else res.json(student);
  } catch (e) {
    console.log(e);
    res.status(404).send("Error getting student by ID.");
  }
});

app.post("/student", async (req, res) => {
  try {
    let student = req.body;
    //let st = JSON.parse(JSON.stringify(student));
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
    console.log("server student " + JSON.stringify(student));
    await studentMongo.updateStudent(student, id);
    res.status(200).send("Student updated sucessfully");
  } catch (e) {
    res.status(404).send("Error updating student");
  }
  /*let studentString = JSON.stringify(req.body);
  let student = JSON.parse(studentString);
  console.log(student);
  let id = req.params.id;
  let status = studentMod.updateStudent(student, id);
  if (status == -1) res.status(404).send("cannot update student");
  else res.send("student updated");*/
});

var server = app.listen(5500, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
