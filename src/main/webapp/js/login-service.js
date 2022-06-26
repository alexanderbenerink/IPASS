export default class LoginService {
    isLoggedIn() {
        //TODO: hoe ga je bepalen of iemand ingelogd is (geweest)?
        // Je kan wanneer een token wordt gegenereerd opslaan als gebruikersattribuut & dan met elkaar vergelijken.
        // Je kan ook...
        const LOCAL_TOKEN = window.sessionStorage.getItem("myJWT");
        return LOCAL_TOKEN !== null;
    }

    login(user, password) {
        //TODO: inloggen met POST
        // return Promise.resolve();

        let jsonRequestBody = {
            "username": user,
            "password": password
        };

        console.log(jsonRequestBody)

        let fetchOptions = {
            method: "POST",
            body: JSON.stringify(jsonRequestBody),
            headers: {'Content-Type': 'application/json'}
        }

        const URL = "http://localhost:8080/restservices/authentication";
        return fetch(URL, fetchOptions)
            .then(response => {
                if (response.ok) {
                    console.log(response.status)
                    console.log("Login is succesful!\nRedirecting...")
                    //TODO: Redirect to home page and make login/registration page inaccessible
                    return response.json();
                } else throw "Wrong username/password";
            })
            .then(myJson => {
                window.sessionStorage.setItem("myJWT", myJson.JWT);
                window.location.replace("home.html");
            })
            .catch(error => console.log(error))
    }

    getUser() {
        //TODO: deze GET method test je token op server-side problemen. Je kunt client-side op zich wel 'ingelogd' zijn
        //maar het zou altijd zomaar kunnen dat je token verlopen is, of dat er server-side iets anders aan de hand is.
        //Dus het is handig om te checken met een -echte fetch- of je login-token wel echt bruikbaar is.
        // return Promise.resolve(null);
        const LOCAL_TOKEN = window.sessionStorage.getItem("myJWT");
        const URL = "http://localhost:8080/restservices/authorization/getuser";

        let fetchOptions = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + LOCAL_TOKEN
            }
        }
        return fetch(URL, fetchOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else throw `(${response.status}) Could not log in!`
            }).catch(error => console.log(error));
    }

    logout() {
        //TODO: hoe ga je eigenlijk iemand 'uitloggen'?
        window.sessionStorage.removeItem("myJWT");
        return Promise.resolve(true);
    }
}
