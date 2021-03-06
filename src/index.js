import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";
import { fbConfig } from "./firebase.config";
//
import MyApp from "./App";
import { currentReducer } from "./reducers/currentReducer";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

firebase.initializeApp(fbConfig);
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  current: currentReducer
});

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(/* middleware goes here */))
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

const App = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <MyApp />
    </ReactReduxFirebaseProvider>
  </Provider>
);

render(<App />, document.getElementById("root"));
