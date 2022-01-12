var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

var studentMongo = {
  getAll: async function () {
    var db = await mongoClient.connect(url);
    dbo = db.db("mydb");
    let arr = await dbo.collection("Students").find().toArray();
    db.close();
    return arr;
  },

  findByID: async function (idNum) {
    var db = await mongoClient.connect(url);
    dbo = db.db("mydb");
    var query = { id: Number(idNum) };
    let obj = await dbo.collection("Students").find(query).toArray();
    db.close();
    return obj;
  },

  addStudent: async function (student) {
    var db = await mongoClient.connect(url);
    dbo = db.db("mydb");
    await dbo.collection("Students").insertOne(student);
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
    await dbo.collection("Students").updateOne(query, newValues);
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


module.exports = studentMongo;
