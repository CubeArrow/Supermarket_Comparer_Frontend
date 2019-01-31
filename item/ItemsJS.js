const httprequest = new XMLHttpRequest();
httprequest.open("GET", "http://localhost:2000/getItems");
httprequest.send();
httprequest.onreadystatechange = function () {
    if (httprequest.status === 200 && httprequest.readyState === 4) {
        document.getElementById("container").appendChild(createTable(JSON.parse(httprequest.responseText)));
    } else if (httprequest.status === 404 && httprequest.readyState === 4) {
        document.getElementById("p").innerHTML = JSON.parse(httprequest.responseText).error;
    }
};

window.onclick = function (event) {
    const overlay = document.getElementById("addItemOverlay");
    if (event.target === overlay) {
        overlay.style.display = "none";
    }
};


function createTable(jsonObj) {
    let x;
    let i;
    const col = ["Name", "Description", "Company", "Logo"];


    const table = document.createElement("table");

    let tr = table.insertRow(-1);

    for (i = 0; i < col.length; i++) {
        const th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }


    for (i = 0; i < jsonObj.length; i++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            const tabCell = tr.insertCell(-1);
            if (col[j] === "Logo") {
                if (jsonObj[i].logo === "null") {
                    tabCell.innerHTML = "No flag yet";
                } else {
                    tabCell.innerHTML = "<img style='height:30px;' src='data:image/png;base64," + jsonObj[i].logo + "'>";
                }
            } else if (col[j] === "Name") {
                x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "item.html?id=" + jsonObj[i].id;
                x.innerHTML = jsonObj[i].name.split("+").join(" ");
                tabCell.appendChild(x);
            } else if (col[j] === "Company") {
                x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "../company/company.html?id=" + jsonObj[i].companyId;
                x.innerHTML = jsonObj[i].company.split("+").join(" ");
                tabCell.appendChild(x);
            } else {
                var descr = jsonObj[i].description.split("+").join(" ");

                if(descr === "null")
                    tabCell.innerHTML = "No description yet"
                else
                    tabCell.innerHTML = descr;
            }
        }
    }
    table.setAttribute("class", "table");

    return table;
}

function openOverlay() {
    var overlay = document.getElementById("addItemOverlay");
    overlay.style.display = "block";


    var http = new XMLHttpRequest();
    http.open("GET", "http://localhost:2000/getItem_Companies");
    http.send();
    http.onreadystatechange = function () {
        if (http.status === 200 && http.readyState === 4) {
            var json2 = JSON.parse(http.responseText);
            var company = document.getElementById("company");

            for (var i = 0; i < json2.length; i++) {
                var y = document.createElement("option");
                y.value = json2[i].id;
                y.innerHTML = json2[i].name;
                company.appendChild(y);

            }
        }
    };
}

function createNewItem() {

    var companyId = document.getElementById("company").value;
    var itemName = document.getElementById("itemName").value;
    var itemDescr = document.getElementById("itemDescription").value;

    if(itemDescr === "")
        itemDescr = "null";


    var query = "http://localhost:2000/addItem?name=" + itemName + "&description=" + itemDescr + "&companyId=" + companyId;
    var http = new XMLHttpRequest();
    http.open("GET", query);
    http.send();
    http.onreadystatechange = function () {
        if (http.status === 200 && http.readyState === 4) {
            alert(JSON.parse(http.responseText).result)
        }
    }
}

function closeOverlay() {
    document.getElementById("addItemOverlay").style.display = "none";

}