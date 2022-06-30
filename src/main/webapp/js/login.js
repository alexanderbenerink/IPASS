
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
const WISHLIST_LINK = document.getElementById("wishlistLink");
const ADMIN_ELEMENTS = [document.getElementById("addProductLink"), document.getElementById("statisticsLink")];
const DISPLAY_USERNAME = document.getElementById("displayUsername");
let USERNAME = "";
let IS_ADMIN = "";

/*
* Functions
*/

// Handle the username by fetching it and saving it in a constant
function getUsername() {
    const fetchUsername = service.getUser().then(response => {
        return response.username;
    });

    const handleFetchResult = () => {
        fetchUsername.then((a) => {
            USERNAME = a;
        });
    };

    handleFetchResult();
}

function isAdmin() {
    // Find out if the user is an admin
    const fetchRole = service.getUser().then(response => {
        return response.role;
    });

    const handleFetchResult = () => {
        fetchRole.then((a) => {
            IS_ADMIN = a;
        });
    };

    handleFetchResult();
}

function refresh() {
    if (service.isLoggedIn()) {
        getUsername();
        isAdmin();

        if (LOGIN_BUTTON && REGISTER_BUTTON) {
            LOGIN_BUTTON.style = "display:none";
            REGISTER_BUTTON.style = "display:none";
            ACCOUNT_BUTTON.style = "display:inherit";
            LOGOUT_BUTTON.style = "display:inherit";
        }

        if (DISPLAY_USERNAME) { DISPLAY_USERNAME.textContent = USERNAME; }

        if (IS_ADMIN === "admin") {
            if (WISHLIST_LINK) { WISHLIST_LINK.style = "display:none" }
        } else if (IS_ADMIN === "user") {
            if (ADMIN_ELEMENTS) { ADMIN_ELEMENTS.forEach(item => item.style= "display:none")}
        }

    } else {
        if (ACCOUNT_BUTTON && LOGOUT_BUTTON) {
            ACCOUNT_BUTTON.style = "display:none";
            LOGOUT_BUTTON.style = "display:none";
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
