import $ from 'jquery';
import googleAuth from './GoogleAuth';
import facebookAuth from './facebookAuth';
import { navigate } from '../navigator';
import { emailAndPass, emailAndPasswordAuth } from './emailAndPassword';
import { chatScreen } from '../ChatScreen';

class SignInScreen {

    buildSignInScreen() {
        let self = this;
        $('#loading-screen, #sign-in-screen, #chat-screen, #sign-up-screen').fadeOut("fast",
            function () {
                //the code below in plain javascript whereas the one following it jquery
                // root.appendChild(SignInScreen());
                //after confirmation
                // $('#root').append(SignInScreen())

                //decided not to attach or both would show up
                //decided to add it as html so it replaces one with the other
                $('#root').html(self.render());
                self.initializeSignInScreenAddEventListener();
            });
    }

    render() {

        const container = document.createElement('div');
        container.id = 'sign-in-screen';
        container.classList.add('sign-in-screen');

        const googleAuthBtn = document.createElement('div');

        container.innerHTML = `
            <div class="logo-container">
                <img class="iconlogo" name="chatbubbles" src="images/41MSqLLB1kL.png">
            </div>

            <div id="login-btn" class="login-btn">
                <span class="login-btn-label">LOGIN</span>
            </div>

            <div class="sign-in-inputs-container">
            <div class="sign-in-input-container">
            <div class="sign-in-input-label">Email:</div>
            <div class="sign-in-input-wrapper">
            <input id="email" class="sign-in-input" type="text">
            </div>
            </div>

            <div class="sign-in-inputs-container">
            <div class="sign-in-input-container">
            <div class="sign-in-input-label">Password:</div>
            <div class="sign-in-input-wrapper">
            <input id="password" class="sign-in-input" type="password">
            </div>
            </div>



            <div class="icons-container">
                <i id="google_auth" class="icon">
                <svg width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#4285F4"/>
    <path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill="#34A853"/>
    <path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 0 0 0 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill="#FBBC05"/>
    <path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill="#EA4335"/>
</svg>
                </i>
                <i id="facebook_auth" class="icon">
                <svg width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
             <path d="M18.007 19c.55 0 .993-.444.993-.993V1.993c0-.55-.444-.993-.993-.993H1.993C1.443 1 1 1.444 1 1.993v16.014c0 .55.444.993.993.993h16.014zm-4.587 0v-6.97h2.34l.35-2.717h-2.69V7.578c0-.786.218-1.322 1.346-1.322h1.438v-2.43c-.25-.034-1.102-.108-2.096-.108-2.073 0-3.494 1.267-3.494 3.59v2.005H8.268v2.717h2.346V19h2.806z" fill="#3B5998" fill-rule="evenodd"/>
             </svg>
                </i>
            </div>
            </div>
            
            <div class="btn-container">
            <div id="signup_btn" class="btn accent-color-2">SIGN UP</div>
            <div id="signin_btn" class="btn accent-color-1">SIGN IN</div>
            </div>

            <div class="@ copyright">All rights reserved &copy;</div>
        `
        // ion-logo-facebook //ion-md-chatbubbles
        // ion-logo-google //;

        return container;
    }

    initializeSignInScreenAddEventListener() {
        //the below is plain javascript whereas the one we decided to use will use jquery
        //jquery doesn't require the code addEventListener;
        //document.getElementById('google_auth').onClick = googleAuth;
        $('#google_auth').on('click', googleAuth);
        $('#facebook_auth').on('click', facebookAuth);

        $('#signup_btn').on('click', function () {
            navigate('sign-up-screen');
        });
        $('#signin_btn').on('click', function () {
            emailAndPasswordAuth();
        });
    }
}

export const signIn = new SignInScreen();