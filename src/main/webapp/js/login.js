
/*
* Imports
*/
import LoginService from "./login-service.js";

/*
* Constants & variables
*/

let service = new LoginService();
const LOGIN_FORM = document.forms.login;
const LOGOUT_FORM = document.forms.logout;

const ACCOUNT_BUTTON = document.links.accountbutton;
const LOGIN_BUTTON = document.links.loginbutton;
const REGISTER_BUTTON = document.links.registerbutton;
const LOGOUT_BUTTON = document.links.logoutbutton;


/*
* Functions
*/

function refresh() {
    if (service.isLoggedIn()) {
        if (LOGIN_BUTTON && REGISTER_BUTTON) {
            LOGIN_BUTTON.style = "display:none";
            REGISTER_BUTTON.style = "display:none";
            ACCOUNT_BUTTON.style = "display:inherit"
            LOGOUT_BUTTON.style = "display:inherit"
        }
    } else {
        if (ACCOUNT_BUTTON && LOGOUT_BUTTON) {
            ACCOUNT_BUTTON.style = "display:none"
            LOGOUT_BUTTON.style = "display:none"
            LOGIN_BUTTON.style = "display:inherit";
            REGISTER_BUTTON.style = "display:inherit";
        }
    }
}

/*
* EventListeners
*/

if (LOGIN_FORM) {
    LOGIN_FORM.addEventListener('submit', e => {
        e.preventDefault();
        service.login(LOGIN_FORM.username.value, LOGIN_FORM.password.value).then(() => {
            // window.location.reload();
        })

    });
}

if (LOGOUT_BUTTON) {
    LOGOUT_BUTTON.addEventListener('click', e => {
        e.preventDefault();
        service.logout().then(() => {
            window.location.replace("home.html");
        });
    });
}

refresh();

service.getUser().then(user => {
    if (!user) {
        service.logout();
    }
    refresh();
})
