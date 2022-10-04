// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDzpa3-26piuJGDlKpES3g_W1s0Sk4-hmQ',
  authDomain: 'rn-demo-project-c0a66.firebaseapp.com',
  databaseURL: 'https://rn-demo-project-c0a66-default-rtdb.firebaseio.com',
  projectId: 'rn-demo-project-c0a66',
  storageBucket: 'rn-demo-project-c0a66.appspot.com',
  messagingSenderId: '913858131134',
  appId: '1:913858131134:web:3b6f6bce8d7f8fa02f9aef',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.firestore().settings({experimentalForceLongPolling: true});

//Initialize Firestore
export const db = getFirestore(app);
