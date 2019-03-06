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