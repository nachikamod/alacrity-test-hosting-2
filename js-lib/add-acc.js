var firebaseConfig = {
    apiKey: "AIzaSyAUU4cxCyevia90C7QiGxNx5tDD8Ll0aAo",
    authDomain: "alactrity-web-hosting.firebaseapp.com",
    databaseURL: "https://alactrity-web-hosting.firebaseio.com",
    projectId: "alactrity-web-hosting",
    storageBucket: "alactrity-web-hosting.appspot.com",
    messagingSenderId: "835486942179",
    appId: "1:835486942179:web:b139b0540b71424a9dd6d6",
    measurementId: "G-L8770VTSYD"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var authKey;
var name, clg_name, email, password, conf_password, contact, id_edit;

function createAccount(){

  name = document.getElementById("amb_name").value;
  clg_name = document.getElementById("amb_clg").value;
  contact = document.getElementById("contact").value;
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  conf_password = document.getElementById("conf_password").value;

  if (password != conf_password) {

    window.alert("Password does not match");

  }
  else {

      createAcc(name, clg_name, contact, email, password);

  }

}

function createAcc(nm, clg, cont, em, pass){

  firebase.auth().createUserWithEmailAndPassword(em, pass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode + " : " + errorMessage);

  }).then(function () {
        //handle loading bar
        authKey = firebase.auth().currentUser.uid;
        window.alert("Account Created");

        uploadData(authKey, nm, clg, cont, em);
  });

}

function uploadData(authKey, nm, clg, cont, em) {
  var data = {
    name: nm,
    college: clg,
    email: em,
    contact: cont,
    key: authKey
  }
  let db = firebase.database().ref("ambassadors_data/" + authKey);
  db.set(data);

  readTask();
}

function readTask(){
  var task = firebase.database() .ref("ambassadors_data/");


    document.getElementById("amb_name").value = '';
    document.getElementById("amb_clg").value = '';
    document.getElementById("contact").value = '';
    document.getElementById("email").value = '';
    document.getElementById("password").value = '';
    document.getElementById("conf_password").value = '';

  task.on("child_added",function(data){
    var taskValue = data.val();
    console.log(taskValue);
    document.getElementById("cardSection").innerHTML+=`
      <div class="card mb-3" style="box-shadow:0 0 8px #888888">
        <div class="card-body">
          <div class="container-fluid">
            <h5 class="card-title" style="color:#4c4c78">${taskValue.name}</h5>
            <p class="card-text">Email : ${taskValue.email}</br>College : ${taskValue.college}</br>Contact : ${taskValue.contact}</p>
          </div>
        </div>
      </div>
    `
  });
}

function distributeTasks(){

  var task = firebase.database().ref("ambassadors_data/");

  task.on("value", function(snapshot){
    console.log("Count : " + snapshot.numChildren());

    document.getElementById("count").innerHTML = snapshot.numChildren();
  });

  task.on("child_added",function(data){
    var taskValue = data.val();
    console.log(taskValue);
    document.getElementById("cardSection2").innerHTML+=`
      <div class="card mb-3" style="box-shadow:0 0 8px #888888">
        <div class="card-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-4">
                <h5 class="card-title" style="color:#4c4c78">${taskValue.name}</h5>
                <p class="card-text">Email : ${taskValue.email}</br>College : ${taskValue.college}</br>Contact : ${taskValue.contact}</p>
              </div>
              <div style="text-align:center" class="col-sm-4">
                <a style="font-size:3vw;color:#4c4c78">50%</a>
                <p>Weekly Tasks</p>
              </div>
              <div style="text-align:center" class="col-sm-4">
                <a style="font-size:3vw;color:#4c4c78">80%</a>
                <p>Overall Tasks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  });
}

function assignWeeklyTask(id,userName) {

  localStorage.setItem("val", id);
  localStorage.setItem("name",userName);
  window.location.replace("weekly-task.html")
}

function loader(){
  document.getElementById("test").innerHTML = localStorage.getItem("val");
}

function uploadTaskData(){
  var taskTitle = document.getElementById("tasker").value;
  var taskDescriptor = document.getElementById("descriptor").value;



  if (tsk == "weekly") {

    var dabase = firebase.database().ref("tasks-buffer/weekly-tasks-buffer").push();
    var combData = {
      title : taskTitle,
      description : taskDescriptor,
      dataKey: dabase.getKey()
    }

    localStorage.setItem("data_key", dabase.getKey());
    dabase.set(combData);

  }

  else if (tsk == "overall") {
    var dabase = firebase.database().ref("tasks-buffer/overall-tasks-buffer").push();
    var combData = {
      title : taskTitle,
      description : taskDescriptor,
      dataKey: dabase.getKey()
    }

    localStorage.setItem("data_key", dabase.getKey());
    dabase.set(combData);
  }

  else {
    window.alert("Select task type");
  }


  document.getElementById("pop-up").style.display = "block";
  document.getElementById("file-section").innerHTML = ``;

}

function weeklyTaskReload(){

  document.getElementById("weekly-section").innerHTML = ``;
  document.getElementById("overall-section").innerHTML = ``;

  var task = firebase.database().ref("tasks-buffer/weekly-tasks-buffer");
  task.on("child_added",function(data){
    var taskValue = data.val();
    console.log(taskValue);
    document.getElementById("weekly-section").innerHTML+=`
    <div class="card mb-3" style="box-shadow:0 0 8px #888888" onclick="retrieveFilesWeekly('${taskValue.dataKey}','${taskValue.title}')">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-11">
            <h5 id="${taskValue.dataKey}title" class="card-title">${taskValue.title}</h5>
            <p id="${taskValue.dataKey}desc" class="card-text">${taskValue.description}</p>
            <p id="${taskValue.dataKey}removed"></p>
          </div>
          <div class="col-sm-1">
            <div class="watch"><img style="width:1.4vw" src="resources/delete.png" href="#" onclick="deleteWeekly('${taskValue.dataKey}')"></div>
            <style>
              .watch:hover{
                text-align:center;
                width:2vw;
                height:2vw;
                border-radius:1vw;
                background-color:#dadada;
              }
            </style>
          </div>
        </div>
      </div>
    </div>

    `
  });

  var ovrTask = firebase.database().ref("tasks-buffer/overall-tasks-buffer");
  ovrTask.on("child_added",function(data){
    var taskValue = data.val();//here
    console.log(taskValue);
    document.getElementById("overall-section").innerHTML+=`
      <div class="card mb-3" style="box-shadow:0 0 8px #888888" onclick="retrieveFiles('${taskValue.dataKey}','${taskValue.title}')">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-11">
              <h5 id="${taskValue.dataKey}title" class="card-title">${taskValue.title}</h5>
              <p id="${taskValue.dataKey}desc" class="card-text">${taskValue.description}</p>
              <p id="${taskValue.dataKey}removed"></p>
            </div>
            <div class="col-sm-1">
              <div class="watch"><img style="width:1.4vw" src="resources/delete.png" href="#" onclick="deleteOverall('${taskValue.dataKey}')"></div>
              <style>
                .watch:hover{
                  text-align:center;
                  width:2vw;
                  height:2vw;
                  border-radius:1vw;
                  background-color:#dadada;
                }
              </style>
            </div>
          </div>
        </div>
      </div>
    `
  });

}

function retrieveFiles(fileFixer,title){
  document.getElementById("fileNameHolder").style.padding = "1vw";
  document.getElementById("fileNameHolder").innerHTML = title + " Files";

  document.getElementById("file-section2").innerHTML = ``;
//console.log(fileKey);
  var fileTask = firebase.database().ref("tasks-buffer/overall-tasks-buffer/" + fileFixer  + "/files");
  fileTask.on("child_added",function(data){
    var fileVal = data.val();
    console.log(fileVal);
    //console.log(${fileVal.fileName});
    document.getElementById("file-section2").innerHTML+=`
      <div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-10">
              <h5 class="card-title">${fileVal.fileName}</h5>
              <p id="${fileVal.fileKey}"></p>
            </div>
            <div class="col-sm-1">
              <div class="watch"><img src="resources/eye.png" href="#" onclick="window.location.replace('${fileVal.fileURL}')"></div>
              <style>
                .watch:hover{
                  text-align:center;
                  width:2vw;
                  height:2vw;
                  border-radius:1vw;
                  background-color:#dadada;
                }
              </style>
            </div>
            <div class="col-sm-1">
              <div class="watch"><img style="width:1.4vw" src="resources/delete.png" href="#" onclick=remover('${fileVal.dataKey}','${fileVal.fileKey}')></div>
            </div>
          <div>
        </div>
      </div>
    `
  });
}

function retrieveFilesWeekly(fileFixer,title){

  document.getElementById("fileNameHolder2").style.padding = "1vw";
  document.getElementById("fileNameHolder2").innerHTML = title + " Files";

  document.getElementById("file-section3").innerHTML = ``;

  var fileTask = firebase.database().ref("tasks-buffer/weekly-tasks-buffer/" + fileFixer  + "/files");
  fileTask.on("child_added",function(data){
    var fileVal = data.val();
    console.log(fileVal);
    //console.log(${fileVal.fileName});
    document.getElementById("file-section3").innerHTML+=`
      <div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-10">
              <h5 class="card-title">${fileVal.fileName}</h5>
              <p id="${fileVal.fileKey}"></p>
            </div>
            <div class="col-sm-1">
              <div class="watch"><img src="resources/eye.png" href="#" onclick="window.location.replace('${fileVal.fileURL}')"></div>
              <style>
                .watch:hover{
                  text-align:center;
                  width:2vw;
                  height:2vw;
                  border-radius:1vw;
                  background-color:#dadada;
                }
              </style>
            </div>
            <div class="col-sm-1">
              <div class="watch"><img style="width:1.4vw" src="resources/delete.png" href="#" onclick=removerWeekly('${fileVal.dataKey}','${fileVal.fileKey}')></div>
            </div>
          <div>
        </div>
      </div>
    `
  });


}

var tsk;

function tskType(type){
  tsk = type;
  localStorage.setItem("taskStore",tsk);
}

function remover(dataKey,fileKey){
  firebase.database().ref().child("tasks-buffer").child("overall-tasks-buffer").child(dataKey).child("files").child(fileKey).remove();
  document.getElementById(fileKey).innerHTML = "File Removed";
  document.getElementById(fileKey).style.color = "red";
}

function removerWeekly(dataKey,fileKey) {
  firebase.database().ref().child("tasks-buffer").child("weekly-tasks-buffer").child(dataKey).child("files").child(fileKey).remove();
  document.getElementById(fileKey).innerHTML = "File Removed";
  document.getElementById(fileKey).style.color = "red";
}

function deleteOverall(dataKey){

  firebase.database().ref().child("tasks-buffer").child("overall-tasks-buffer").child(dataKey).remove();
  document.getElementById(dataKey + "removed").innerHTML = "File Removed";
  document.getElementById(dataKey + "removed").style.color = "red";

}

function deleteWeekly(dataKey){

  firebase.database().ref().child("tasks-buffer").child("weekly-tasks-buffer").child(dataKey).remove();
  document.getElementById(dataKey + "removed").innerHTML = "File Removed";
  document.getElementById(dataKey + "removed").style.color = "red";

}
