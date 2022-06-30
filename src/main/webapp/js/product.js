
/*
* Imports
*/
import ProductService from "./product-service.js";

/*
* Constants & variables
*/

let service = new ProductService();
const PRODUCT_FORM = document.forms.addProductForm;
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
        service.addProduct(PRODUCT_FORM.articlenumber.value, PRODUCT_FORM.title.value, PRODUCT_FORM.image.value, PRODUCT_FORM.description.value).then(() => {
            console.log("Refreshed.")
        });
    })
}

refresh();