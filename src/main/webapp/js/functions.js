/*
* Constants
*/

const START_INDEX = 0;
const MAX_COLUMNS = 3;

const CODEWORD_FORM = document.getElementById("postcodeword")
const REGISTER_FORM = document.getElementById("registerForm")
const LOGIN_FORM = document.getElementById("loginForm")
const MODIFY_PASSWORD_FORM = document.getElementById("modifyPasswordForm")

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

                NEW_ITEM.querySelector("#itemTitle").textContent = PRODUCT[i].Title;
                NEW_ITEM.querySelector("img").src = PRODUCT[i].Image;
                NEW_ITEM.querySelector("#itemDescription").textContent = PRODUCT[i].Description;

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

            NEW_ITEM.querySelector("#itemTitle").textContent = PRODUCT[i].Title;
            NEW_ITEM.querySelector("img").src = PRODUCT[i].Image;
            NEW_ITEM.querySelector("#itemDescription").textContent = PRODUCT[i].Description;

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
                message = "Account already exists!";
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
//         "username": USERNAME.value,
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
    const URL = "http://localhost:8080/restservices/account/editpassword";

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
