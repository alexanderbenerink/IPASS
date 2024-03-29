export default class ProductService {

    /**
     * Add a product
     * @param {int} number product article number
     * @param {string} title product title
     * @param {string} image product image
     * @param {string} description product description
     * @returns {Promise<void>}
     */
    async addProduct(number, title, image, description) {
        const toBase64 = image => new Promise((resolve, reject) => {
            if (image === undefined) resolve("");

            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.addEventListener("load", () => resolve(reader.result));
            reader.addEventListener("error", error => reject(error));
        });

        const URL = 'restservices/product/add'
        const LOCAL_TOKEN = window.sessionStorage.getItem("myJWT");


        let jsonRequestBody = {
            "article_number": number,
            "title": title,
            "image": await toBase64(image),
            "description": description
        };

        let fetchOptions = {
            method: "POST",
            body: JSON.stringify(jsonRequestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + LOCAL_TOKEN
            }
        };

        return fetch(URL, fetchOptions).then(response => {
            if (response.ok) {
                console.log("Product has been succesfully added!");
                return location.replace("product.html#" + number);
            } else throw "Something went wrong with adding the product"
        }).catch(error => console.log(error));
    }

    /**
     * Add a product to the user wishlist
     * @param {int} number article number of the product needed to add to the wishlist
     * @returns {Promise<void>}
     */
    addProductToWishlist(number) {
        const URL = 'restservices/product/addtowishlist';
        const LOCAL_TOKEN = window.sessionStorage.getItem("myJWT");

        let jsonRequestBody = {
            "article_number": number
        };

        let fetchOptions = {
            method: "POST",
            body: JSON.stringify(jsonRequestBody),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + LOCAL_TOKEN
            }
        }

        return fetch(URL, fetchOptions).then(response => {
            if (response.ok) {
                return response.json();
            } else throw response.status + " Something wrong happened"
        }).then(data => {
            return data.success === "Product has been added to your wishlist!";
        }).catch(error => console.log(error));

    }

    /**
     * Get the user wishlist
     * TODO: Add seperation of concern by only returning the promise
     * @returns {Promise<void>}
     */
    getWishlist() {
        const URL = 'restservices/product/wishlist';
        const LOCAL_TOKEN = window.sessionStorage.getItem("myJWT");

        let fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + LOCAL_TOKEN
            }
        }

        return fetch(URL, fetchOptions).then(response => {
            if (response.ok) {
                console.log("Succes fetching wishlist...")
                return response.json();
            } else {
                document.getElementById("no-wishlist").textContent = "Nothing wishlisted yet."
                throw response.status + " Something wrong happened."
            }
        }).then(data => {
            console.log(data);
            const START_INDEX = 0;
            const PRODUCT = data;
            const CONTAINER = document.getElementById("itemContainer");
            const TEMPLATE = document.getElementById("itemTile");

            if (PRODUCT.length !== 0) {
                for (let i = START_INDEX; i < PRODUCT.length; i++) {
                    const NEW_ITEM = TEMPLATE.content.firstElementChild.cloneNode(true);

                    NEW_ITEM.querySelector("#goToProductPage").setAttribute("href", "product.html#" + PRODUCT[i].artikelnummer);
                    NEW_ITEM.querySelector("#itemTitle").textContent = PRODUCT[i].titel;
                    NEW_ITEM.querySelector("img").src = PRODUCT[i].foto;
                    NEW_ITEM.querySelector("#itemDescription").textContent = "";
                    // NEW_ITEM.querySelector("removeProductButton").textContent = "x";

                    CONTAINER.appendChild(NEW_ITEM);
                }
            } else {
                document.getElementById("no-wishlist").textContent = "Nothing wishlisted yet."
            }
        }).catch(error => console.log(error))
    }

    /**
     * Remove a product
     * @param {int} number article number of the product needed to remove
     * @returns {Promise<void>}
     */
    removeProduct(number) {
        const URL = "restservices/product/remove/" + number;
        const LOCAL_TOKEN = window.sessionStorage.getItem("myJWT");

        let fetchOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + LOCAL_TOKEN
            }
        }

        fetch(URL, fetchOptions).then(response => {
            if (response.ok) {
                // Log response
                console.log(response.status)
                console.log("Succesfully removed the product")
                // then refresh
                return location.replace("products.html")
            } else throw "Something wrong happened."
        }).catch(error => console.log(error))
    }

    /**
     * Get a product from the user wishlist
     * @param {int} number article number of the product needed in order to fetch it
     * @returns {Promise<void>}
     */
    getProductFromWishlist(number) {
        const URL = "restservices/product/wishlist/" + number;
        const LOCAL_TOKEN = window.sessionStorage.getItem("myJWT");

        let fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + LOCAL_TOKEN
            }
        }

        return fetch(URL, fetchOptions).then(response => {
            if (response.ok) {
                return response.json();
            } else throw "Product not in wishlist"
        }).then(data => {
            return data.success === "This product is in your wishlist";
        }).catch(error => console.log(error))
    }

    /**
     * Book a product
     * @param {int} number article number of the product needed in order to book it
     * @returns {Promise<void>}
     */
    bookProduct(number) {
        const URL = 'restservices/book/bookproduct';
        const LOCAL_TOKEN = window.sessionStorage.getItem("myJWT");

        // const TODAY = new Date();
        // const DATE = TODAY.getDate() + "-" + (TODAY.getMonth() + 1) + "-" + TODAY.getFullYear();
        // const TIME = TODAY.getHours() + ":" + TODAY.getMinutes() + ":" + TODAY.getSeconds();
        // const DATE_TIME = DATE + " " + TIME;

        let jsonRequestBody = {
            "article_number": number
            // "datetime": DATE_TIME
        };

        let fetchOptions = {
            method: "POST",
            body: JSON.stringify(jsonRequestBody),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + LOCAL_TOKEN
            }
        }

        return fetch(URL, fetchOptions).then(response => {
            if (response.ok) {
                return response.json();
            } else throw response.status + " Something wrong happened"
        }).then(data => {
            return data.success === "Booking has been made";
        }).catch(error => console.log(error));
    }

    /**
     * Get a booking from the user for verification
     * @param {int} number product article number
     * @returns {Promise<void>}
     */
    getBookingFromBookings(number) {
        const URL = "restservices/book/" + number;
        const LOCAL_TOKEN = window.sessionStorage.getItem("myJWT");

        let fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + LOCAL_TOKEN
            }
        }

        return fetch(URL, fetchOptions).then(response => {
            if (response.ok) {
                return response.json();
            } else throw "Product has not yet been booked"
        }).then(data => {
            return data.success === "This product has already been booked";
        }).catch(error => console.log(error))
    }

    /**
     * Get all bookings from the user
     * @returns {Promise<void>}
     */
    getBookingsFromUser() {
        const URL = 'restservices/book/user';
        const LOCAL_TOKEN = window.sessionStorage.getItem("myJWT");

        let fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + LOCAL_TOKEN
            }
        }

        return fetch(URL, fetchOptions).then(response => {
            if (response.ok) {
                console.log("Succes fetching user bookings...")
                return response.json();
            } else throw response.status + " Something wrong happened."
        }).then(data => {
            console.log(data);
            const START_INDEX = 0;
            const PRODUCT = data;
            const CONTAINER = document.getElementById("itemContainer");
            const TEMPLATE = document.getElementById("item");

            if (PRODUCT.length !== 0) {
                for (let i = START_INDEX; i < PRODUCT.length; i++) {
                    const NEW_ITEM = TEMPLATE.content.firstElementChild.cloneNode(true);

                    NEW_ITEM.querySelector("#articleNumber").textContent = PRODUCT[i].artikelnummer;
                    NEW_ITEM.querySelector("#articleName").textContent = PRODUCT[i].titel;
                    NEW_ITEM.querySelector("#articleLink").setAttribute("href", "product.html#" + PRODUCT[i].artikelnummer);
                    // NEW_ITEM.querySelector("#articleDatetime").textContent = PRODUCT[i].datetime;
                    // NEW_ITEM.querySelector("removeProductButton").textContent = "x";

                    CONTAINER.appendChild(NEW_ITEM);
                }
            } else {
                document.getElementById("no-reservations").textContent = "Nothing booked yet."
                document.getElementById("itemContainer").style = "display:none"
            }
        }).catch(error => {
            document.getElementById("no-reservations").textContent = "Nothing booked yet."
            document.getElementById("itemContainer").style = "display:none"
            console.log(error)
        })
    }

    /**
     * Get every booking made by all users
     * @returns {Promise<void>}
     */
    getAllBookings() {
        const URL = 'restservices/book/allbookings';
        const LOCAL_TOKEN = window.sessionStorage.getItem("myJWT");

        let fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + LOCAL_TOKEN
            }
        }

        return fetch(URL, fetchOptions).then(response => {
            if (response.ok) {
                console.log("Succes fetching all bookings...")
                return response.json();
            } else throw response.status + " Something wrong happened."
        }).then(data => {
            const START_INDEX = 0;
            const PRODUCT = data;
            const CONTAINER = document.getElementById("itemContainer1");
            const TEMPLATE = document.getElementById("item1");
            let EMPTY_LISTS = 0;

            if (PRODUCT.length !== 0) {
                for (let i = START_INDEX; i < PRODUCT.length; i++) {
                    if (PRODUCT[i].productList[0] != null) {
                        const NEW_ITEM = TEMPLATE.content.firstElementChild.cloneNode(true);

                        NEW_ITEM.querySelector("#articleNumber1").textContent = PRODUCT[i].productList[0].artikelnummer;
                        NEW_ITEM.querySelector("#articleName1").textContent = PRODUCT[i].productList[0].titel;
                        NEW_ITEM.querySelector("#articleLink1").setAttribute("href", "product.html#" + PRODUCT[i].productList[0].artikelnummer);
                        NEW_ITEM.querySelector("#owner").textContent = PRODUCT[i].owner.email;
                        // NEW_ITEM.querySelector("#articleDatetime").textContent = PRODUCT[i].datetime;
                        // NEW_ITEM.querySelector("removeProductButton").textContent = "x";

                        CONTAINER.appendChild(NEW_ITEM);
                    } else {
                        EMPTY_LISTS++;
                    }
                }
                if (EMPTY_LISTS === PRODUCT.length) {
                    document.getElementById("no-reservations1").textContent = "Nothing booked yet."
                    document.getElementById("itemContainer1").style = "display:none"
                }
            } else {
                document.getElementById("no-reservations1").textContent = "Nothing booked yet."
                document.getElementById("itemContainer1").style = "display:none"
            }
        }).catch(error => {
            document.getElementById("no-reservations1").textContent = "Nothing booked yet."
            document.getElementById("itemContainer1").style = "display:none"
            console.log(error)
        })
    }
}