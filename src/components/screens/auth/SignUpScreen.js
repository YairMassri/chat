import $ from 'jquery';
import googleAuth from './GoogleAuth';
import { navigate, goBack } from '../navigator';
import { emailAndPass } from './emailAndPassword';

class SignUpScreen {

    buildSignUpScreen() {
        let self = this;
        //the code below in plain javascript whereas the one following it jquery
        // root.appendChild(SignInScreen());
        //after confirmation
        // $('#root').append(SignInScreen())

        //decided not to attach or both would show up
        //decided to add it as html so it replaces one with the other

        //must add html screen with buttons before attaching listeners because you can't listen to something you haven't created
        $('#sign-in-screen').fadeOut('slow', function () {
            $('#root').html(self.render());
            self.initializeSignUpScreenEventListener();
        });

    }

    render() {

        const container = document.createElement('div');
        container.id = 'sign-up-screen';
        container.classList.add('sign-up-screen');
        container.innerHTML = `
            <div class="logo-container">
            <i class="ion-md-chatbubbles" name="chatbubbles"></i>
            </div>

            <div class="sign-in-inputs-container">
            <div class="sign-in-input-container">
            <div class="sign-in-input-label">Name:</div>
            <div class="sign-in-input-wrapper">
            <input id="name" class="sign-in-input" type="text">
            </div>
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
            <div class="sign-in-inputs-container">
            <div class="sign-in-input-container">
            <div class="sign-in-input-label">Confirm Password:</div>
            <div class="sign-in-input-wrapper">
            <input id="passwordConfirmation" class="sign-in-input" type="password">
            </div>
            </div>
            <div class="btn-container">
            <div id="sign-up-btn-kkk" class="btn accent-color-2">SIGN UP</div>
            </div>
            <div class="btn-container">
            <div id="go-back-btn" class="btn accent-color-1">GO BACK</div>
            </div>

            <div class="@ copyright">All rights reserved &copy;</div>
         `;
        return container;
    }

    initializeSignUpScreenEventListener() {
        $('#go-back-btn').on('click', goBack);

        $('#sign-up-btn-kkk').on('click', emailAndPass);

    }
}

export const signUp = new SignUpScreen();