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




function uploadPhoto(){

    document.getElementById("fileButton").click();

}


