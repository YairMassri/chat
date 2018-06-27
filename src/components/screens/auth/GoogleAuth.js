import navigate from '../navigator';
// import chatScreen from '../ChatScreen';
console.log("googleFile1");
function googleAuth(){
  console.log("googleFile2");
  //start: this code gotten from my Google firebase account
const provider = new firebase.auth.GoogleAuthProvider();
const root = document.getElementById('root');

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;

  console.log(token, user);

  window.user = user;
  //chat was pushed into visited array in navihator and it's just a string created by me.
  // navigate('chat-screen', user);
  // buildChatScreen(user);

}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  console.log(errorMessage);

  alert(errorMessage);

});

//end Google provided code
}


export default googleAuth;