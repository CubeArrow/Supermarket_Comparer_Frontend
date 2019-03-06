const url = location.search.split("?");
const id = url[1].split("=")[1];

const httpRequest = new XMLHttpRequest;
httpRequest.open("GET", "http://localhost:2000/getCountryById?id=" + id);
httpRequest.send();
httpRequest.onreadystatechange = function () {
    if (httpRequest.status === 200 && httpRequest.readyState === 4) {
        createEverything(JSON.parse(httpRequest.responseText));
    }
    handle404Error(httpRequest, document.getElementById("container"));
};

function createEverything(json) {
    general(json);
    items(json.supermarkets);
}

function items(prices) {
    let i;
    const col = ["Name", "Logo"];

    const table = createTable(col);



    for (i = 0; i < prices.length; i++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            const tabCell = tr.insertCell(-1);

            if (col[j] === "Name") {
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");
                x.href = "../supermarket/supermarket.html?id=" + prices[i].id;
                x.innerHTML = prices[i].name.split("+").join(" ");
                tabCell.appendChild(x);
            } else if (col[j] === "Logo") {
                const logo = prices[i].logo;
                if (logo === "null") {
                    tabCell.innerHTML = "No logo yet";
                } else {
                    tabCell.innerHTML = "<img style='height:30px;' src='data:image/png;base64," + logo + "' alt='Logo'>";
                }
            }
        }
    }
    table.setAttribute("class", "table");

    document.getElementById("section2").appendChild(table)
}

function general(json) {
    const picker = document.getElementById('picker');
    picker.addEventListener('change', function (evt) {
        handleFileSelect(evt, "flag");
    }, false);

    document.getElementById('picker').addEventListener('change', handleFileSelect, false);


    const img = document.getElementById("flag");
    const flag = json.flag;
    if (flag !== "null") {
        img.src = "data:image/png;base64," + flag;
    }

    const name = document.getElementById("name");
    name.innerHTML = json.name.split("+").join(" ");


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

        edit.innerHTML = before;
        if (!(name === "")) {
            document.getElementById("name").innerHTML = name;
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

    edit.innerHTML = "<input  id='nameInput' value='" + document.getElementById("name").innerHTML + "' type=\"text\" class=\"form-control\">";


    edit.appendChild(button);
    edit.appendChild(button2);


}

function save() {
    if (confirm("Do you really want to save the logo and the name?")) {
        const name = document.getElementById("name").innerHTML.split(" ").join("+");
        const img = document.getElementById("flag").src.split(";base64,")[1];

        const id = location.search.split("?")[1].split("=")[1];

        const httprequest = new XMLHttpRequest();
        httprequest.open("GET", "http://localhost:2000/updateCountry?name=" + name + "&flag=" + img + "&id=" + id);
        httprequest.send();
    }
}

function deleteSupermarket() {
    if (confirm("Do you really want to request a deletion of the supermarket via email?")) {
        window.location.href = "mailto:supermarket.comparer@gmail.com";
    }
}