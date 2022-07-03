
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
// let REMOVE_PRODUCT_BUTTON = document.getElementsByClassName("remove-product");
// let ADD_TO_WISHLIST_BUTTON = document.getElementsByClassName("wishlist-button");
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
            if (WISHLIST_LINK && RESERVATION_LINK) {
                WISHLIST_LINK.style = "display:none"
                // RESERVATION_LINK.style = "display:none"
            }
            // if (ADD_TO_WISHLIST_BUTTON) { ADD_TO_WISHLIST_BUTTON.style = "display:none" }
            if (WISHLIST_ADD) { WISHLIST_ADD.style = "display:none" }
            if (BOOK_PRODUCT) { BOOK_PRODUCT.style = "display:none" }
            if (USER_RESERVATIONS_DIV) { USER_RESERVATIONS_DIV.style = "display:none" }
        } else if (IS_ADMIN === "user") {
            // if (REMOVE_PRODUCT_BUTTON) { REMOVE_PRODUCT_BUTTON.style = "display:none" }
            if (PRODUCT_REMOVE) { PRODUCT_REMOVE.style = "display:none"; }
            if (ADMIN_ELEMENTS) { ADMIN_ELEMENTS.forEach(item => item.style= "display:none") }
            if (ALL_RESERVATIONS_DIV) {ALL_RESERVATIONS_DIV.style = "display:none"}
        }

    } else {
        if (ACCOUNT_BUTTON && LOGOUT_BUTTON) {
            ACCOUNT_BUTTON.style = "display:none";
            LOGOUT_BUTTON.style = "display:none";
            LOGIN_BUTTON.style = "display:inherit";
            REGISTER_BUTTON.style = "display:inherit";
        }
        if (PRODUCT_REMOVE && WISHLIST_ADD && BOOK_PRODUCT) {
            PRODUCT_REMOVE.style = "display:none";
            WISHLIST_ADD.setAttribute("disabled", "");
            WISHLIST_ADD.setAttribute("title", "You must log in first before you can do this!");
            BOOK_PRODUCT.setAttribute("disabled", "");
            BOOK_PRODUCT.setAttribute("title", "You must log in first before you can do this!");
        }
        // console.log(ADD_TO_WISHLIST_BUTTON.length)
        // if (ADD_TO_WISHLIST_BUTTON && REMOVE_PRODUCT_BUTTON) {
        //     ADD_TO_WISHLIST_BUTTON.forEach(item => item.style = "display:none");
        //     REMOVE_PRODUCT_BUTTON.forEach(item => item.style = "display:none");
        // }
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

// if (REMOVE_PRODUCT_BUTTON) {
//     REMOVE_PRODUCT_BUTTON.addEventListener('click', e => {
//         e.preventDefault();
//     });
// }

refresh();

service.getUser().then(user => {
    if (!user) {
        service.logout();
    }
    refresh();
})
