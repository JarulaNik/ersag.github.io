document.addEventListener('DOMContentLoaded', function() {
    const categorySections = document.querySelectorAll('.category-section');

    categorySections.forEach(section => {
        const categoryName = section.dataset.category;
        const productRow = section.querySelector('.product-row');

        fetch(`${categoryName === 'cleaning' ? 'chistyashie_sredstva' : categoryName}.json`)
            .then(response => response.json())
            .then(data => {
                data.slice(0, 4).forEach((product, index, array) => {
                    const productCard = createProductCard(product);
                    productRow.appendChild(productCard);

                    if (index === array.length - 1) {
                        const viewAll = document.createElement('div');
                        viewAll.classList.add('view-all');

                        const viewAllButton = document.createElement('button');
                        viewAllButton.textContent = translations.ru.textContent; // Устанавливаем начальный текст кнопки
                        viewAllButton.id = 'view-all-button'; // Добавляем ID для кнопки "Смотреть все"

                        viewAllButton.addEventListener('click', () => {
                            window.location.href = `catalog.html?category=${categoryName}`;
                        });

                        viewAll.appendChild(viewAllButton);
                        productCard.appendChild(viewAll);
                    }
                });
            })
            .catch(error => console.error('Error loading products:', error));

    });

    function createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImage = document.createElement('img');
        productImage.src = product.imageUrl;
        productImage.alt = product.title;
        productImage.classList.add('product-image');

        const productTitle = document.createElement('h3');
        productTitle.classList.add('product-title');
        productTitle.textContent = product.title;

        const productCode = document.createElement('p');
        productCode.classList.add('product-code');
        productCode.textContent = `Код: ${product.code}`;

        const productDescription = document.createElement('p');
        productDescription.classList.add('product-description');
        productDescription.textContent = product.description.substring(0, 100) + '...';

        const productLink = document.createElement('a');
        productLink.classList.add('product-link');
        productLink.href = product.link;
        productLink.textContent = 'Подробнее';
        productLink.target = '_blank';

        productCard.appendChild(productImage);
        productCard.appendChild(productTitle);
        productCard.appendChild(productCode);
        productCard.appendChild(productDescription);
        productCard.appendChild(productLink);

        return productCard;

    }




});


const translations = {
    ru: {
        cleaningTitle: 'Чистящие средства',
        kosmetikaTitle: 'Косметика',
        badTitle: 'Пищевые добавки',
        textilTitle: 'Текстильная группа',
        mainNav: 'Главная',
        catalogNav: 'Каталог',
        paymentNav: 'Оплата и доставка',
        marketingNav: 'Маркетинг',
        contactsNav: 'Контакты',
        textContent: 'Смотреть всё'
    },
    ua: {
        cleaningTitle: 'Чистячі засоби',
        kosmetikaTitle: 'Косметика',
        badTitle: 'Харчові добавки',
        textilTitle: 'Текстильна група',
        mainNav: 'Головна',
        catalogNav: 'Каталог',
        paymentNav: 'Оплата та доставка',
        marketingNav: 'Маркетинг',
        contactsNav: 'Контакти',
        textContent: 'Побачити все'
    }
};

function changeLanguage(lang) {
    const t = translations[lang];

    document.querySelector('[data-category="cleaning"] h2').textContent = t.cleaningTitle;
    document.querySelector('[data-category="kosmetika"] h2').textContent = t.kosmetikaTitle;
    document.querySelector('[data-category="bad"] h2').textContent = t.badTitle;
    document.querySelector('[data-category="textil"] h2').textContent = t.textilTitle;

    // Update navigation links
    const navLinks = document.querySelectorAll('.header-nav a, .footer-nav a');
    navLinks.forEach(link => {
        const linkIndex = Array.from(link.parentNode.children).indexOf(link); // Get link's position
        switch (linkIndex) {
            case 0: link.textContent = t.mainNav; break;
            case 1: link.textContent = t.catalogNav; break;
            case 2: link.textContent = t.paymentNav; break;
            case 3: link.textContent = t.marketingNav; break;
            case 4: link.textContent = t.contactsNav; break;
        }
    });
}

document.getElementById('ru-button').addEventListener('click', () => {
    changeLanguage('ru');
});

document.getElementById('ua-button').addEventListener('click', () => {
    changeLanguage('ua');
});

// Set default language (e.g., Russian)
changeLanguage('ru');