import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyCRKj2pIrxtBcKmt482eYpK6xKJ3iFksDc",
  authDomain: "mycarproject-e96de.firebaseapp.com",
  projectId: "mycarproject-e96de",
  storageBucket: "mycarproject-e96de.appspot.com",
  messagingSenderId: "93880052397",
  appId: "1:93880052397:web:c091d0d719b06d99f3f424"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
var product = db.collection('Cars');
var storageref = firebase.storage();
var auth = firebase.auth();
export {db ,storageref ,auth ,product};