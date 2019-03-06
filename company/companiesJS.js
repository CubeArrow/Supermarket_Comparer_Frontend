const httpRequest = new XMLHttpRequest();
httpRequest.open("GET", "http://localhost:2000/getItem_Companies");
httpRequest.send();
httpRequest.onreadystatechange = function () {
    if (httpRequest.status === 200 && httpRequest.readyState === 4) {
        document.getElementById("container").appendChild(createCompaniesTable(JSON.parse(httpRequest.responseText)));
        document.getElementById("companyLogo").addEventListener('change', function (event) {
            handleFileSelect(event, "logo")
        }, false);
    }
    handle404Error(httpRequest, document.getElementById("container"));
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
                displayDescriptionFromJsonInTabCell(jsonObj, i, tabCell);
            }
        }
    }
    table.setAttribute("class", "table");

    return table;
}

function createNewCompany() {
    const companyName = document.getElementById("companyName").value;
    let companyDescription = document.getElementById("companyDescription").value;
    const logoInput = document.getElementById("logo");


    if (companyDescription === "")
        companyDescription = "null";


    const http = new XMLHttpRequest();
    http.open("GET", "http://localhost:2000/addItem_company?name=" + companyName + "&description=" + companyDescription
    + "&logo=" + logoInput.src.split(";base64,")[1]);
    http.setRequestHeader("Access-Control-Allow-Origin", "*");
    http.send();
    http.onreadystatechange = function () {
        if (http.status === 200 && http.readyState === 4) {
            alert(JSON.parse(http.responseText).result)
        }
    }
}

function openOverlay() {
    const overlay = document.getElementById("addCompanyOverlay");
    overlay.style.display = "block";
}

function closeOverlay() {
    document.getElementById("addCompanyOverlay").style.display = "none";
}