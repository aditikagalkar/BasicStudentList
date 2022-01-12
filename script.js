var xhttp_get = new XMLHttpRequest();
var xhttp_del = new XMLHttpRequest();
var xhttp_post = new XMLHttpRequest();
function loadStudentList() {
  xhttp_get.onreadystatechange = function () {
    if (xhttp_get.readyState == 4 && xhttp_get.status == 200) {
      let obj = JSON.parse(xhttp_get.responseText);
      document.getElementById("table").innerHTML = "";
      let table = document.getElementById("table");
      for (let index of obj) {
        var row = table.insertRow(row);
        row.className = "tableElm";
        let i = row.insertCell(0);
        i.innerHTML = index.id;
        i.className = "id";
        let fn = row.insertCell(1);
        fn.innerHTML = index.fName;
        fn.className = "fname";
        let ln = row.insertCell(2);
        ln.innerHTML = index.lName;
        ln.className = "lname";
        let p = row.insertCell(3);
        p.innerHTML = index.phoneNumber;
        p.className = "phone";
        let e = row.insertCell(4);
        e.innerHTML = index.email;
        e.className = "email";
        let upd = row.insertCell(5);
        btn = document.createElement("button");
        btn.className = "update";
        btn.innerHTML = "Update";
        upd.appendChild(btn);
        btn.addEventListener("click", function () {
          location.href = "/clientside/update.html?id=" + index.id;
        });
        let del = row.insertCell(6);
        btn1 = document.createElement("button");
        btn1.className = "delete";
        btn1.innerHTML = "Delete";
        del.appendChild(btn1);
        btn1.addEventListener("click", function () {
          deleteStudent(index.id);
        });
      }
    }
    if (xhttp_get.readyState == 4 && xhttp_get.status != 200) {
      document.getElementById("feedback").innerHTML = "Error while connecting";
    }
  };
  var url = "http://127.0.0.1:5500/student";
  xhttp_get.open("GET", url, true);
  xhttp_get.send();
}

function loadStudentByID() {
  xhttp_get.onreadystatechange = function () {
    if (xhttp_get.readyState == 4 && xhttp_get.status == 200) {
      document.getElementById("table").innerHTML = "";
      let obj = JSON.parse(xhttp_get.responseText);
      console.log(obj);
      console.log(obj[0].id);
      let table = document.getElementById("table");
      var row = table.insertRow(row);
      row.className = "tableElm";
      let i = row.insertCell(0);
      i.innerHTML = obj[0].id;
      i.className = "id";
      let fn = row.insertCell(1);
      fn.innerHTML = obj[0].fName;
      fn.className = "fname";
      let ln = row.insertCell(2);
      ln.innerHTML = obj[0].lName;
      ln.className = "lname";
      let p = row.insertCell(3);
      p.innerHTML = obj[0].phoneNumber;
      p.className = "phone";
      let e = row.insertCell(4);
      e.innerHTML = obj[0].email;
      e.className = "email";
      let upd = row.insertCell(5);
      btn = document.createElement("button");
      btn.className = "update";
      btn.innerHTML = "Update";
      upd.appendChild(btn);
      btn.addEventListener("click", function () {
        updateStudent(obj[0].id);
      });
      let del = row.insertCell(6);
      btn1 = document.createElement("button");
      btn1.className = "delete";
      btn1.innerHTML = "Delete";
      del.appendChild(btn1);
      btn1.addEventListener("click", function () {
        deleteStudent(obj[0].id);
      });
    }
    if (xhttp_get.readyState == 4 && xhttp_get.status != 200) {
      document.getElementById("feedback").innerHTML = "Error while connecting";
    }
  };
  var id = document.getElementById("search").value;
  var url = "http://127.0.0.1:5500/student/" + id;
  console.log(id);
  xhttp_get.open("GET", url, true);
  xhttp_get.send();
}

function deleteStudent(id) {
  xhttp_del.onreadystatechange = function () {
    if (xhttp_del.readyState == 4 && xhttp_del.status == 200) {
      alert("Student sucessfully deleted");
    }
    if (xhttp_del.readyState == 4 && xhttp_del.status != 200) {
      if (xhttp_del.status == 404) {
        alert("Student not found");
      } else {
        alert("Deletion failed");
      }
    }
    location.reload();
  };
  let url = "http://127.0.0.1:5500/student/" + id;
  xhttp_del.open("DELETE", url, true);
  xhttp_del.send();
}

function addStudent() {
  xhttp_post.onreadystatechange = function () {
    if (xhttp_post.readyState == 4 && xhttp_post.status == 200) {
      alert("Student successfully added");
    }
    if (xhttp_post.readyState == 4 && xhttp_post.status != 200) {
      alert("Student failed to be added.");
    }
    location.href = "/clientside/index.html";
  };
  let id = document.getElementById("id_insert").value;
  let fn = document.getElementById("fn_insert").value;
  let ln = document.getElementById("ln_insert").value;
  let p = document.getElementById("p_insert").value;
  let e = document.getElementById("e_insert").value;
  let values = {
    id: Number(id),
    fName: fn,
    lName: ln,
    phoneNumber: Number(p),
    email: e,
  };
  console.log(values);
  let url = "http://127.0.0.1:5500/student/";
  xhttp_post.open("POST", url, true);
  xhttp_post.setRequestHeader("Content-Type", "application/json");
  xhttp_post.send(JSON.stringify(values));
}

function updateStudent(id) {
  console.log("pressed");
  xhttp_post.onreadystatechange = function () {
    if (xhttp_post.readyState == 4 && xhttp_post.status == 200) {
      alert("Student successfully updated");
    }
    if (xhttp_post.readyState == 4 && xhttp_post.status != 200) {
      alert("Student failed to be updated.");
    }
    location.href = "/clientside/index.html";
  };
  let fn = document.getElementById("fn_upd").value;
  let ln = document.getElementById("ln_upd").value;
  let p = document.getElementById("p_upd").value;
  let e = document.getElementById("e_upd").value;
  let values = {
    id: Number(id),
    fName: fn,
    lName: ln,
    phoneNumber: Number(p),
    email: e,
  };
  let url = "http://127.0.0.1:5500/student/" + id;
  xhttp_post.open("PUT", url, true);
  xhttp_post.setRequestHeader("Content-Type", "application/json");
  xhttp_post.send(JSON.stringify(values));
}
