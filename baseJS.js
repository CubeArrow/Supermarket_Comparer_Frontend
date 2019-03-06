function search() {
    location.href = "../search.html?q=" + document.getElementById("searchText").value;
}

function createTable(col) {
    const table = document.createElement("table");

    let tr = table.insertRow(-1);

    for (i = 0; i < col.length; i++) {
        const th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    return table;
}

function generateOptions(json, container) {
    for (let i = 0; i < json.length; i++) {
        const y = document.createElement("option");
        y.value = json[i].id;
        y.innerHTML = json[i].name;
        container.appendChild(y);

    }
}

function handle404Error(httpRequest, container) {
    if (httpRequest.status === 404 && httpRequest.readyState === 4) {
        const h = document.createElement("p");
        h.class = "lead";
        h.innerHTML = JSON.parse(httpRequest.responseText).error;
        container.appendChild(h);

    }
}

function displayDescriptionFromJsonInTabCell(jsonObj, i, tabCell) {
    const description = jsonObj[i].description.split("+").join(" ");


    displayDescriptionInTabCell(description, tabCell)
}

function displayDescriptionInTabCell(description, tabCell) {
    if (description === "null")
        tabCell.innerHTML = "No description yet";
    else {
        const descriptionArr = description.split("\\n");
        if (descriptionArr.length > 1) {
            tabCell.innerHTML = descriptionArr[0] + " [...]";
        } else {
            tabCell.innerHTML = descriptionArr[0];
        }
    }
}

function handleFileSelect(evt, name) {
    const files = evt.target.files;

    let i, f;
    for (i = 0; f = files[i]; i++) {

        if (!f.type.match('image.*')) {
            continue;
        }

        const reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = (function () {
            return function (e) {
                const img = document.getElementById(name);
                img.src = e.target.result;
            };
        })(f);
    }
}

function closeOverlayOnClick(event, name) {
    const overlay = document.getElementById(name);
    if (event.target === overlay) {
        overlay.style.display = "none";
    }
}

function sendHttpReqest(httpRequest, url){

}