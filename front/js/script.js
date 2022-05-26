// ACCUEIL

// Récupération des articles de l'API
async function getArticles() {
    let articlesCatch = await fetch("http://localhost:3000/api/products")
    return await articlesCatch.json();
}

// Répartition des données de l'API dans le DOM
async function fillSection() {
    let result = await getArticles()
        .then(function (resultatAPI) {
            const articles = resultatAPI;
            console.table(articles);
            for (let article in articles) {

                // Insertion de l'élément "a"
                let productLink = document.createElement("a");
                document.querySelector(".items").append(productLink);
                productLink.href = `product.html?id=${resultatAPI[article]._id}`;

                // Insertion de l'élément "article"
                let productArticle = document.createElement("article");
                productLink.append(productArticle);

                // Insertion de l'image
                let productImg = document.createElement("img");
                productArticle.append(productImg);
                productImg.src = resultatAPI[article].imageUrl;
                productImg.alt = resultatAPI[article].altTxt;

                // Insertion du titre "h3"
                let productName = document.createElement("h3");
                productArticle.append(productName);
                productName.innerText = resultatAPI[article].name;

                // Insertion de la description "p"
                let productDescription = document.createElement("p");
                productArticle.append(productDescription);
                productDescription.innerText = resultatAPI[article].description;
            }
        })
        .catch(function (error) {
            return error;
        });
}

fillSection();
