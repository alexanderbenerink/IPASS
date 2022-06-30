export default class ProductService {
    //TODO: Functies...
    addProduct(number, title, image, description) {
        const URL = 'http://localhost:8080/restservices/product/add'
        const LOCAL_TOKEN = window.sessionStorage.getItem("myJWT");

        let jsonRequestBody = {
            "article_number": number,
            "title": title,
            "image": image,
            "description": description
        };

        console.log(jsonRequestBody);

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
            } else throw "Something went wrong with adding the product"
        }).catch(error => console.log(error));
    }
}