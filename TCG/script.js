document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("openBoosterBtn").addEventListener("click", openBooster);
    document.getElementById("viewCollectionBtn").addEventListener("click", viewCollection);
});

const collections = [
    { name: "Prismatic Evolutions", max: 180, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/prismatic-evolutions/en-us/SV8pt5_EN_" },
    { name: "Surging Sparks", max: 252, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/en-us/SV08_EN_" },
    { name: "Stellar Crown", max: 175, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/stellar-crown/en-us/SV07_EN_" },
    { name: "Shrouded Fable", max: 99, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/shrouded-fable/en-us/SV6pt5_EN_" },
    { name: "Twilight Masquerade", max: 226, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/twilight-masquerade/en-us/SV06_EN_" },
    { name: "Temporal Forces", max: 218, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/temporal-forces/en-us/SV05_EN_" },
    { name: "Paldean Fates", max: 239, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/paldean-fates/en-us/SV4pt5_EN_" },
    { name: "Paradox Rift", max: 259, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/paradox-rift/en-us/SV04_EN_" },
    { name: "151", max: 204, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_" },
    { name: "Obsidian Flames", max: 227, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/obsidian-flames/en-us/SV03_EN_" },
    { name: "Paldea Evolved", max: 270, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/paldea-evolved/en-us/SV02_EN_" },
    { name: "Scarlet Violet", max: 252, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/scarlet-violet/en-us/SV01_EN_" }
];

const energyCards = [
    "assets/BasicGrassEnergySVEEnergy.jpg",
    "assets/BasicFireEnergySVEEnergy.jpg",
    "assets/BasicWaterEnergySVEEnergy.jpg",
    "assets/BasicLightningEnergySVEEnergy.jpg",
    "assets/BasicPsychicEnergySVEEnergy.jpg",
    "assets/BasicFightingEnergySVEEnergy.jpg",
    "assets/BasicDarknessEnergySVEEnergy.jpg",
    "assets/BasicMetalEnergySVEEnergy.jpg"
];

function fetchIP() {
    return fetch("https://ipinfo.io/json?token=6e52f3303eb525")
        .then(response => response.json())
        .then(data => data.ip);
}

async function openBooster() {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    const numCards = 7;
    const openedCards = [];
    const userIP = await fetchIP();

    for (let i = 0; i < numCards; i++) {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.onclick = () => cardDiv.classList.toggle("flipped");

        let cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        // Card front
        let cardFront = document.createElement("div");
        cardFront.classList.add("card-front");
        let imgFront = document.createElement("img");
        imgFront.src = "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Pokemon_Trading_Card_Game_cardback.jpg/150px-Pokemon_Trading_Card_Game_cardback.jpg";
        imgFront.alt = "Pokémon Card Front";
        cardFront.appendChild(imgFront);

        // Card back
        let cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        let imgBack = document.createElement("img");

        if (i === numCards - 1) {
            // Last card is always an Energy card
            imgBack.src = energyCards[Math.floor(Math.random() * energyCards.length)];
        } else {
            // Random Pokémon card
            const randomCollection = collections[Math.floor(Math.random() * collections.length)];
            const randomCardId = Math.floor(Math.random() * randomCollection.max) + 1;
            imgBack.src = `${randomCollection.url}${randomCardId}.png`;
            imgBack.alt = "Pokémon Card";

            // Store Pokémon cards only (skip Energy)
            openedCards.push(imgBack.src);
        }

        cardBack.appendChild(imgBack);

        // Append elements
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardDiv.appendChild(cardInner);
        container.appendChild(cardDiv);
    }

    // Save Pokémon cards to local storage using IP as key
    let userCollection = JSON.parse(localStorage.getItem(userIP)) || [];
    userCollection.push(openedCards);
    localStorage.setItem(userIP, JSON.stringify(userCollection));
}

async function viewCollection() {
    const userIP = await fetchIP();
    const collection = JSON.parse(localStorage.getItem(userIP)) || [];

    const container = document.getElementById("cards-container");
    container.innerHTML = `<h2 class="collection-container">Sua Coleção</h2>`;

    if (collection.length === 0) {
        container.innerHTML += "<p>Você ainda não abriu nenhum pacote.</p>";
        return;
    }

    // Create a dropdown to select the collection
    const select = document.createElement("select");
    select.innerHTML = `<option value="all">Todas as coleções</option>`;
    collections.forEach(col => {
        select.innerHTML += `<option value="${col.name}">${col.name}</option>`;
    });

    container.appendChild(select);

    // Create a div to display selected cards
    const displayArea = document.createElement("div");
    displayArea.classList.add("collection-container");
    container.appendChild(displayArea);

    function updateDisplay() {
        displayArea.innerHTML = ""; // Clear previous cards
        let selectedCollection = select.value;
        let filteredCards = collection.flat().filter(cardUrl => {
            if (selectedCollection === "all") return true;
            return cardUrl.includes(collections.find(c => c.name === selectedCollection).url);
        });

        if (filteredCards.length === 0) {
            displayArea.innerHTML = "<p>Nenhuma carta dessa coleção foi encontrada.</p>";
            return;
        }

        let row;
        filteredCards.forEach((cardUrl, index) => {
            if (index % 7 === 0) {
                row = document.createElement("div");
                row.classList.add("pack");
                displayArea.appendChild(row);
            }

            let cardDiv = document.createElement("div");
            cardDiv.classList.add("card", "collection-card");

            let img = document.createElement("img");
            img.src = cardUrl;

            cardDiv.appendChild(img);
            row.appendChild(cardDiv);
        });
    }

    select.addEventListener("change", updateDisplay);
    updateDisplay(); // Display all initially
}

