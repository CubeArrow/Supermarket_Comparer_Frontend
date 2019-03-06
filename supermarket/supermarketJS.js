//Get the arguments from the url
const url = location.search.split("?");
const id = url[1].split("=")[1];


//Get the data about the supermarket from the backend and set it to the different sections on the website
const supermarketRequest = new XMLHttpRequest;
supermarketRequest.open("GET", "http://localhost:2000/getSupermarketById?id=" + id);
supermarketRequest.send();
supermarketRequest.onreadystatechange = function () {
    if (supermarketRequest.status === 200 && supermarketRequest.readyState === 4) {
        //set the data to the different sections of the website
        createEverything(JSON.parse(supermarketRequest.responseText));
    }
    if (supermarketRequest.status === 404 && supermarketRequest.readyState === 4) {
        //Display the 404 error if it occurs.
        const h = document.createElement("p");
        h.class = "lead";
        h.innerHTML = JSON.parse(supermarketRequest.responseText).error;
        document.getElementById("container").appendChild(h);
    }
};

//Get all of the countries in order to create options for the country select in the location creation overlay
const countryRequest = new XMLHttpRequest();
countryRequest.open("GET", "http://localhost:2000/getCountries");
countryRequest.send();
countryRequest.onreadystatechange = function () {
    if (countryRequest.status === 200 && countryRequest.readyState === 4) {
        //Create an option for the select and add it to the select
        addDataToSelect(countryRequest.responseText, "countrySelect")

    }
};

//Get all of the companies in order to add them as options to the select in the company creation overlay
const companyRequest = new XMLHttpRequest();
companyRequest.open("GET", "http://localhost:2000/getItem_Companies");
companyRequest.send();
companyRequest.onreadystatechange = function () {
    if (companyRequest.status === 200 && companyRequest.readyState === 4) {
        //Create the options and add them to the select
        addDataToSelect(companyRequest.responseText, "companySelect")
    }
};

function addDataToSelect(data, selectionName) {
    //Convert the data to a JSON Array
    let company = JSON.parse(data);

    const companySelect = document.getElementById(selectionName);
    //Iterate over the items in the JSON Array
    for (let i = 0; i < company.length; i++) {
        //Create the option and set the variables
        const x = document.createElement("option");
        x.value = company[i].id;
        x.innerHTML = company[i].name;
        //Add the option to the selection element
        companySelect.appendChild(x);
    }
}

function createEverything(json) {
    //Display the general data in the first section
    general(json);
    //Display the data with the locations in the second section
    locations(json.locations);
    //Display the data with the prices for different items in the third section
    items(json.prices);
}

function items(prices) {
    let i;
    const col = ["Price", "Name", "Company", "Logo"];

    const table = createTable(col);

    for (i = 0; i < prices.length; i++) {

        const tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            const tabCell = tr.insertCell(-1);
            if (col[j] === "Logo") {
                const logo = prices[i].logo;
                if (logo === "null") {
                    tabCell.innerHTML = "No logo yet";
                } else {
                    tabCell.innerHTML = "<img style='height:30px;' src='data:image/png;base64," + logo + "' alt='Logo'>";
                }
            } else if (col[j] === "Company") {
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "../company/company.html?id=" + prices[i].companyId;
                x.innerHTML = prices[i].company.split("+").join(" ");
                tabCell.appendChild(x);
            } else if (col[j] === "Name") {
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "../item/item.html?id=" + prices[i].itemId;
                x.innerHTML = prices[i].name.split("+").join(" ");
                tabCell.appendChild(x);
            } else {
                tabCell.innerHTML = prices[i].price;
            }
        }
    }
    table.setAttribute("class", "table");

    document.getElementById("section2").appendChild(table)
}

function locations(locations) {
    const col = ["Address", "Country", "Flag", ""];

    const table = createTable(col);


    for (let i = 0; i < locations.length; i++) {

        let tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            const tabCell = tr.insertCell(-1);
            if (col[j] === "Flag") {
                const flag = locations[i].flag;

                tabCell.innerHTML = "<img class='flag' style='height:30px;' src='data:image/png;base64," + flag + "' alt='No flag yet'>";

            } else if (col[j] === "Country") {
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link name");

                x.href = "../country/country.html?id=" + locations[i].countryId;
                x.innerHTML = locations[i].countryName.split("+").join(" ");
                tabCell.appendChild(x);
            } else if (col[j] === "Address") {
                tabCell.innerHTML = locations[i].address.split("+").join(" ");
                tabCell.setAttribute("class", "address");
            } else {
                const editBtn = document.createElement("button");
                editBtn.setAttribute("class", "btn btn-outline-warning");
                editBtn.innerHTML = "Edit";
                tabCell.appendChild(editBtn);

                editBtn.onclick = function () {
                    editLocation(table, tr, locations, i);
                }
            }


        }
    }
    table.setAttribute("class", "table");

    document.getElementById("section3").appendChild(table);
}

function general(json) {
    const picker = document.getElementById('picker');
    picker.addEventListener('change', function (evt) {
        handleFileSelect(evt, "logo");
    }, false);


    const img = document.getElementById("logo");
    const supermarketLogo = json.supermarketLogo;
    if (supermarketLogo !== "null") {
        img.src = "data:image/png;base64," + supermarketLogo;
    }

    const name = document.getElementById("name");
    name.innerHTML = json.supermarketName;
}

function editLocation(table, tr, locations, i) {
    const before = tr.innerHTML;
    const http = new XMLHttpRequest();
    http.open("GET", "http://localhost:2000/getCountries");
    http.send();
    http.onreadystatechange = function () {
        if (http.status === 200 && http.readyState === 4) {


            const name = tr.getElementsByClassName("name")[0].innerHTML;
            const flag = tr.getElementsByClassName("flag")[0];
            const address = tr.getElementsByClassName("address")[0].innerHTML;

            let cell = tr.insertCell(-1);
            const nameField = document.createElement("input");
            nameField.setAttribute("class", "form-control");
            nameField.value = address;
            cell.appendChild(nameField);
            tr.innerHTML = "";
            tr.appendChild(cell);


            cell = tr.insertCell(-1);

            const x = document.createElement("select");
            x.setAttribute("class", "form-control");
            x.id = "select";

            const json2 = JSON.parse(http.responseText);
            for (let j = 0; j < json2.length; j++) {
                const y = document.createElement("option");
                y.value = json2[j].id + "::::" + json2[j].flag;
                y.innerHTML = json2[j].name;
                if (json2[j].name === name) {
                    y.selected = true;
                }
                x.appendChild(y);

            }

            x.onchange = function () {
                flag.src = "data:image/png;base64," + x.options[x.selectedIndex].value.split("::::")[1];
            };
            cell.appendChild(x);
            tr.appendChild(cell);


            cell = tr.insertCell(-1);
            cell.appendChild(flag);

            const saveBtn = document.createElement("button");
            saveBtn.innerHTML = "Save";
            saveBtn.setAttribute("class", "btn btn-outline-success");
            saveBtn.style.marginRight = "10px";
            saveBtn.onclick = function () {
                const id = locations[i].id;

                const h = new XMLHttpRequest();
                h.open("GET", "http://localhost:2000/updateLocation?id=" + id + "&countryId=" + x.value.split("::::")[0] + "&address=" + nameField.value);
                h.send();
            };

            const declineBtn = document.createElement("button");
            declineBtn.innerHTML = "Remove Edit";
            declineBtn.setAttribute("class", "btn btn-outline-warning");
            declineBtn.style.marginRight = "10px";
            declineBtn.onclick = function () {
                tr.innerHTML = before;
            };


            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Delete Location";
            deleteBtn.setAttribute("class", "btn btn-outline-danger");
            deleteBtn.onclick = function () {
                const id = locations[i].id;

                const h = new XMLHttpRequest();
                h.open("GET", "http://localhost:2000/removeLocation?id=" + id);
                h.send();
                table.removeChild(tr);
            };

            const div = document.createElement("div");
            div.appendChild(saveBtn);
            div.appendChild(declineBtn);
            div.appendChild(deleteBtn);

            const c = tr.insertCell(-1);
            c.appendChild(div);
        }
    };


}


window.onclick = function (event) {
    closeOverlayOnClick(event, "locationOverlay");
    closeOverlayOnClick(event, "itemOverlay");
};


function on(name) {
    //Set the display to block in order to show it
    document.getElementById(name).style.display = "block";
}

function off(name) {
    //Set the display to block in order to hide it
    document.getElementById(name).style.display = "none";
}

function showLocationOverlay() {
    on("locationOverlay");
}

function hideLocationOverlay() {
    off("locationOverlay")
}

function showItemOverlay() {
    //Open the overlay for the item overlay
    on("itemOverlay");
}

function hideItemOverlay() {
    //Close the overlay for the item overlay
    off("itemOverlay")
}


function editName() {

    const edit = document.getElementById("edit");
    const before = edit.innerHTML;

    const button = document.createElement("button");
    button.innerHTML = "Apply";
    button.style.marginTop = "10px";
    button.setAttribute("class", "btn btn-success");
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
    button2.style.marginTop = "10px";
    button2.style.marginLeft = "10px";
    button2.setAttribute("class", "btn btn-danger");

    function dismiss() {
        edit.innerHTML = before;
    }

    button2.onclick = dismiss;

    edit.innerHTML = "<input value='" + document.getElementById("name").innerHTML + "' id='nameInput' type=\"text\" class=\"form-control\">";


    edit.appendChild(button);
    edit.appendChild(button2);

}

function save() {
    if (confirm("Do you really want to save the logo and the name?")) {
        const name = document.getElementById("name").innerHTML;
        const img = document.getElementById("logo").src.split(";base64,")[1];

        const id = location.search.split("?")[1].split("=")[1];

        const httprequest = new XMLHttpRequest();
        httprequest.open("GET", "http://localhost:2000/updateSupermarket?name=" + name + "&logo=" + img + "&id=" + id);
        httprequest.send();
    }
}

function addLocation() {
    const http = new XMLHttpRequest();
    http.open("GET", "http://localhost:2000/addLocation?countryId=" + document.getElementById("countrySelect").value + "&address=" + document.getElementById("addressInput").value + "&supermarketId=" + id);
    http.send();
    hideLocationOverlay();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            location.reload();
        }
    }
}

function addItem() {
    const http = new XMLHttpRequest();
    http.open("GET", "http://localhost:2000/addPrice?supermarketId=" + id + "&itemId=" + document.getElementById("itemSelect").value + "&price=" + document.getElementById("priceInput").value);
    http.send();
    hideItemOverlay();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            location.reload();
        }
    }
}

function handleCompanySelect(obj) {
    document.getElementById("itemSelect").innerHTML = "";

    console.log(obj.value);
    const request = new XMLHttpRequest;
    request.open("GET", "http://localhost:2000/getItemsByCompanyId?id=" + obj.value);
    request.send();
    request.onreadystatechange = function () {
        if (request.status === 200 && request.readyState === 4) {
            console.log(request.responseText);
            addDataToSelect(request.responseText, "itemSelect");
        }
    };
}


function deleteSupermarket() {
    if (confirm("Do you really want to request a deletion of the supermarket via email?")) {
        window.location.href = "mailto:supermarket.comparer@gmail.com";
    }
}
