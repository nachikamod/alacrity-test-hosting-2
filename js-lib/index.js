var dataStream = 80 ;
var check = 0;

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('2 8=[\'6-0-5\',\'G-i\',\'m\',\'o://6-0-5.l.a\'];(7(9,b){2 c=7(g){k(--g){9[\'n\'](9[\'j\']())}};c(++b)}(8,p));2 3=7(4,h){4=4-d;2 f=8[4];x f};2 A={\'q\':3(\'d\'),\'C\':\'6-0-5.E.a\',\'F\':3(\'D\'),\'B\':3(\'y\'),\'s\':\'6-0-5.r.a\',\'t\':\'e\',\'u\':\'1:e:0:w\',\'v\':3(\'z\')};',43,43,'web||var|_0x4fa7|_0x46997b|hosting|alactrity|function|_0x203f|_0x483f96|com|_0x33dac4|_0x543aed|0x0|835486942179|_0x3d545e|_0x289643|_0x37d9f4|L8770VTSYD|shift|while|firebaseio|AIzaSyAUU4cxCyevia90C7QiGxNx5tDD8Ll0aAo|push|https|0x18e|apiKey|appspot|storageBucket|messagingSenderId|appId|measurementId|b139b0540b71424a9dd6d6|return|0x2|0x3|firebaseConfig|projectId|authDomain|0x1|firebaseapp|databaseURL|'.split('|'),0,{}))

eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0 4=[\'e\'];(2(3,6){0 7=2(8){c(--8){3[\'d\'](3[\'k\']())}};7(++6)}(4,j));0 a=2(1,f){1=1-5;0 b=4[1];h b};9[a(\'5\')](g);9[\'i\']();',21,21,'var|_0x1650a1|function|_0x5425bc|_0x46cb|0x0|_0x211f46|_0x51dfd2|_0x1c8d51|firebase|_0x1619|_0x3b6870|while|push|initializeApp|_0x3b7816|firebaseConfig|return|analytics|0x126|shift'.split('|'),0,{}))

firebase.auth.Auth.Persistence.LOCAL;

function ignite() {

  $(function() {
      $('.chart').easyPieChart({
          lineWidth:20,
          scaleColor:false,
          size:200,
          trackColor:'#4C4C78',
          barColor:'#6C63FF'
      });


      $('.chart').data('easyPieChart').update(dataStream);


  });
  $(function() {
      $('.chart2').easyPieChart({
          lineWidth:20,
          scaleColor:false,
          size:200,
          trackColor:'#4C4C78',
          barColor:'#6C63FF'
      });


      $('.chart2').data('easyPieChart').update(40);


  });

};

function adminLogin(){

  //open your loading bar here
  //this means , style.display = block

  var email = document.getElementById("admin_email").value;
  var password = document.getElementById("admin_password").value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  window.alert("Error : " + errorMessage);
  // ...
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;
    var email_id = user.email;

    //Close Your loading Bar here
    //this means , style.display = none

    window.location.replace("adminConsole.html");
    window.alert(" You are logged in : " + email_id);



  } else {
    //window.alert("You are not logged in");
  }
});

}

function timeStampper() {

  var d = new Date();
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var stamp = d.getDate() + " " + months[d.getMonth()] + " " +  d.getFullYear() + " @ " + d.getHours() + ":"  + d.getMinutes();

  console.log(stamp);

  if (check == 1) {
    console.log("Page refresh : " + stamp);
  }

  else{

    var database = firebase.database().ref().child("logs").child("admin").push();

    firebase.database().ref().child("logs").child("buffer").set(stamp);

    database.child("log").set(stamp);

  }

    check = 1;



};

function ambassadorLogin(){
  var ambiEmail = document.getElementById("amb_email").value;
  var ambiPassword = document.getElementById("amb_password").value;
  firebase.auth().signInWithEmailAndPassword(ambiEmail, ambiPassword).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  window.alert("Error : " + errorMessage);
  // ...
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;
    var email_id = user.email;
    window.location.replace("ambConsole.html");
    window.alert(" You are logged in : " + email_id);

  } else {
    //window.alert("You are not logged in");
  }
});
}

function retrieveLogs(){
  firebase.database().ref().child("logs").child("buffer").on('value', function(snapshot){
    document.getElementById("visit-logs").innerHTML = "Last Visited : " + snapshot.val();
  });
}


function logout(){

  firebase.auth().signOut().then(function() {
  console.log("logged out");
  window.location.replace("index.html");

  }).catch(function(error) {
  // An error happened.
  });
}

function testAuth(){
  console.log(auth);
}
