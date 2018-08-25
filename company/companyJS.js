const httprequest = new XMLHttpRequest;
const url = location.search.split("?");
const id = url[1].split("=")[1];
httprequest.open("GET", "http://localhost:2000/getItem_CompanyById?id=" + id);
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
    const col = ["Name", "Description"];

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
                x.href = "../item/item.html?id=" + prices[i].id;
                x.innerHTML = prices[i].name.split("+").join(" ");
                tabCell.appendChild(x);
            }
            else {
                tabCell.innerHTML = prices[i].description.split("+").join(" ");
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
    if (json.logo !== "null") {
        img.src = "data:image/png;base64," + json.logo;
    }

    const name = document.getElementById("name");
    name.innerHTML = json.name.split("+").join(" ");

    const descr = document.getElementById("description");
    if (json.description === "null") {
        descr.innerHTML = "No description yet";
    } else {
        descr.innerHTML = json.description.split("+").join(" ");
    }


}

function createEverything(json) {
    general(json);
    items(json.items);
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
            if (description === "") {
                document.getElementById("description").value = "No description yet";
            } else {
                document.getElementById("description").innerHTML = description;
            }
            document.getElementById("name").innerHTML = name;
        }
    }

    const button2 = document.createElement("button");
    button2.innerHTML = "Decline";
    button2.setAttribute("class", "btn btn-danger");
    button2.onclick = decline;
    button2.style.marginTop = "10px";
    button2.style.marginLeft = "10px";

    function decline(){
        edit.innerHTML = before;

    }

    edit.innerHTML =
        "<input  id='nameInput' value='" + document.getElementById("name").innerHTML + "' type=\"text\" class=\"form-control\"> " +
        "<textarea id='descriptionInput'  class=\"form-control\">" + document.getElementById("description").innerHTML + "</textarea>";


    edit.appendChild(button);
    edit.appendChild(button2);


}

function save() {
    if (confirm("Do you really want to save the logo, the description and the name?")) {
        const name = document.getElementById("name").innerHTML.split(" ").join("+");
        const description = document.getElementById("description").innerHTML.split(" ").join("+");
        const img = document.getElementById("logo").src.split(";base64,")[1];

        const id = location.search.split("?")[1].split("=")[1];

        const httprequest = new XMLHttpRequest();
        httprequest.open("GET", "http://localhost:2000/updateItem_Company?name=" + name + "&logo=" + img + "&id=" + id + "&description=" + description);
        httprequest.send();
    }
}

function deleteSupermarket() {
    if (confirm("Do you really want to request a deletion of the supermarket via email?")) {
        window.location.href = "mailto:supermarket.comparer@gmail.com";
    }
}