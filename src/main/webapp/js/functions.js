/*
* Constants
*/

const START_INDEX = 0;
const MAX_COLUMNS = 3;

const CODEWORD_FORM = document.getElementById("postcodeword")
const REGISTER_FORM = document.getElementById("registerForm")
const LOGIN_FORM = document.getElementById("loginForm")
const MODIFY_PASSWORD_FORM = document.getElementById("modifyPasswordForm")
const PRODUCT_FORM = document.getElementById("reservationForm")
let typingTimer;
let typeInterval = 500; // Half a second
let searchInput = document.getElementById('searchbox');

/*
* Functions
*/

async function sendJsonData(event) {
    const CODEWORD = document.getElementById("codeword");

    let jsonRequestBody = {
        "codeword": CODEWORD.value
    };

    let fetchOptions = {
        method: "POST",
        body: JSON.stringify(jsonRequestBody),
        headers: {'Content-Type': 'application/json'}
    }

    await fetch("/restservices/codeword", fetchOptions).then(response => {
        if (response.ok) {
            console.log(response.status)
            console.log("Codeword is correct!\nRedirecting...");
            window.location.replace("home.html");
        } else {
            console.log(response.status)
            console.log("Codeword was incorrect, try again.");
            throw new Error(error);
        }
    }).catch((error) => {
        CODEWORD.classList.add("input-error");
    });
}

async function showMostPopularItems() {
    await fetch("restservices/product").then(e => e.json()).then(json => {
        const PRODUCT = json;
        const CONTAINER = document.getElementById("itemContainer");
        const TEMPLATE = document.getElementById("itemTile");
        let count = START_INDEX;

        for (let i = START_INDEX; i < PRODUCT.length; i++) {
            if (count <= MAX_COLUMNS - 1) {
                const NEW_ITEM = TEMPLATE.content.firstElementChild.cloneNode(true);

                NEW_ITEM.querySelector("#goToProductPage").setAttribute("href", "product.html#" + PRODUCT[i].Article_number);
                NEW_ITEM.querySelector("#itemTitle").textContent = PRODUCT[i].Title;
                NEW_ITEM.querySelector("img").src = PRODUCT[i].Image;
                NEW_ITEM.querySelector("#itemDescription").textContent = shortDescription(PRODUCT[i].Description, 75);
                // NEW_ITEM.querySelector("#removeProductButton").textContent = "x";

                CONTAINER.appendChild(NEW_ITEM);
                count++;
            }
        }
    }).catch(error => console.log(error));
}

async function showAllItems() {
    await fetch("restservices/product").then(e => e.json()).then(json => {
        const PRODUCT = json;
        const CONTAINER = document.getElementById("itemContainer");
        const TEMPLATE = document.getElementById("itemTile");

        for (let i = START_INDEX; i < PRODUCT.length; i++) {
            const NEW_ITEM = TEMPLATE.content.firstElementChild.cloneNode(true);

            NEW_ITEM.querySelector("#goToProductPage").setAttribute("href", "product.html#" + PRODUCT[i].Article_number);
            NEW_ITEM.querySelector("#itemTitle").textContent = PRODUCT[i].Title;
            NEW_ITEM.querySelector("img").src = PRODUCT[i].Image;
            NEW_ITEM.querySelector("#itemDescription").textContent = shortDescription(PRODUCT[i].Description, 75);
            // NEW_ITEM.querySelector("removeProductButton").textContent = "x";

            CONTAINER.appendChild(NEW_ITEM);
        }
    }).catch(error => console.log(error));
}

 function registerNewAccount() {
    const USERNAME = document.getElementById("usernameField");
    const EMAIL = document.getElementById("emailField");
    const PASSWORD = document.getElementById("passwordField");

    let jsonRequestBody = {
        "username": USERNAME.value,
        "email": EMAIL.value,
        "password": PASSWORD.value
    }

    let fetchOptions = {
        method: "POST",
        body: JSON.stringify(jsonRequestBody),
        headers: {'Content-Type': 'application/json'}
    }

    fetch('restservices/account/create', fetchOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            console.log(response.status)
            console.log("Registration is succesful!\nRedirecting...")
            return window.location.replace("login.html");
        })
        .catch((error) => {
            const STATUS_ALREADY_EXISTS = 409;
            let message = error;

            if (Number(error.message) === STATUS_ALREADY_EXISTS) {
                message = "An account with that username already exists!";
            }
            //TODO: Errors are now logged in console, but make it user-friendly by showing it on page
            throw new Error(message);
        });
}

// function loginToAccount() {
//     const USERNAME = document.getElementById("loginUsername");
//     const PASSWORD = document.getElementById("loginPassword");
//
//     let jsonRequestBody = {
//         "username": USERNAME.value,`
//         "password": PASSWORD.value
//     }
//
//     let fetchOptions = {
//         method: "POST",
//         body: JSON.stringify(jsonRequestBody),
//         headers: {'Content-Type': 'application/json'}
//     }
//
//     fetch('restservices/account/login', fetchOptions)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.status);
//             }
//
//             //TODO: Receive JWT token and save to localstorage so you have a different state? (USE BATTLESNAKE)
//
//             return console.log(response.status + "\nSuccesful login.")
//             // return window.location.replace("login.html");
//         })
//         .catch((error) => {
//             const STATUS_BAD_LOGIN = 401;
//             let message = error;
//
//             if (Number(error.message) === STATUS_BAD_LOGIN) {
//                 message = "Account doesn't exist!";
//             }
//             //TODO: Errors are now logged in console, but make it user-friendly by showing it on page
//             throw new Error(message);
//         })
// }

function changePassword() {
    const OLD_PASSWORD = document.getElementById("oldpassword")
    const NEW_PASSWORD = document.getElementById("newpassword")
    const LOCAL_TOKEN = window.sessionStorage.getItem("myJWT")
    const URL = "restservices/account/editpassword";

    let jsonRequestBody = {
        "oldpassword": OLD_PASSWORD.value,
        "newpassword": NEW_PASSWORD.value
    }

    console.log(jsonRequestBody);

    let fetchOptions = {
        method: "PUT",
        body: JSON.stringify(jsonRequestBody),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + LOCAL_TOKEN
        }
    }

    fetch(URL, fetchOptions)
        .then(response => {
            if (response.ok) {
                console.log("Password succesfully modified")
            }
            // Do something else, like throw an error...
            else throw "Wrong password"
        }).catch(error => console.log(error))
}

function showItem() {
    let ARTICLE_NUMBER = window.location.hash[1]
    const URL = "restservices/product/" + ARTICLE_NUMBER;

    let PRODUCT_TITLE_ELEMENT = document.getElementById("title")
    let PRODUCT_IMAGE_ELEMENT = document.getElementById("image")
    let PRODUCT_DESC_ELEMENT = document.getElementById("description")

    fetch(URL).then(response => {
        if (response.ok) {
            return response.json()
        }
    }).then(data => {
        PRODUCT_TITLE_ELEMENT.textContent = data.titel;
        PRODUCT_IMAGE_ELEMENT.setAttribute("src", data.foto);
        PRODUCT_DESC_ELEMENT.textContent = data.beschrijving;
    })
}

function shortDescription(description, maxLength) {
    const START_INDEX = 0
    const SPACETAB = " ";

    let shorterDescription = description.slice(START_INDEX, maxLength);

    // if -1, no spaces found
    const locationOfTab = shorterDescription.lastIndexOf(SPACETAB);

    shorterDescription = shorterDescription.slice(START_INDEX, locationOfTab) + "...";

    return shorterDescription;
}

// Source: https://css-tricks.com/in-page-filtered-search-with-vanilla-javascript/
function liveSearch() {
    // Locate the card elements
    let cards = document.querySelectorAll('.searchable')
    // Locate the search input
    let search_query = document.getElementById("searchbox").value;
    // Loop through the cards
    for (var i = 0; i < cards.length; i++) {
        // If the text is within the card...
        if(cards[i].innerText.toLowerCase()
            // ...and the text matches the search query...
            .includes(search_query.toLowerCase())) {
            // ...remove the `.is-hidden` class.
            cards[i].classList.remove("is-hidden");
        } else {
            // Otherwise, add the class.
            cards[i].classList.add("is-hidden");
        }
    }
}

/*
* EventListeners
*/

if (CODEWORD_FORM){
    CODEWORD_FORM.addEventListener("submit", function(event) {
        event.preventDefault();
        sendJsonData();
    });
}

if (REGISTER_FORM) {
    REGISTER_FORM.addEventListener("submit", function(event) {
        event.preventDefault();
        registerNewAccount();
    })
}

if (LOGIN_FORM) {
    LOGIN_FORM.addEventListener("submit", function(event) {
        event.preventDefault();
        loginToAccount();
    })
}

if (MODIFY_PASSWORD_FORM){
    MODIFY_PASSWORD_FORM.addEventListener("submit", function(event) {
        event.preventDefault();
        changePassword();
    });
}

if (searchInput) {
    searchInput.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(liveSearch, typeInterval);
    });
}