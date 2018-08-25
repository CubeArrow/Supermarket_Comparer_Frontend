const httprequest = new XMLHttpRequest();
httprequest.open("GET", "http://localhost:2000/getItem_Companies");
httprequest.send();
httprequest.onreadystatechange = function () {
    if (httprequest.status === 200 && httprequest.readyState === 4) {
        document.getElementById("container").appendChild(createTable(JSON.parse(httprequest.responseText)));
    }
    if (httprequest.status === 404 && httprequest.readyState === 4) {
        const h = document.createElement("p");
        h.class = "lead";
        h.innerHTML = JSON.parse(httprequest.responseText).error;
        document.getElementById("container").appendChild(h);

    }
};

function createTable(jsonObj) {
    let i;
    const col = ["Name", "Description", "Logo"];

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
                    tabCell.innerHTML = "No logo yet";
                } else {
                    tabCell.innerHTML = "<img style='height:30px;' src='data:image/png;base64," + jsonObj[i].logo + "'>";
                }
            }
            else if(col[j] === "Name"){
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "company.html?id=" + jsonObj[i].id;
                x.innerHTML = jsonObj[i].name.split("+").join(" ");
                tabCell.appendChild(x);
            }
            else{
                if (jsonObj[i].description === "null") {
                    tabCell.innerHTML ="There is no description yet";
                }else {
                    tabCell.innerHTML = jsonObj[i].description.split("+").join(" ");
                }
            }
        }
    }
    table.setAttribute("class", "table");

    return table;
}


