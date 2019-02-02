const url = location.search.split("?");
const id = url[1].split("=")[1];

const httpRequest = new XMLHttpRequest;
httpRequest.open("GET", "http://localhost:2000/getPrices?itemId=" + id);
httpRequest.send();
httpRequest.onreadystatechange = function () {
    if (httpRequest.status === 200 && httpRequest.readyState === 4) {
        createEverything(httpRequest.responseText);
    }

    if (httpRequest.status === 404 && httpRequest.readyState === 4) {
        const h = document.createElement("p");
        h.class = "lead";
        h.innerHTML = JSON.parse(httpRequest.responseText).error;
        document.getElementById("container").appendChild(h);

    }
};


function items(prices) {
    let i;
    const col = ["Price", "Supermarket", "Logo"];

    const table = document.createElement("table");

    let tr = table.insertRow(-1);

    for (i = 0; i < col.length; i++) {
        const th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }


    for (i = 0; i < prices.length; i++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            const tabCell = tr.insertCell(-1);

            if (col[j] === "Supermarket") {
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");
                x.href = "../supermarket/supermarket.html?id=" + prices[i].supermarketId;
                x.innerHTML = prices[i].supermarketName.split("+").join(" ");
                tabCell.appendChild(x);
            } else if (col[j] === "Logo") {
                const supermarketLogo = prices[i].supermarketLogo;
                if (supermarketLogo === "null") {
                    tabCell.innerHTML = "No logo yet";
                } else {
                    tabCell.innerHTML = "<img style='height:30px;' src='data:image/png;base64," + supermarketLogo + "' alt='Logo'>";
                }
            } else {
                tabCell.innerHTML = prices[i].price;
            }
        }
    }
    table.setAttribute("class", "table");

    document.getElementById("section2").appendChild(table)
}


function general(json) {
    const picker = document.getElementById('picker');
    picker.addEventListener('change', function (evt) {
        handleFileSelect(evt, "logo");
    }, false);

    const img = document.getElementById("logo");
    const companyLogo = json.companyLogo;
    if (companyLogo !== "null") {
        img.src = "data:image/png;base64," + companyLogo;
    }

    const name = document.getElementById("name");
    name.innerHTML = json.name.split("+").join(" ");

    const descr = document.getElementById("description");
    if (json.description === "null") {
        descr.innerHTML = "No description yet";
    } else {
        descr.innerHTML = json.description.split("+").join(" ").split("\\n").join("<br>");
    }
    getCompaniesInSelect(json);
}

function getCompaniesInSelect(json) {
    const http = new XMLHttpRequest();
    http.open("GET", "http://localhost:2000/getItem_Companies");
    http.send();
    http.onreadystatechange = function () {
        if (http.status === 200 && http.readyState === 4) {
            const json2 = JSON.parse(http.responseText);
            const company = document.getElementById("company");
            const x = document.createElement("option");
            x.innerHTML = json.companyName;
            company.appendChild(x);
            for (let i = 0; i < json2.length; i++) {
                const y = document.createElement("option");
                y.value = json2[i].id;
                y.innerHTML = json2[i].name;
                company.appendChild(y);

            }
        }
    };
}

function createEverything(json) {
    general(JSON.parse(json.split("::::")[0]));
    items(JSON.parse(json.split("::::")[1]));
}

function edit() {
    const edit = document.getElementById("edit");
    const before = edit.innerHTML;

    const button = document.createElement("button");
    button.innerHTML = "Apply";
    button.setAttribute("class", "btn btn-success");
    button.style.marginTop = "10px";

    button.onclick = apply;

    function apply() {
        const name = document.getElementById("nameInput").value;
        const description = document.getElementById("descriptionInput").value;


        edit.innerHTML = before;
        if (!(name === "")) {
            document.getElementById("name").innerHTML = name;
        }
        if (!(description === "")) {
            document.getElementById("description").innerHTML = description.split("\n").join("<br>");
        }
    }

    const button2 = document.createElement("button");
    button2.innerHTML = "Decline";
    button2.setAttribute("class", "btn btn-danger");
    button2.onclick = decline;
    button2.style.marginTop = "10px";
    button2.style.marginLeft = "10px";

    function decline() {
        edit.innerHTML = before;

    }

    edit.innerHTML = "<input  id='nameInput' value='" + document.getElementById("name").innerHTML + "' type=\"text\" class=\"form-control\"> <br>" +
        "<textarea id='descriptionInput' class='form-control'>" + document.getElementById("description").innerHTML.split("<br>").join("\n") + "</textarea>";


    edit.appendChild(button);
    edit.appendChild(button2);


}

//const img = document.getElementById("flag").src.split(";base64,")[1];

function save() {
    if (confirm("Do you really want to save the description and the name?")) {
        const name = document.getElementById("name").innerHTML;
        const descr = document.getElementById("description").innerHTML.split("<br>").join("\\n");

        const id = location.search.split("?")[1].split("=")[1];

        const httprequest = new XMLHttpRequest();
        httprequest.open("GET", encodeURI("http://localhost:2000/updateItem?name=" + name + "&description=" + descr + "&id=" + id));
        httprequest.setRequestHeader("access-control-allow-origin", "*");

        httprequest.send();
    }
}

function deleteSupermarket() {
    if (confirm("Do you really want to request a deletion of the supermarket via email?")) {
        window.location.href = "mailto:supermarket.comparer@gmail.com";
    }
}