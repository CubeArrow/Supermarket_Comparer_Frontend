const httpRequest = new XMLHttpRequest();
httpRequest.open("GET", "http://localhost:2000/getCountries");
httpRequest.send();
httpRequest.onreadystatechange = function () {
    if (httpRequest.status === 200 && httpRequest.readyState === 4) {
        document.getElementById("container").appendChild(createCountriesTable(JSON.parse(httpRequest.responseText)));
    }
    if (httpRequest.status === 404 && httpRequest.readyState === 4) {
        document.getElementById("p").innerHTML = JSON.parse(httpRequest.responseText).error;
    }
};

function createCountriesTable(jsonObj) {
    let i;
    const col = ["Name", "Flag"];

    const table = createTable(col);


    for (i = 0; i < jsonObj.length; i++) {

        const tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            const tabCell = tr.insertCell(-1);
            if (col[j] === "Flag") {
                const flag = jsonObj[i].flag;
                if (flag === "null") {
                    tabCell.innerHTML = "No flag yet";
                } else {
                    tabCell.innerHTML = "<img style='height:30px;' src='data:image/png;base64," + flag + "' alt='Flag'>";
                }
            } else {
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "country.html?id=" + jsonObj[i].id;
                x.innerHTML = jsonObj[i].name.split("+").join(" ");
                tabCell.appendChild(x);
            }
        }
    }
    table.setAttribute("class", "table");

    return table;
}


