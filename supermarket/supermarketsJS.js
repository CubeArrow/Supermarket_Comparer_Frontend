const httprequest = new XMLHttpRequest();
httprequest.open("GET", "http://localhost:2000/getSupermarkets");
httprequest.send();
httprequest.onreadystatechange = function () {
    if (httprequest.status === 200 && httprequest.readyState === 4) {
        document.getElementById("container").appendChild(createTable(JSON.parse(httprequest.responseText)));
    document.getElementById("supermarketLogo").addEventListener('change', handleFileSelect, false);
    }
    if (httprequest.status === 404 && httprequest.readyState === 4) {
        document.getElementById("p").innerHTML = JSON.parse(httprequest.responseText).error;

    }
};
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
    }}

function createTable(jsonObj) {
    let i;
    const col = ["Name", "Logo"];

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
            else {
                const x = document.createElement("a");
                x.href = "supermarket.html?id=" + jsonObj[i].id;
                x.setAttribute("class", "nav-link");

                x.innerHTML = jsonObj[i].name.split("+").join(" ");
                tabCell.appendChild(x);
            }
        }
    }
    table.setAttribute("class", "table");

    return table;
}

window.onclick = function () {

};




function openOverlay(){
    document.getElementById("addSupermarketOverlay").style.display = "block";
}

function closeOverlay(){
    document.getElementById("addSupermarketOverlay").style.display = "none";
}

function createNewSupermarket() {
    const name = document.getElementById("supermarketName").value;
    const logoInput = document.getElementById("logo");



    const httprequest = new XMLHttpRequest();
    httprequest.open("GET", "http://localhost:2000/addSupermarket?name=" + name + "&logo=" + logoInput.src.split(";base64,")[1]);
    httprequest.send();
    httprequest.onreadystatechange = function () {
        if(httprequest.readyState === 4){
            window.location = window.location;
        }
    }
}