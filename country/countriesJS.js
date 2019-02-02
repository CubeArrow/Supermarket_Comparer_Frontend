const httprequest = new XMLHttpRequest();
httprequest.open("GET", "http://localhost:2000/getCountries");
httprequest.send();
httprequest.onreadystatechange = function () {
    if (httprequest.status === 200 && httprequest.readyState === 4) {
        document.getElementById("container").appendChild(createTable(JSON.parse(httprequest.responseText)));
    }
    if (httprequest.status === 404 && httprequest.readyState === 4) {
        document.getElementById("p").innerHTML = JSON.parse(httprequest.responseText).error;
    }
};

function createTable(jsonObj) {
    let i;
    const col = ["Name", "Flag"];

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
            if (col[j] === "Flag") {
                if (jsonObj[i].flag === "null") {
                    tabCell.innerHTML = "No flag yet";
                } else {
                    tabCell.innerHTML = "<img style='height:30px;' src='data:image/png;base64," + jsonObj[i].flag + "'>";
                }
            } else {
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "country.html?id=" + jsonObj[i].id;
                x.innerHTML = jsonObj[i].name.split("+").join(" ");
                tabCell.appendChild(x);
            }
        }
    }
    table.setAttribute("class", "table");

    return table;
}


