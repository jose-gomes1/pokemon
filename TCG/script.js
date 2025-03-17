document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("openBoosterBtn").addEventListener("click", openBooster);
});

function openBooster() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    const numCards = 5;
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

    for (let i = 0; i < numCards; i++) {
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.onclick = () => cardDiv.classList.toggle('flipped');

        let cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        // Card front
        let cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        let imgFront = document.createElement('img');
        imgFront.src = "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Pokemon_Trading_Card_Game_cardback.jpg/150px-Pokemon_Trading_Card_Game_cardback.jpg";
        imgFront.alt = "Pokémon Card Front";
        cardFront.appendChild(imgFront);

        // Escolher uma coleção aleatória
        const randomCollection = collections[Math.floor(Math.random() * collections.length)];
        const randomCardId = Math.floor(Math.random() * randomCollection.max) + 1;
        const cardImageUrl = `${randomCollection.url}${randomCardId}.png`;

        // Card back
        let cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        let imgBack = document.createElement('img');
        imgBack.src = cardImageUrl;
        imgBack.alt = "Pokémon Card Back";
        cardBack.appendChild(imgBack);

        // Adicionar front e back na carta
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardDiv.appendChild(cardInner);
        container.appendChild(cardDiv);
    }
}