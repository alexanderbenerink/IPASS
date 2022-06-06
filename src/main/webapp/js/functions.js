async function sendJsonData(event) {
    const codeword = document.getElementById("codeword")

    let jsonRequestBody = {
        "codeword": codeword.value
    };

    let fetchOptions = {
        method: "POST",
        body: JSON.stringify(jsonRequestBody),
        headers: {'Content-Type': 'application/json'}
    }

    fetch("/restservices/codeword", fetchOptions).then(response => {
        if (response.ok) {
            console.log(response.status)
            console.log("Codeword is correct!\nRedirecting...");
            window.location.replace("home.html");
        } else {
            console.log(response.status)
            console.log("Codeword was incorrect, try again.");
        }
    });
}