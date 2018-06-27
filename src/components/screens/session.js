import { navigate } from "./navigator"

export const createPersistantSession = (authentication = () => console.log('no authentication passed to persistant session')) => {
    firebase.auto().setPersistance(firebase.auto.Auto.Persistance.LOCAL).then(function () {

        return authentication;
    })
        .catch(function (error) {

            var errorCode = error.code;
            var errorMessage = error.message;

            console.log('error', errorMessage);
        });
}

export const signOut = () => {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
 }

export const session = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      console.log('user >>>>>> ', user);
      
      window.user = user;
  
      console.log('>>>>> navigating');

      if (user) {
        navigate('chat-screen', user);
      }
      else {
        navigate('sign-in-screen');
      }
   
    });
  }
