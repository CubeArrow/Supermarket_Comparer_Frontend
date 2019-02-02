const httpRequest = new XMLHttpRequest();
httpRequest.open("GET", "http://localhost:2000/getItem_Companies");
httpRequest.send();
httpRequest.onreadystatechange = function () {
    if (httpRequest.status === 200 && httpRequest.readyState === 4) {
        document.getElementById("container").appendChild(createCompaniesTable(JSON.parse(httpRequest.responseText)));
    }
    if (httpRequest.status === 404 && httpRequest.readyState === 4) {
        const h = document.createElement("p");
        h.class = "lead";
        h.innerHTML = JSON.parse(httpRequest.responseText).error;
        document.getElementById("container").appendChild(h);

    }
};

function createCompaniesTable(jsonObj) {
    let i;
    const col = ["Name", "Description", "Logo"];

    const table = createTable(col);

    for (i = 0; i < jsonObj.length; i++) {

        const tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            const tabCell = tr.insertCell(-1);
            if (col[j] === "Logo") {
                const logo = jsonObj[i].logo;
                if (logo === "null") {
                    tabCell.innerHTML = "No logo yet";
                } else {
                    tabCell.innerHTML = "<img style='height:30px;' src='data:image/png;base64," + logo + "' alt='Logo'>";
                }
            } else if (col[j] === "Name") {
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "company.html?id=" + jsonObj[i].id;
                x.innerHTML = jsonObj[i].name.split("+").join(" ");
                tabCell.appendChild(x);
            } else {
                if (jsonObj[i].description === "null") {
                    tabCell.innerHTML = "There is no description yet";
                } else {
                    tabCell.innerHTML = jsonObj[i].description.split("+").join(" ");
                }
            }
        }
    }
    table.setAttribute("class", "table");

    return table;
}


