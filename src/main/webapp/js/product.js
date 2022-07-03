
/*
* Imports
*/
import ProductService from "./product-service.js";

/*
* Constants & variables
*/

let service = new ProductService();
const PRODUCT_FORM = document.forms.addProductForm;
const PRODUCT_REMOVE = document.getElementById("removeProductButton");
let ARTICLE_NUMBER = window.location.hash[1];
const ADD_TO_WISHLIST_BUTTON = document.getElementById("addToWishlistButton");
const WISHLIST_BUTTON_TEXT = document.getElementById("wishlistButtonText");
const WISHLIST_DIV = document.getElementById("displayWishList");
const DISPLAY_USER_RESERVATIONS = document.getElementById("displayUserReservations");
const BOOK_PRODUCT_BUTTON = document.getElementById("bookProduct");
const BOOK_PRODUCT_TEXT = document.getElementById("bookProductText");
// const PRODUCT_NR = document.getElementById("productArticleNumber").value;
// const PRODUCT_TITLE = document.getElementById("productTitle").value;
// const PRODUCT_IMG = document.getElementById("productImage").value;
// const PRODUCT_DESC = document.getElementById("productDescription").value;

/*
* Functions
*/

function refresh() {

}

/*
* EventListeners
*/

if (PRODUCT_FORM) {
    PRODUCT_FORM.addEventListener("submit", e => {
        e.preventDefault();
        service.addProduct(PRODUCT_FORM.articlenumber.value, PRODUCT_FORM.title.value, PRODUCT_FORM.image.files[0], PRODUCT_FORM.description.value).then(() => {
            console.log("Refreshed.")
        });
    })
}

if (PRODUCT_REMOVE && ARTICLE_NUMBER) {
    PRODUCT_REMOVE.addEventListener("click", e => {
        e.preventDefault();
        if (confirm("\nAre you sure you want to remove this product?")) {
            service.removeProduct(ARTICLE_NUMBER)
        }
    })
}

if (ADD_TO_WISHLIST_BUTTON && ARTICLE_NUMBER) {
    service.getProductFromWishlist(ARTICLE_NUMBER).then(response => {
        if (response) {
            WISHLIST_BUTTON_TEXT.textContent = "♥"
            ADD_TO_WISHLIST_BUTTON.classList.add("wishlisted")
            ADD_TO_WISHLIST_BUTTON.title = "Remove from wishlist"
        } else {
            WISHLIST_BUTTON_TEXT.textContent = "♡"
            ADD_TO_WISHLIST_BUTTON.classList.remove("wishlisted")
            ADD_TO_WISHLIST_BUTTON.title = "Add to wishlist"
        }
    });

    ADD_TO_WISHLIST_BUTTON.addEventListener("click", e => {
        e.preventDefault();
        service.addProductToWishlist(ARTICLE_NUMBER).then(response => {
            if (response) {
                WISHLIST_BUTTON_TEXT.textContent = "♥"
                ADD_TO_WISHLIST_BUTTON.classList.add("wishlisted")
                ADD_TO_WISHLIST_BUTTON.title = "Remove from wishlist"
            } else {
                WISHLIST_BUTTON_TEXT.textContent = "♡"
                ADD_TO_WISHLIST_BUTTON.classList.remove("wishlisted")
                ADD_TO_WISHLIST_BUTTON.title = "Add to wishlist"
            }
        })
    })
}

if (WISHLIST_DIV) {
    service.getWishlist();
}

if (BOOK_PRODUCT_BUTTON && BOOK_PRODUCT_TEXT && ARTICLE_NUMBER) {
    service.getBookingFromBookings(ARTICLE_NUMBER).then(response => {
        if (response) {
            BOOK_PRODUCT_TEXT.textContent = "Unbook this product";
            BOOK_PRODUCT_BUTTON.classList.add("booked");
        } else {
            BOOK_PRODUCT_TEXT.textContent = "Book this product";
            BOOK_PRODUCT_BUTTON.classList.remove("booked");
        }
    });

    BOOK_PRODUCT_BUTTON.addEventListener("click", e => {
        e.preventDefault();
        service.bookProduct(ARTICLE_NUMBER).then(response => {
            if (response) {
                BOOK_PRODUCT_TEXT.textContent = "Unbook this product";
                BOOK_PRODUCT_BUTTON.classList.add("booked");
            } else {
                BOOK_PRODUCT_TEXT.textContent = "Book this product";
                BOOK_PRODUCT_BUTTON.classList.remove("booked");
            }
        })
    })
}

if (DISPLAY_USER_RESERVATIONS) {
    service.getBookingsFromUser();
}

refresh();