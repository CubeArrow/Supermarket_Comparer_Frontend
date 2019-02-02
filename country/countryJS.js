const httprequest = new XMLHttpRequest;
const url = location.search.split("?");
const id = url[1].split("=")[1];
httprequest.open("GET", "http://localhost:2000/getCountryById?id=" + id);
httprequest.send();
httprequest.onreadystatechange = function () {
    if (httprequest.status === 200 && httprequest.readyState === 4) {
        createEverything(JSON.parse(httprequest.responseText));
    }
    if (httprequest.status === 404 && httprequest.readyState === 4) {
        const h = document.createElement("p");
        h.class = "lead";
        h.innerHTML = JSON.parse(httprequest.responseText).error;
        document.getElementById("container").appendChild(h);

    }
};


function items(prices) {
    let i;
    const col = ["Name", "Logo"];

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

            if (col[j] === "Name") {
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");
                x.href = "../supermarket/supermarket.html?id=" + prices[i].id;
                x.innerHTML = prices[i].name.split("+").join(" ");
                tabCell.appendChild(x);
            } else if (col[j] === "Logo") {
                if (prices[i].logo === "null") {
                    tabCell.innerHTML = "No logo yet";
                } else {
                    tabCell.innerHTML = "<img style='height:30px;' src='data:image/png;base64," + prices[i].logo + "'>";
                }
            }
        }
    }
    table.setAttribute("class", "table");

    document.getElementById("section2").appendChild(table)
}


function general(json) {
    function handleFileSelect(evt) {
        const files = evt.target.files;

        let i = 0, f;
        for (; f = files[i]; i++) {

            if (!f.type.match('image.*')) {
                continue;
            }

            const reader = new FileReader();

            reader.onload = (function () {
                return function (e) {
                    const img = document.getElementById('logo');
                    img.src = e.target.result;
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    }

    document.getElementById('picker').addEventListener('change', handleFileSelect, false);


    const img = document.getElementById("logo");
    if (json.flag !== "null") {
        img.src = "data:image/png;base64," + json.flag;
    }

    const name = document.getElementById("name");
    name.innerHTML = json.name.split("+").join(" ");


}

function createEverything(json) {
    general(json);
    items(json.supermarkets);
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
        httprequest.open("GET", "http://localhost:2000/updateCountry?name=" + name + "&logo=" + img + "&id=" + id);
        httprequest.send();
    }
}

function deleteSupermarket() {
    if (confirm("Do you really want to request a deletion of the supermarket via email?")) {
        window.location.href = "mailto:supermarket.comparer@gmail.com";
    }
}