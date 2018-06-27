import { navigate } from "../navigator";
import { isValidatePassword, isValidateEmail } from "../validation";
import $ from "jquery";

export function emailAndPass() {
    let email = $('#email').val();
    let password = $('#password').val();
    let passwordConfirmation = $('#passwordConfirmation').val();

console.log("working?")

    if (!isValidateEmail(email)) {
        alert('Invalid Email');
    }
    else if (!isValidatePassword(password)) {
        alert('Invalid Password');
    }
    else if (password !== passwordConfirmation) {
        alert('Password do not match');
    }
    else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (result){
            var user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: name,
            }).then(function(){
                //update successful
                navigate('chat-screen', user);
            }).catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.Message;
                alert("oh no " + errorMessage);
            });
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.Message;
            alert("oh no " + errorMessage);
        });
    }
}

export function emailAndPasswordAuth(){
    console.log('email and password authorization in process')
    let email = $('#email').val();
    let password = $('#password').val();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(errorMessage);
    });
}