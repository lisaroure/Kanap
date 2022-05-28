let params = window.location.href;
let url = new URL(params);
let id = url.searchParams.get("id");
console.log(id);
let article = "";
const colorChoose = document.querySelector("#colors");
const quantityChoose = document.querySelector("#quantity");

getArticle();

// Je récupère les données de l'API

function getArticle() {
    fetch("http://localhost:3000/api/products/" + id)
        .then((res) => {
            return res.json();
        })

        // Je répartis les données de l'API dans le DOM

        .then(async function (resultatAPI) {
            article = await resultatAPI;
            console.table(article);
            if (article) {
                getPost(article);
            }
        })
        .catch((error) => {
            console.log("Erreur requête API");
        })
}

// Création de la fonction "getPost" et des variables nommées comme dans la page HTML pour chaque produit. La propriété innerHTML va m'aider à récupérer les valeurs qui se trouvent dans le fichier HTML.

function getPost(article) {

    let items = document.getElementById('title');
    items.innerHTML = article.name;

    let price = document.getElementById('price');
    price.innerHTML = article.price;

    let description = document.getElementById('description');
    description.innerHTML = article.description;

    let img = document.createElement("img");
    img.classList.add("productImg");
    img.src = article.imageUrl;
    img.alt = article.altTxt;
    document.querySelector(".item__img").appendChild(img);


    for (let colors of article.colors) {
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article);
}

function addToCart(article) {
    const btnAddCart = document.querySelector("#addToCart");

    btnAddCart.addEventListener('click', (event) => {
        if (quantityChoose.value > 0 && quantityChoose.value <= 100 && quantityChoose.value != 0) {

            //Recupération du choix de la couleur
            let choixCouleur = colorChoose.value;

            //Recupération du choix de la quantité
            let choixQuantite = quantityChoose.value;

            //Récupération des options de l'article à ajouter au panier
            let details = {
                idProduit: id,
                couleurProduit: choixCouleur,
                quantiteProduit: Number(choixQuantite),
                nomProduit: article.name,
                prixProduit: article.price,
                descriptionProduit: article.description,
                imgProduit: article.imageUrl,
                altImgProduit: article.altTxt
            };

            let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

            // Fenêtre pop-up

            const popupConfirm = () => {
                if (window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
                Pour consulter votre panier, cliquez sur OK`)) {
                    window.location.href = "cart.html";
                }
            }
            // S'il y a déjà au moins un article dans le panier : 

            if (produitLocalStorage) {
                const resultFind = produitLocalStorage.find(
                    (el) => el.Id === id && el.couleurProduit === choixCouleur);
                // Dans le cas où il y aurait déjà le même article dans le panier, on ajuste la quantité:
                if (resultFind) {
                    let newQuantite =
                        parseInt(details.Quantité) + parseInt(resultFind.quantiteProduit);
                    resultFind.quantiteProduit = newQuantite;
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    console.table(produitLocalStorage);
                    popupConfirm();
                    // Dans le cas où le produit voulu n'est pas dans le panier:
                } else {
                    produitLocalStorage.push(details);
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    console.table(produitLocalStorage);
                    popupConfirm();
                }
                // Dans le cas où le panier serait vide:
            } else {
                produitLocalStorage = [];
                produitLocalStorage.push(details);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                console.table(produitLocalStorage);
                popupConfirm()
            }
        }
    });
}