// Récupération de l'id des produits grâce à une fonction asynchrone

async function init() {
    product = await getProductById();
    console.log(product)
}

let informations = JSON.parse(localStorage.getItem("Kanap"));
function getProductById() {
    const params = new URL(document.location).searchParams;
    const id = params.get('id');
    console.log(id);
    return (
        fetch('http://localhost:3000/api/products/${id}')
            .then((res) => res.json())
            .then((data) => {
                console.log('data', data);
                return data
            })
            .catch((data) => {
                return error;
            })
    );
}
// ici je crée une boucle et je récupère/crée les éléments du document html

for (let Kanap in informations) {
    let section = document.getElementById('cart__items');
    let article = document.createElement('article');
    article.classList.add('cart__item');

    let itemImg = document.createElement('div');
    itemImg.classList.add('cart__item__img');

    let image = document.createElement("cart__item__img");
    image.src = Kanap.imageUrl;
    image.alt = Kanap.altTxt;

    let itemContent = document.createElement('div');
    itemContent.classList.add('cart__item__content');

    let itemDescription = document.createElement('div');
    itemDescription.classList.add('cart__item__content__description');

    let title = document.createElement('h2');
    title.classList.add('productName');
    title.innerHTML = informations[Kanap].Nom;

    let colors = document.createElement('p');
    colors.innerHTML = informations[Kanap].Couleur;
    let price = document.createElement('p');
    price.innerHTML = Kanap.price + (' €');

    let contentSettings = document.createElement('div');
    contentSettings.classList.add('cart__item__content__settings');

    let settingsQuantity = document.createElement('div');
    settingsQuantity.classList.add('cart__item__content__settings__quantity');

    let quantity = document.createElement('p');
    quantity.innerHTML = informations[Kanap].Quantité;

    let nmbrQuantity = document.createElement('input');
    settingsQuantity.appendChild(quantity);
    quantity.value = informations[Kanap].Quantité;
    quantity.className = "itemQuantity";
    quantity.setAttribute("type", "number");
    quantity.setAttribute("min", "1");
    quantity.setAttribute("max", "100");
    quantity.setAttribute("name", "itemQuantity");

    let suppItem = document.createElement('div');
    suppItem.classList.add('cart__item__content__settings__delete');

    let dltItem = document.createElement('p');
    dltItem.classList.add('deleteItem');
    dltItem.innerHTML = ('Supprimer');

    section.appendChild(article);
    article.appendChild(itemImg);
    article.appendChild(itemContent);
    itemImg.appendChild(image);
    itemContent.appendChild(itemDescription);
    itemDescription.appendChild(title);
    itemDescription.appendChild(colors)
    itemDescription.appendChild(price);
    article.appendChild(contentSettings);
    contentSettings.appendChild(settingsQuantity);
    settingsQuantity.appendChild(quantity);
    settingsQuantity.appendChild(nmbrQuantity);
    article.appendChild(suppItem);
    suppItem.appendChild(dltItem);

}
