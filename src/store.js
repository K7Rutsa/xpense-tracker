import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';
import { reduxFirestore, firestoreReducer } from 'redux-firestore'; // <- needed if using firestore
import 'firebase/firestore'; // <- needed if using firestore
import 'firebase/functions'; // <- needed if using httpsCallable

const firebaseConfig = {
  apiKey: 'AIzaSyDKyOAtbPSuMAhOMgZpq-Z8kXhTdKL_iL8',
  authDomain: 'expense-tracker-3e205.firebaseapp.com',
  databaseURL: 'https://expense-tracker-3e205.firebaseio.com',
  projectId: 'expense-tracker-3e205',
  storageBucket: 'expense-tracker-3e205.appspot.com',
  messagingSenderId: '317122177314'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
// firebase.firestore(); // <- needed if using firestore
// firebase.functions(); // <- needed if using httpsCallable

const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase), // <- needed if using firestore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);

export default store;
