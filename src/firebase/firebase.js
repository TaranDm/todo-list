import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCKBa_2hDGcy8Blk6Z6Y6F_KE0QfUQTJAI",
    authDomain: "todo-list-dd8f8.firebaseapp.com",
    projectId: "todo-list-dd8f8",
    storageBucket: "todo-list-dd8f8.appspot.com",
    messagingSenderId: "186169795067",
    appId: "1:186169795067:web:6e6504464cfdfcb0ca2b5e"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore()

