const url = location.search.split("?");
const searchWord = url[1].split("=")[1];
function updateStuff(searchWord){


    const http = new XMLHttpRequest();
    http.open("GET", "http://localhost:2000/search?searchWord=" + searchWord);
    http.send();
    http.onreadystatechange = function () {

        if (http.status === 200 && http.readyState === 4) {
            document.getElementById("input").value = searchWord;

            document.getElementById("container").innerHTML = "<div>\n" +
                "                <label for=\"input\"><h1 class=\"display-4\">Results</h1></label>\n" +
                "                <input style=\"width: 200px;\" class=\"form-control\" id=\"input\" onkeydown=\"search(this)\">\n" +
                "            </div>\n" +
                "            <br>\n" +
                "            <br>";


            const results = JSON.parse(http.responseText);

            const countries = results.countries;
            const items = results.items;
            const supermarkets = results.supermarkets;
            const companies = results.companies;


            var countriesContainer = document.createElement("div");

            var h3 = document.createElement("h3");
            h3.innerHTML = "Countries";
            countriesContainer.appendChild(h3);

            for(const i in countries){
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "country/country.html?id=" + countries[i].id;
                x.innerHTML = countries[i].name.split("+").join(" ");
                countriesContainer.appendChild(x);

            }
            var companiesContainer = document.createElement("div");

            var h3 = document.createElement("h3");
            h3.innerHTML = "Companies";
            companiesContainer.appendChild(h3);

            for(const i in companies){
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "company/company.html?id=" + companies[i].id;
                x.innerHTML = companies[i].name.split("+").join(" ");
                companiesContainer.appendChild(x);

            }
            var supermarketsContainer = document.createElement("div");

            var h3 = document.createElement("h3");
            h3.innerHTML = "Supermarkets";
            supermarketsContainer.appendChild(h3);

            for(const i in supermarkets){
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "country/country.html?id=" + supermarkets[i].id;
                x.innerHTML = supermarkets[i].name.split("+").join(" ");
                supermarketsContainer.appendChild(x);

            }

            var itemsContainer = document.createElement("div");

            var h3 = document.createElement("h3");
            h3.innerHTML = "Items";
            itemsContainer.appendChild(h3);

            for(const i in items){
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "item/item.html?id=" + items[i].id;
                x.innerHTML = items[i].name.split("+").join(" ");
                itemsContainer.appendChild(x);

            }

            document.getElementById("container").appendChild(supermarketsContainer);
            document.getElementById("container").appendChild(document.createElement("br"));
            document.getElementById("container").appendChild(itemsContainer);
            document.getElementById("container").appendChild(document.createElement("br"));
            document.getElementById("container").appendChild(companiesContainer);
            document.getElementById("container").appendChild(document.createElement("br"));
            document.getElementById("container").appendChild(countriesContainer);


        }
    };
}
updateStuff(searchWord);
function search(ele) {
    if(event.key === 'Enter') {
        updateStuff(ele.value)
    }
}
