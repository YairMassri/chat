import { navigate } from "../navigator";
import { createPersistantSession, session } from "../session";
import $ from "jquery";

function buildLoadingScreen(user) {

    $('#root').html(LoadingScreen(user));
    initializeLoadingScreenEventListeners(user);

    setTimeout(() => {
      session();
    }, 2000);
}

function LoadingScreen(user) {
    const container = document.createElement('div');
    container.id = 'loading-screen';
    container.classList.add('loading-screen');

    container.innerHTML = `
    <div class="loader">
    <div class="segment-holder">
      <div class="segment one"></div>
    </div>
    <div class="segment-holder">
      <div class="segment two"></div>
    </div>
    <div class="segment-holder">
      <div class="segment three"></div>
    </div>
    <div class="segment-holder">
      <div class="segment four"></div>
    </div>
  </div>
    `;

    return container;
}

function initializeLoadingScreenEventListeners() {

}

export default buildLoadingScreen;