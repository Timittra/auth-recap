import React, { useState } from 'react';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app();
}


function App() {
  const [user, setUser] = useState({});
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var ghProvider = new firebase.auth.GithubAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage, errorCode, email);
      });
  }

  const handleFacebookSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider)
  .then((result) => {
    var credential = result.credential;
    var user = result.user;
    var accessToken = credential.accessToken;
    console.log('fb user', user);
    setUser(user);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorMessage, errorCode, email, credential);
  });
  }

  const handleGithubSignIn = () => {
    firebase.auth().signInWithPopup(ghProvider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    console.log('gh User', user);
    setUser(user);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorMessage, errorCode, email, credential);
  });
  }
  
  const handleTwitterSignIn = () => {
    
  }

  return (
    <div className="App">
    <button onClick={handleGoogleSignIn}>Sign in using google</button>
    <br/>
    <button onClick={handleFacebookSignIn}>Sign in using Facebook</button>
    <br/>
    <button onClick={handleGithubSignIn}>Sign in using Github</button>
    <br/>
    <button onClick={handleTwitterSignIn}>Sign in using Twitter</button>
    <h3>User Name: {user.displayName}</h3>
    <img src={user.photoURL} alt=""/>
    </div>
  );
}

export default App;
