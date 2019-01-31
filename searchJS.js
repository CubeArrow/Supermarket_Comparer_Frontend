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


            const countriesContainer = document.createElement("div");

            let h3 = document.createElement("h3");
            h3.innerHTML = "Countries";
            countriesContainer.appendChild(h3);

            for(const i in countries){
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "country/country.html?id=" + countries[i].id;
                x.innerHTML = countries[i].name.split("+").join(" ");
                countriesContainer.appendChild(x);

            }
            const companiesContainer = document.createElement("div");

            h3 = document.createElement("h3");
            h3.innerHTML = "Companies";
            companiesContainer.appendChild(h3);

            for(const i in companies){
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "company/company.html?id=" + companies[i].id;
                x.innerHTML = companies[i].name.split("+").join(" ");
                companiesContainer.appendChild(x);

            }
            const supermarketsContainer = document.createElement("div");

            h3 = document.createElement("h3");
            h3.innerHTML = "Supermarkets";
            supermarketsContainer.appendChild(h3);

            for(const i in supermarkets){
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "country/country.html?id=" + supermarkets[i].id;
                x.innerHTML = supermarkets[i].name.split("+").join(" ");
                supermarketsContainer.appendChild(x);

            }

            const itemsContainer = document.createElement("div");

            h3 = document.createElement("h3");
            h3.innerHTML = "Items";
            itemsContainer.appendChild(h3);

            for(const i in items){
                const x = document.createElement("a");
                x.setAttribute("class", "nav-link");

                x.href = "item/item.html?id=" + items[i].id;
                x.innerHTML = items[i].name.split("+").join(" ");
                itemsContainer.appendChild(x);

            }

            const container = document.getElementById("container");
            container.appendChild(supermarketsContainer);
            container.appendChild(document.createElement("br"));
            container.appendChild(itemsContainer);
            container.appendChild(document.createElement("br"));
            container.appendChild(companiesContainer);
            container.appendChild(document.createElement("br"));
            container.appendChild(countriesContainer);


        }
    };
}
updateStuff(searchWord);


function search(ele) {
    if(event.key === 'Enter') {
        updateStuff(ele.value)
    }
}
