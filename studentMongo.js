var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

var studentMongo = {
  getAll: async function () {
    var db = await mongoClient.connect(url);
    dbo = db.db("mydb");
    let arr = await dbo.collection("Students").find().toArray();
    console.log("Arr" + arr);
    db.close();
    return arr;
  },

  findByID: async function (idNum) {
    var db = await mongoClient.connect(url);
    dbo = db.db("mydb");
    var query = { id: Number(idNum) };
    console.log(query);
    let obj = await dbo.collection("Students").find(query).toArray();
    db.close();
    console.log("OBJ by id: " + idNum + " " + obj);
    return obj;
  },

  addStudent: async function (student) {
    var db = await mongoClient.connect(url);
    dbo = db.db("mydb");
    console.log(student);
    await dbo.collection("Students").insertOne(student);
    console.log("Student " + student.fName + " inserted");
    db.close();
  },

  updateStudent: async function (newObj, idNum) {
    var db = await mongoClient.connect(url);
    dbo = db.db("mydb");
    var query = { id: Number(idNum) };
    var newValues = {
      $set: {
        fName: newObj.fName,
        lName: newObj.lName,
        phoneNumber: newObj.phoneNumber,
        email: newObj.email,
      },
    };
    console.log("newValues " + JSON.stringify(newValues));
    await dbo.collection("Students").updateOne(query, newValues);
    console.log("Student " + idNum + " updated");
    db.close();
  },

  deleteStudent: async function (idNum) {
    try {
      var db = await mongoClient.connect(url);
      dbo = db.db("mydb");
      var query = { id: Number(idNum) };
      let ret = await dbo.collection("Students").deleteOne(query);
      if (ret.deletedCount != 0) console.log("Student " + idNum + " deleted");
      else console.log("Student " + idNum + " Can not delete");

      db.close();
      return ret.deletedCount;
    } catch {
      console.log(e);
    }
  },
};

/*
var student = {
  studentList: [],

  updateStudent: function (obj, id) {
    let index = this.getIndexByID(id);
    console.log("obj=" + obj);
    if (index != -1) {
      this.studentList[index].fName = obj.fName;
      this.studentList[index].lName = obj.lName;
      this.studentList[index].phoneNumber = obj.phoneNumber;
      this.studentList[index].email = obj.email;
      return 0;
    } else return -1;
  },

  SearchList: function (obj) {
    for (let i = 0; i < this.studentList.length; i++) {
      if (this.studentList[i].id == obj.id) return i;
    }
    return -1;
  },

  addStudent: function (student) {
    if (this.SearchList(student) == -1) {
      this.studentList.push(student);
      return 0;
    } else return -1;
  },

  deleteStudent: function (id) {
    for (let i = 0; i < this.studentList.length; i++) {
      if (this.studentList[i].id == id) {
        this.studentList.splice(i, 1);
        return 0;
      }
    }
    return -1;
  },

  getIndexByID: function (id) {
    for (let i = 0; i < this.studentList.length; i++) {
      if (this.studentList[i].id == id) return i;
    }
    return -1;
  },

  getStudentByID: function (id) {
    for (let i = 0; i < this.studentList.length; i++) {
      if (this.studentList[i].id == id) return this.studentList[i];
    }
    return null;
  },
};
*/
module.exports = studentMongo;
