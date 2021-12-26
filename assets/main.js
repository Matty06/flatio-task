const continents = [
    {
        continentName: "Evropa",
        continentCountries: [
            {
                continentCountry: "Česká republika",
                countryFlag: "🇨🇿",
                countryCities: ["Praha", "Brno", "Ústí nad Labem", "Pardubice", "Plzeň"],
            },
            {
                continentCountry: "Slovensko",
                countryFlag: "🇸🇰",
                countryCities: ["Bratislava", "Košice", "Prešov", "Žilina", "Trnečín"]
            },
            {
                continentCountry: "Polsko",
                countryFlag: "🇵🇱",
                countryCities: ["Varšava", "Krakow", "Lodž", "Poznaň", "Gdaňsk"]
            },
            {
                continentCountry: "Německo",
                countryFlag: "🇩🇪",
                countryCities: ["Berlín", "Mnichov", "Kolín nad Rýnem", "Hamburk", "Frankfurt nad Mohanem"]
            },
            {
                continentCountry: "Rakousko",
                countryFlag: "🇦🇹",
                countryCities: ["Vídeň", "Linec", "Steyr", "Villach", "Wolfsberg"]
            },
            {
                continentCountry: "Chorvatsko",
                countryFlag: "🇭🇷",
                countryCities: ["Zagreb", "Split", "Rijeka", "Osijek", "Zadar"]
            }
        ]
    },
    {
        continentName: "Afrika",
        continentCountries: [
            {
                continentCountry: "Egypt",
                countryFlag: "🇪🇬",
                countryCities: ["Asuán", "Esna", "Gíza"]
            },
            {
                continentCountry: "Botswana",
                countryFlag: "🇧🇼",
                countryCities: ["Gaborone", "Maun", "Serowe"]
            },
            {
                continentCountry: "Ghana",
                countryFlag: "🇬🇭",
                countryCities: ["Akkra", "Kumasi", "Tamale"]
            },
            {
                continentCountry: "Benin",
                countryFlag: "🇧🇯",
                countryCities: ["Cotonou", "Porto Novo", "Godomey", "Parakou"]
            },
            {
                continentCountry: "Etiopie",
                countryFlag: "🇪🇹",
                countryCities: ["Addis Abeba", "Dire Dawa", "Adama"]
            }
        ]
    },
    {
        continentName: "Asie",
        continentCountries: [
            {
                continentCountry: "Čína",
                countryFlag: "🇨🇳",
                countryCities: ["Šanghaj", "Peking", "Kanton"]
            },
            {
                continentCountry: "Japonsko",
                countryFlag: "🇯🇵",
                countryCities: ["Tokio", "Ósaka", "Kawasaki"]
            },
            {
                continentCountry: "Jižní Korea",
                countryFlag: "🇰🇷",
                countryCities: ["Andong", "Asan", "Tegu"]
            },
            {
                continentCountry: "Filipíny",
                countryFlag: "🇵🇭",
                countryCities: ["Bacolod", "Baguio", "Banaue", "Makati"]
            },
            {
                continentCountry: "Laos",
                countryFlag: "🇱🇦",
                countryCities: ["Huay Xai", "Luang Namtha", "Pakse"]
            }
        ]
    },
    {
        continentName: "Severní Amerika",
        continentCountries: [
            {
                continentCountry: "Kanada",
                countryFlag: "🇨🇦",
                countryCities: ["Otawa", "Montreal", "Halifax"]
            },
            {
                continentCountry: "USA",
                countryFlag: "🇺🇸",
                countryCities: ["Houston", "Austin", "San José"]
            },
            {
                continentCountry: "Mexiko",
                countryFlag: "🇲🇽",
                countryCities: ["León", "Puebla", "Mérida"]
            },
        ]
    }
];
const countryName = document.getElementById('country');
const navTabs = document.getElementById('myTab');
const tabContentWrapper = document.getElementById('myTabContent');
const arrow = `<svg width="7" height="12" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="arrow-right" fill-rule="evenodd" clip-rule="evenodd" d="M0 21.18L8.65317 12L0 2.82L2.66397 0L14 12L2.66397 24L0 21.18Z" fill="#D1DAE4"/></svg>`;
const continentsList = continents.map(continent => {
    return continent.continentName;
});

// --- HELPER FUNCTIONS ---
function formatID(string) {
    return string.normalize("NFD").replace(/\p{Diacritic}/gu, "").split(" ").join("").toLowerCase();
}

function createTab(id, tabName, index) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.setAttribute("role", "presentation");
    li.innerHTML = `<button class="nav-link" data-id="${index}" id="${id}-tab" aria-controls="${id}" data-bs-target="#${id}" data-bs-toggle="tab" type="button" role="tab">${tabName}</button>`;
    navTabs.appendChild(li); 
}

// --- MAIN FUNCTIONS ---
function back() {
    document.getElementById('modal-content-cities').classList.remove('show');
}

function renderTabs() {
    continentsList.forEach((continent, index) => {
        let id = formatID(continent);        
        createTab(id, continent, index);
    });
}

function renderCities(cities, country) {
   document.getElementById("cities").innerHTML = "";
   document.getElementById("modal-content-cities").classList.add('show');
   countryName.innerHTML = country;

   cities.forEach(city => {
    const button = document.createElement("button");
    button.innerHTML = `${city}`;
    button.classList.add('tab-pane__button');
    document.getElementById("cities").appendChild(button); 
   });
}

function getTabContent(index) {
    let tabCountries = [];
        
    for (let i = 0; i < continents[index].continentCountries.length; i++) {
        tabCountries.push({
            country: continents[index].continentCountries[i].continentCountry, 
            flag: continents[index].continentCountries[i].countryFlag,
            cities: [...continents[index].continentCountries[i].countryCities] 
        });
    }

    for (let a = 0; a < tabCountries.length; a++) {
        const button = document.createElement('button');
        button.innerHTML = `<span class='flag'>${tabCountries[a].flag}</span> ${tabCountries[a].country} ${arrow}`;
        document.getElementsByClassName('tab-pane__inner')[index].appendChild(button);
        button.classList.add('tab-pane__button');
        button.onclick = () => {renderCities(tabCountries[a].cities, tabCountries[a].country)};
        document.getElementsByClassName('tab-pane__inner')[index].appendChild(button);
    }
}

function renderTabsContentWrapper() {
    continentsList.forEach(continent => {
        let id = formatID(continent);
        const div = document.createElement('div');
        div.classList.add('tab-pane', 'fade');
        div.setAttribute('id', id);
        div.setAttribute('role', 'tabpanel');
        tabContentWrapper.appendChild(div);

        const divInner = document.createElement('div');
        divInner.classList.add('tab-pane__inner');
        div.appendChild(divInner);
    });
}

function setActiveTab() {
    document.getElementsByClassName('tab-pane')[0].className += ' active show';
    document.getElementsByClassName('nav-link')[0].className += ' active';
}

function renderTabContent() {
    let continentsLength = continents.length;

    for (let i = 0; i < continentsLength; i++) {
        getTabContent(i);
    }
}

function main() {
    renderTabsContentWrapper();
    renderTabContent();
    renderTabs();
    setActiveTab(); 
}

window.onload = () => {
  main();
}