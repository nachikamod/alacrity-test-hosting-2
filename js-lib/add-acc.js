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
var name, clg_name, email, password, conf_password, contact;

var d = new Date();
var t = d.getTime();
var counter = t;

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
    contact: cont
  }
  let db = firebase.database().ref("ambassadors_data/" + authKey);
  db.set(data);
  readTask();
}

function readTask(){
  var task = firebase.database() .ref("ambassadors_data/");

  task.on("value", function(snapshot){
    console.log("Count : " + snapshot.numChildren());

    document.getElementById("count").innerHTML = snapshot.numChildren();
  });

  task.on("child_added",function(data){
    var taskValue = data.val();
    console.log(taskValue);
    document.getElementById("cardSection").innerHTML+=`
      <div class="card mb-3">
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
