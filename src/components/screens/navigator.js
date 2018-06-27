import { signIn } from './auth/SignInScreen';
import { signUp } from './auth/SignUpScreen';
import { chatScreen } from './ChatScreen';


window.visited = [];

//props is user and anything else you want to pass
export const navigate = (screen, props) => {
    if(screen === 'sign-in-screen'){
        window.visited.push(screen);
        return signIn.buildSignInScreen();
    }
    if(screen === 'sign-up-screen'){
        window.visited.push(screen);
        return signUp.buildSignUpScreen();
    }

    if(screen === 'chat-screen' && window.user){
        window.visited.push(screen);
        return chatScreen.buildChatScreen(window.user);
    }

    
    window.visited.push('sign-in-screen');
    return signIn.buildSignInScreen();
    
}

export const goBack = () => {
    let screen = window.visited.pop();
    console.log(screen);
    navigate(window.visited[window.visited.length - 1]);
    return screen;
    
}

