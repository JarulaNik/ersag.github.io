document.addEventListener('DOMContentLoaded', function() {
    const categories = document.querySelectorAll('.category');
    const productContainer = document.querySelector('.product-container');
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    let isLoading = false;
    let currentPage = 1;
    const productsPerPage = 12;

    if (categoryParam) {
        loadProducts(categoryParam);
    } else {
        categories.forEach(category => {
            category.addEventListener('click', function() {
                const categoryName = this.dataset.category;
                loadProducts(categoryName);
            });

            category.addEventListener('mouseenter', function() {
                this.querySelector('.dropdown').style.display = 'block';
            });
            category.addEventListener('mouseleave', function() {
                this.querySelector('.dropdown').style.display = 'none';
            });
        });
    }

    function loadProducts(category) {
        if (isLoading) return;
        isLoading = true;

        fetch(`../products/${category}/${category === 'cleaning' ? 'chistyashie_sredstva' : category}.json`)
            .then(response => response.json())
            .then(data => {
                const startIndex = (currentPage - 1) * productsPerPage;
                const endIndex = startIndex + productsPerPage;
                const productsToLoad = data.slice(startIndex, endIndex);

                if (productsToLoad.length === 0) {
                    window.removeEventListener('scroll', handleScroll);
                    return;
                }

                productsToLoad.forEach(product => {
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

                    productContainer.appendChild(productCard);
                });

                currentPage++;
                isLoading = false;
            })
            .catch(error => console.error('Error loading products:', error));
    }

    function handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
            loadProducts(categoryParam);
        }
    }

    if (categoryParam) {
        window.addEventListener('scroll', handleScroll);
    }

    categories.forEach(category => {
        const dropdown = category.querySelector('.dropdown');
        if (dropdown) {
            category.addEventListener('mouseover', function() {
                dropdown.style.display = 'block';
            });

            category.addEventListener('mouseout', function() {
                dropdown.style.display = 'none';
            });
        }
    });
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
    },
};

function changeLanguage(lang) {
    const t = translations[lang];

    document.querySelector('.category[data-category="cleaning"] h2').textContent = t.cleaningTitle;
    document.querySelector('.category[data-category="kosmetika"] h2').textContent = t.kosmetikaTitle;
    document.querySelector('.category[data-category="bad"] h2').textContent = t.badTitle;
    document.querySelector('.category[data-category="textil"] h2').textContent = t.textilTitle;
    document.querySelector('.header-nav a:nth-child(1)').textContent = t.mainNav;
    document.querySelector('.header-nav a:nth-child(2)').textContent = t.catalogNav;
    document.querySelector('.header-nav a:nth-child(3)').textContent = t.paymentNav;
    document.querySelector('.header-nav a:nth-child(4)').textContent = t.marketingNav;
    document.querySelector('.header-nav a:nth-child(5)').textContent = t.contactsNav;
    document.querySelector('.footer-nav a:nth-child(1)').textContent = t.mainNav;
    document.querySelector('.footer-nav a:nth-child(2)').textContent = t.catalogNav;
    document.querySelector('.footer-nav a:nth-child(3)').textContent = t.paymentNav;
    document.querySelector('.footer-nav a:nth-child(4)').textContent = t.marketingNav;
    document.querySelector('.footer-nav a:nth-child(5)').textContent = t.contactsNav;
}

document.getElementById('ru-button').addEventListener('click', () => {
    changeLanguage('ru');
});

document.getElementById('ua-button').addEventListener('click', () => {
    changeLanguage('ua');
});

// Устанавливаем язык по умолчанию (например, русский)
changeLanguage('ru');