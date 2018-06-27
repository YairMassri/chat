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
        function() {
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
            <i class="ion-md-chatbubbles" name="chatbubbles"></i>
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
                <i id="google_auth" class="icon ion-logo-google"></i>
                <i id="facebook_auth" class="icon ion-logo-facebook"></i>
            </div>
            </div>
            
            <div class="btn-container">
            <div id="signup_btn" class="btn accent-color-2">SIGN UP</div>
            <div id="signin_btn" class="btn accent-color-1">SIGN IN</div>
            </div>

            <div class="@ copyright">All rights reserved &copy;</div>
        `;

        return container;
    }

    initializeSignInScreenAddEventListener() {
        //the below is plain javascript whereas the one we decided to use will use jquery
        //jquery doesn't require the code addEventListener;
        //document.getElementById('google_auth').onClick = googleAuth;
        $('#google_auth').on('click', googleAuth);
        $('#facebook_auth').on('click', facebookAuth);

        $('#signup_btn').on('click', function(){
            navigate('sign-up-screen');
        });
        $('#signin_btn').on('click', function(){
            emailAndPasswordAuth();
        });
    }
}

export const signIn = new SignInScreen();