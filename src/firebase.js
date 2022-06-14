import firebase from 'firebase';

// const firebaseConfig = {
//     apiKey: "AIzaSyAH17IF8oWbm_ZebKDCcfaK7YJ5qrmmHkI",
//     authDomain: "car-react.firebaseapp.com",
//     projectId: "car-react",
//     storageBucket: "car-react.appspot.com",
//     messagingSenderId: "310591047593",
//     appId: "1:310591047593:web:5672a4a402c30d9eaf26b8"
//   };

// const firebaseConfig = {
//   apiKey: "AIzaSyBwzwdSkiIjsE7yK7cN76vuXpHtAcBXhE8",
//   authDomain: "car-rental-60a05.firebaseapp.com",
//   projectId: "car-rental-60a05",
//   storageBucket: "car-rental-60a05.appspot.com",
//   messagingSenderId: "494089025510",
//   appId: "1:494089025510:web:5a3952c326075599c84827"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyCsfKNJoEb-Eas9buiRhgyIAHP1UsO1vcU",
//   authDomain: "onlinecarbooking-23055.firebaseapp.com",
//   projectId: "onlinecarbooking-23055",
//   storageBucket: "onlinecarbooking-23055.appspot.com",
//   messagingSenderId: "573186345430",
//   appId: "1:573186345430:web:bc7998390b56753d4f7c77"
// };

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

// export default firebase;