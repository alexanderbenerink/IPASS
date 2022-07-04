
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
const RESERVATION_LINK = document.getElementById("reservationsLink");
const USER_RESERVATIONS_DIV = document.getElementById("displayUserReservations");
const ALL_RESERVATIONS_DIV = document.getElementById("displayAllUserReservations");
let PRODUCT_REMOVE = document.getElementById("removeProductButton");
let WISHLIST_ADD = document.getElementById("addToWishlistButton");
let BOOK_PRODUCT = document.getElementById("bookProduct");
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

// Find out if the user is an admin
function isAdmin() {
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
    // Change front-end to correspond login state
    if (service.isLoggedIn()) {
        getUsername();
        isAdmin();

        // If user is logged in, hide login and registration buttons in navbar
        if (LOGIN_BUTTON && REGISTER_BUTTON) {
            LOGIN_BUTTON.style = "display:none";
            REGISTER_BUTTON.style = "display:none";
            ACCOUNT_BUTTON.style = "display:inherit";
            LOGOUT_BUTTON.style = "display:inherit";
        }

        // Display username in account pages
        if (DISPLAY_USERNAME) { DISPLAY_USERNAME.textContent = USERNAME; }

        // If the user is an admin, hide several user elements that admin can't use anyway
        if (IS_ADMIN === "admin") {
            if (WISHLIST_LINK && RESERVATION_LINK) {
                WISHLIST_LINK.style = "display:none"
            }
            if (WISHLIST_ADD) { WISHLIST_ADD.style = "display:none" }
            if (BOOK_PRODUCT) { BOOK_PRODUCT.style = "display:none" }
            if (USER_RESERVATIONS_DIV) { USER_RESERVATIONS_DIV.style = "display:none" }
        } else if (IS_ADMIN === "user") {
            // Else if user is not an admin, hide several admin elements that user can't use anyway.
            if (PRODUCT_REMOVE) { PRODUCT_REMOVE.style = "display:none"; }
            if (ADMIN_ELEMENTS) { ADMIN_ELEMENTS.forEach(item => item.style= "display:none") }
            if (ALL_RESERVATIONS_DIV) {ALL_RESERVATIONS_DIV.style = "display:none"}
        }
    } else {
        // Else, if user is not logged in, hide the links to account page and logging out
        if (ACCOUNT_BUTTON && LOGOUT_BUTTON) {
            ACCOUNT_BUTTON.style = "display:none";
            LOGOUT_BUTTON.style = "display:none";
            LOGIN_BUTTON.style = "display:inherit";
            REGISTER_BUTTON.style = "display:inherit";
        }
        // Restrict users in the front-end from booking or wishlisting items (that they can't do anyway)
        if (PRODUCT_REMOVE && WISHLIST_ADD && BOOK_PRODUCT) {
            PRODUCT_REMOVE.style = "display:none";
            WISHLIST_ADD.setAttribute("disabled", "");
            WISHLIST_ADD.setAttribute("title", "You must log in first before you can do this!");
            BOOK_PRODUCT.setAttribute("disabled", "");
            BOOK_PRODUCT.setAttribute("title", "You must log in first before you can do this!");
        }
    }
}

/*
* EventListeners
*/

// Log users in
if (LOGIN_FORM) {
    LOGIN_FORM.addEventListener('submit', e => {
        e.preventDefault();
        service.login(LOGIN_FORM.username.value, LOGIN_FORM.password.value).then(() => {
            // window.location.reload();
        })

    });
}

// Log users out
if (LOGOUT_BUTTON) {
    LOGOUT_BUTTON.addEventListener('click', e => {
        e.preventDefault();
        service.logout().then(() => {
            window.location.replace("home.html");
        });
    });
}

refresh();

// If user token couldn't be verified, log users out
service.getUser().then(user => {
    if (!user) {
        service.logout();
    }
    refresh();
})
