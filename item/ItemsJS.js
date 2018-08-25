const httprequest = new XMLHttpRequest();
httprequest.open("GET", "http://localhost:2000/getItems");
httprequest.send();
httprequest.onreadystatechange = function () {
    if (httprequest.status === 200 && httprequest.readyState === 4) {
        document.getElementById("container").appendChild(createTable(JSON.parse(httprequest.responseText)));
    }
    else if (httprequest.status === 404 && httprequest.readyState === 4) {
        document.getElementById("p").innerHTML = JSON.parse(httprequest.responseText).error;
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
            }
            else if (col[j] === "Name") {
                x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "item.html?id=" + jsonObj[i].id;
                x.innerHTML = jsonObj[i].name.split("+").join(" ");
                tabCell.appendChild(x);
            }
            else if (col[j] === "Company") {
                x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "../company/company.html?id=" + jsonObj[i].companyId;
                x.innerHTML = jsonObj[i].company.split("+").join(" ");
                tabCell.appendChild(x);
            } else {
                tabCell.innerHTML = jsonObj[i].description.split("+").join(" ");
            }
        }
    }
    table.setAttribute("class", "table");

    return table;
}


