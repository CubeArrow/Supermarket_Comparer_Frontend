const httpRequest = new XMLHttpRequest();
httpRequest.open("GET", "http://localhost:2000/getItems");
httpRequest.send();
httpRequest.onreadystatechange = function () {
    if (httpRequest.status === 200 && httpRequest.readyState === 4) {
        document.getElementById("container").appendChild(createItemsTable(JSON.parse(httpRequest.responseText)));
    } else if (httpRequest.status === 404 && httpRequest.readyState === 4) {
        document.getElementById("p").innerHTML = JSON.parse(httpRequest.responseText).error;
    }
};

window.onclick = function (event) {
    closeOverlayOnClick(event, "addItemOverlay");
};


function createItemsTable(jsonObj) {
    let x;
    let i;
    const col = ["Name", "Description", "Company", "Logo"];

    const table = createTable(col);


    for (i = 0; i < jsonObj.length; i++) {

        const tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            const tabCell = tr.insertCell(-1);
            if (col[j] === "Logo") {
                const logo = jsonObj[i].logo;
                if (logo === "null") {
                    tabCell.innerHTML = "No flag yet";
                } else {
                    tabCell.innerHTML = "<img style='height:30px;' src='data:image/png;base64," + logo + "' alt='Flag'>";
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
                const description = jsonObj[i].description.split("+").join(" ");

                if (description === "null")
                    tabCell.innerHTML = "No description yet";
                else {
                    const descriptionArr = description.split("\\n");
                    if(descriptionArr.length > 1) {
                        tabCell.innerHTML = descriptionArr[0] + " [...]";
                    }
                    else{
                        tabCell.innerHTML = descriptionArr[0];
                    }

                }
            }
        }
    }
    table.setAttribute("class", "table");

    return table;
}

function openOverlay() {
    const overlay = document.getElementById("addItemOverlay");
    overlay.style.display = "block";


    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "http://localhost:2000/getItem_Companies");
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.status === 200 && httpRequest.readyState === 4) {
            const json2 = JSON.parse(httpRequest.responseText);
            const company = document.getElementById("company");

            for (let i = 0; i < json2.length; i++) {
                const y = document.createElement("option");
                y.value = json2[i].id;
                y.innerHTML = json2[i].name;
                company.appendChild(y);

            }
        }
    };
}

function createNewItem() {

    const companyId = document.getElementById("company").value;
    const itemName = document.getElementById("itemName").value;
    let itemDescr = document.getElementById("itemDescription").value;

    if (itemDescr === "")
        itemDescr = "null";


    const http = new XMLHttpRequest();
    http.open("GET", "http://localhost:2000/addItem?name=" + itemName + "&description=" + itemDescr +
        "&companyId=" + companyId);
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