export default class ProductService {
    //TODO: Functies...
    async addProduct(number, title, image, description) {
        const toBase64 = image => new Promise((resolve, reject) => {
            if (image === undefined) resolve("");

            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.addEventListener("load", () => resolve(reader.result));
            reader.addEventListener("error", error => reject(error));
        });

        const URL = 'http://localhost:8080/restservices/product/add'
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
            } else throw "Something went wrong with adding the product"
        }).catch(error => console.log(error));
    }
}