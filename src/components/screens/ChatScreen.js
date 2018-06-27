import $ from "jquery";
import { signIn } from './auth/SignInScreen';
import { signUp } from './auth/SignUpScreen';
import { navigate, goBack } from './navigator';
import { signOut } from './session';

require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');

class ChatScreen {
    constructor(){

        this.db = firebase.database();
        this.messages = this.db.ref('messages/');
        this.users = this.db.ref('users/');
    }
    buildChatScreen(user) {
        let self = this;
        //the code below in plain javascript whereas the one following it jquery
        // root.appendChild(SignInScreen());
        //after confirmation
        // $('#root').append(SignInScreen())

        //decided not to attach or both would show up
        //decided to add it as html so it replaces one with the other

        //must add html screen with buttons before attaching listeners because you can't listen to something you haven't created
        $('#sign-in-screen, #loading-screen, #sign-up-screen').fadeOut('slow', function () {
            $('#root').html(self.render(user));
            self.initializeChatScreenEventListeners(user);
        });

        
    }

    render(user) {

        const container = document.createElement('div');
        container.id = 'chat-screen';
        container.classList.add('chat-screen');
        container.innerHTML = `
        <div class="chat-header">Hi ${user.displayName}!
       
        <div id="sign-out-btn" class="sign-out-btn">
            <svg id="signout" width="40px" height="40px" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M192 277.4h189.7l-43.6 44.7L368 352l96-96-96-96-31 29.9 44.7 44.7H192v42.8z"/><path d="M255.7 421.3c-44.1 0-85.5-17.2-116.7-48.4-31.2-31.2-48.3-72.7-48.3-116.9 0-44.1 17.2-85.7 48.3-116.9 31.2-31.2 72.6-48.4 116.7-48.4 44 0 85.3 17.1 116.5 48.2l30.3-30.3c-8.5-8.4-17.8-16.2-27.7-23.2C339.7 61 298.6 48 255.7 48 141.2 48 48 141.3 48 256s93.2 208 207.7 208c42.9 0 84-13 119-37.5 10-7 19.2-14.7 27.7-23.2l-30.2-30.2c-31.1 31.1-72.5 48.2-116.5 48.2zM448.004 256.847l-.849-.848.849-.849.848.849z"/>
            </svg>
        </div>
    
    </div>

    <div id="chat-screen-messages-container" class="chat-screen-messages-container"></div>

    <div class="chat-screen-input-container">
       <input type="text" id="chat-screen-input" class="chat-screen-input">
       <div id="chat-screen-send-msg-btn" class="chat-screen-send-msg-btn">
             <svg id="send" width="40px" height="40px" fill="#000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
             <path d="M48 448l416-192L48 64v149.333L346 256 48 298.667z"/>
             </svg>
       </div>          
    </div>

        `;
        return container;
    }

    sendMessage(uid, name, email, img){
        let date = new Date();
        let text = $("#chat-screen-input").val();

        console.log('sending messages', text);

        if(text) {
            this.messages.push({
                uid: uid,
                name: name,
                text: text,
                date: date.toString(),
                email: email,
                img: img
            });
            $("#chat-screen-input").val('');
        }

    }

    scroll() {
        $('#chat-screen-messages-container').scrollTop($('#chat-screen-messages-container')[0].scrollHeight);
    }

    initializeChatScreenEventListeners(user) {
        let self = this;

        $('#sign-out-btn').on('click', signOut);

        $('#chat-screen-send-msg-btn').on('click', function () {
            self.sendMessage(user.uid, user.displayName, user.email, user.photoURL);
        });

        $('#chat-screen-input').on('keydown', function (e) {
            console.log("13???");
            if(e.keyCode === 13) {
                self.sendMessage(user.uid, user.displayName, user.email, user.photoURL);
            }
        }).keyup(function () {

        });

        this.messages.on('value', function (snapshot) {
            //console.log(snapshot.val());
            $("#chat-screen-messages-container").html("");
            let msgs = snapshot.val();
        
            for (let id in msgs) {
              let msg = msgs[id];
              let side = user.email === msg.email ? 'right' : 'left';
            let margin = user.email === msg.email ? 'margin-left: 15px;' : 'margin-right: 15px;';
            let corner = user.email === msg.email ? 'right-top' : 'left-top';
              $("#chat-screen-messages-container").append(
                `<div class="msg-div ${side}">
                    <div style="${margin}">
                        <img class="profile-img" src="${user.photoURL || './images/user.png'}" height="40px" width="auto">
                    </div>
                    <div style="flex-grow: 1; padding: 10px;" class="talk-bubble tri-right ${corner}">
                        <div class="name"><strong>${msg.name}</strong>:</div>
                        <div class="msg">${msg.text}</div>
                        <div class="date ${side}">
                        <div>${format.date(new Date(msg.date)).date}</div>
                        <div>${format.date(new Date(msg.date)).time}</div>
                      </div>
                    </div>
                `
              );
            }
            scroll();
          });
          
          let format = {
            date: (date) => {
              let d = date.getDate();
              let m = date.getMonth() + 1;
              let y = date.getFullYear();
          
              let h = date.getHours();
          
              let hf = (h > 11) ? 'PM' : 'AM';
              let hh = (h > 12) ? h % 12 : h;
              let mm = date.getMinutes();
              let ss = date.getSeconds();
          
              if (d < 10) d = '0' + d;
              if (m < 10) m = '0' + m;
              if (hh < 10) hh = '0' + hh;
              if (mm < 10) mm = '0' + mm;
              if (ss < 10) ss = '0' + ss;
          
              return {
                date: m + '/' + d + '/' + y,
                time: hh + ':' + mm + ':' + ss + ' ' + hf
              };
            }
          }

    }
}

export const chatScreen = new ChatScreen;