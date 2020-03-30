//The core Firebase JS SDK is always required and must be listed first



  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBKy3dwh24ZUUvSLmmZOTbehwlxr8RED6k",
    authDomain: "comp1537hangman.firebaseapp.com",
    databaseURL: "https://comp1537hangman.firebaseio.com",
    projectId: "comp1537hangman",
    storageBucket: "comp1537hangman.appspot.com",
    messagingSenderId: "13340068196",
    appId: "1:13340068196:web:e8d73163d7372194f65271"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();