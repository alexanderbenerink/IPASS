export default class LoginService {
    /**
     * Check if user is logged in
     * @returns {Promise<void>}
     */
    isLoggedIn() {
        const LOCAL_TOKEN = window.sessionStorage.getItem("myJWT");
        return LOCAL_TOKEN !== null;
    }

    /**
     * Log user in
     * @param {string} user username
     * @param {string} password password
     * @returns {Promise<void>}
     */
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

        const URL = "restservices/authentication";
        return fetch(URL, fetchOptions)
            .then(response => {
                if (response.ok) {
                    console.log(response.status)
                    console.log("Login is succesful!\nRedirecting...")
                    return response.json();
                } else throw "Wrong username/password";
            })
            .then(myJson => {
                window.sessionStorage.setItem("myJWT", myJson.JWT);
                window.location.replace("home.html");
            })
            .catch(error => console.log(error))
    }

    /**
     * Verify user login token
     * @returns {Promise<void>}
     */
    getUser() {
        const LOCAL_TOKEN = window.sessionStorage.getItem("myJWT");
        const URL = "restservices/authorization/getuser";

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

    /**
     * Log user out
     * @returns {Promise<void>}
     */
    logout() {
        window.sessionStorage.removeItem("myJWT");
        return Promise.resolve(true);
    }
}
