document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("openBoosterBtn").addEventListener("click", openBooster);
    document.getElementById("viewCollectionBtn").addEventListener("click", viewCollection);

    const setSelector = document.getElementById("setSelector");
    collections.forEach(col => {
        const option = document.createElement("option");
        option.value = col.name;
        option.textContent = col.name;
        setSelector.appendChild(option);
    });
});

const collections = [
    { name: "Destined Rivals", max: 244, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/destined-rivals/en-us/SV10_EN_", rarityThreshold: 183 },
    { name: "Journey Together", max: 175, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/journey-together/en-us/SV09_EN_", rarityThreshold: 160 },
    { name: "Prismatic Evolutions", max: 180, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/prismatic-evolutions/en-us/SV8pt5_EN_", rarityThreshold: 132 },
    { name: "Surging Sparks", max: 252, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/en-us/SV08_EN_", rarityThreshold: 160 },
    { name: "Stellar Crown", max: 175, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/stellar-crown/en-us/SV07_EN_", rarityThreshold: 143 },
    { name: "Shrouded Fable", max: 99, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/shrouded-fable/en-us/SV6pt5_EN_", rarityThreshold: 65 },
    { name: "Twilight Masquerade", max: 226, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/twilight-masquerade/en-us/SV06_EN_", rarityThreshold: 168 },
    { name: "Temporal Forces", max: 218, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/temporal-forces/en-us/SV05_EN_", rarityThreshold: 163 },
    { name: "Paldean Fates", max: 239, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/paldean-fates/en-us/SV4pt5_EN_", rarityThreshold: 92 },
    { name: "Paradox Rift", max: 259, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/paradox-rift/en-us/SV04_EN_", rarityThreshold: 183 },
    { name: "151", max: 204, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_", rarityThreshold: 166 },
    { name: "Obsidian Flames", max: 227, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/obsidian-flames/en-us/SV03_EN_", rarityThreshold: 198 },
    { name: "Paldea Evolved", max: 270, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/paldea-evolved/en-us/SV02_EN_", rarityThreshold: 194 },
    { name: "Scarlet Violet", max: 252, url: "https://dz3we2x72f7ol.cloudfront.net/expansions/scarlet-violet/en-us/SV01_EN_", rarityThreshold: 199 }
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
    const numCards = 10;
    const openedCards = [];
    const userIP = await fetchIP();

    const setName = document.getElementById("setSelector")?.value || "";
    const selectedCollection = setName
        ? collections.find(col => col.name === setName)
        : collections[Math.floor(Math.random() * collections.length)];

    for (let i = 0; i < numCards; i++) {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.onclick = () => cardDiv.classList.toggle("flipped");

        let cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        let cardFront = document.createElement("div");
        cardFront.classList.add("card-front");
        let imgFront = document.createElement("img");
        imgFront.src = "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Pokemon_Trading_Card_Game_cardback.jpg/150px-Pokemon_Trading_Card_Game_cardback.jpg";
        cardFront.appendChild(imgFront);

        let cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        let imgBack = document.createElement("img");

        if (i === numCards - 1) {
            imgBack.src = energyCards[Math.floor(Math.random() * energyCards.length)];
        } else {
            const { max, rarityThreshold } = selectedCollection;
            const rareChance = 0.1;

            let randomCardId;
            if (Math.random() < rareChance && rarityThreshold < max) {
                const rareMin = rarityThreshold + 1;
                const rareMax = max;
                randomCardId = Math.floor(Math.random() * (rareMax - rareMin + 1)) + rareMin;
            } else {
                randomCardId = Math.floor(Math.random() * rarityThreshold) + 1;
            }

            imgBack.src = `${selectedCollection.url}${randomCardId}.png`;
            openedCards.push({ collection: selectedCollection.name, id: randomCardId, url: imgBack.src });
        }

        cardBack.appendChild(imgBack);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardDiv.appendChild(cardInner);
        container.appendChild(cardDiv);
    }

    let userCollection = JSON.parse(localStorage.getItem(userIP)) || [];
    userCollection.push(...openedCards);
    localStorage.setItem(userIP, JSON.stringify(userCollection));
}

async function viewCollection() {
    const userIP = await fetchIP();
    const collection = JSON.parse(localStorage.getItem(userIP)) || [];
    const container = document.getElementById("cards-container");
    container.innerHTML = "<h2 class='collection-container'>Your Collection</h2>";

    if (collection.length === 0) {
        container.innerHTML += "<p>No cards collected yet.</p>";
        return;
    }

    const select = document.createElement("select");
    select.innerHTML = `<option value="all">All Collections</option>`;
    collections.forEach(col => {
        select.innerHTML += `<option value="${col.name}">${col.name}</option>`;
    });

    container.appendChild(select);
    const displayArea = document.createElement("div");
    displayArea.classList.add("collection-container");
    container.appendChild(displayArea);

    function updateDisplay() {
        displayArea.innerHTML = "";
        let selectedCollection = select.value;
        let filteredCollection = selectedCollection === "all" ? collection : collection.filter(c => c.collection === selectedCollection);

        collections.forEach(col => {
            if (selectedCollection !== "all" && col.name !== selectedCollection) return;

            let ownedCards = filteredCollection.filter(c => c.collection === col.name).map(c => c.id);
            for (let i = 1; i <= col.max; i++) {
                let cardDiv = document.createElement("div");
                cardDiv.classList.add("card", "collection-card");
                let img = document.createElement("img");

                if (ownedCards.includes(i)) {
                    img.src = `${col.url}${i}.png`;
                } else {
                    img.src = "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Pokemon_Trading_Card_Game_cardback.jpg/150px-Pokemon_Trading_Card_Game_cardback.jpg";
                    cardDiv.classList.add("missing-card");
                }

                cardDiv.onclick = (event) => {
                    event.stopPropagation();
                    cardDiv.classList.toggle("expanded");
                };

                cardDiv.appendChild(img);
                displayArea.appendChild(cardDiv);
            }
        });
    }

    select.addEventListener("change", updateDisplay);
    updateDisplay();
}
