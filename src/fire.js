import firebase from "firebase";

var config = {
  apiKey: "AIzaSyCPYbq-106hkRmMcahvX2FMptWAo6p0Nc0",
  authDomain: "quiz-react-firebase.firebaseapp.com",
  databaseURL: "https://quiz-react-firebase.firebaseio.com",
  projectId: "quiz-react-firebase",
  storageBucket: "quiz-react-firebase.appspot.com",
  messagingSenderId: "537913313114"
};

var fire = firebase.initializeApp(config);
export default fire;
