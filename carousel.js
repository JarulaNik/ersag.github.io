
//карусель на главной странице

const carousel = document.querySelector('.carousel');
const images = carousel.querySelectorAll('img');
let currentImage = 0;

function showNextImage() {
    images[currentImage].classList.remove('active');
    currentImage = (currentImage + 1) % images.length;
    images[currentImage].classList.add('active');
}

images[0].classList.add('active');
setInterval(showNextImage, 3000);










//анимация подарков на главной странице

const giftItems = document.querySelectorAll('.gift-item');
let currentIndex = 0;
let direction = 1;

function animateGifts() {
    giftItems.forEach((item, index) => {
        let size = 150;

        if (index === currentIndex) {
            size = 200;
        }

        item.style.width = size + 'px';
    });

    currentIndex += direction;

    if (currentIndex === giftItems.length - 1) {
        direction = -1;
    } else if (currentIndex === 0) {
        direction = 1;
    }
}

setInterval(animateGifts, 1500);


const translations = {
    ru: {
        mainTitle: 'Инновационные решения для красоты и здоровья от международной турецкой компании',
        mainDescription: 'Откройте для себя инновационные продукты для здоровья и красоты от ersag: натуральные продукты и пищевые добавки.',
        catalogButton: 'Посмотреть каталог',
        aboutTitle: 'О компании',
        aboutDescription: 'Производя чистящие и косметические средства Ersağ, путем прямых продаж нашим клиентам с помощью системы сетевого маркетинга, производя честную торговлю мы завоевываем доверие наших клиентов стараемся постоянно развиваться и усиливать сервис обслуживания.',
        giftsTitle: 'Пример подарков',
        olivaTitle: 'Листья оливы',
        damlaTitle: 'Дамла',
        banyoTitle: 'Баньо',
        bioTitle: 'Биошампунь',
        shampTitle: 'Гель для душа',
        mainNav: 'Главная',
        catalogNav: 'Каталог',
        paymentNav: 'Оплата и доставка',
        marketingNav: 'Маркетинг',
        contactsNav: 'Контакты',
    },
    ua: {
        mainTitle: 'Інноваційні рішення для краси та здоров\'я від міжнародної турецької компанії',
        mainDescription: 'Відкрийте для себе інноваційні продукти для здоров\'я та краси від ersag: натуральні продукти та харчові добавки.',
        catalogButton: 'Переглянути каталог',
        aboutTitle: 'Про компанію',
        aboutDescription: 'Виробляючи чистячі та косметичні засоби Ersağ, шляхом прямих продажів нашим клієнтам за допомогою системи мережевого маркетингу, виробляючи чесну торгівлю ми завойовуємо довіру наших клієнтів намагаємося постійно розвиватися та посилювати сервіс обслуговування.',
        giftsTitle: 'Приклад подарунків',
        olivaTitle: 'Листя оливи',
        damlaTitle: 'Дамла',
        banyoTitle: 'Баньо',
        bioTitle: 'Біошампунь',
        shampTitle: 'Гель для душу',
        mainNav: 'Головна',
        catalogNav: 'Каталог',
        paymentNav: 'Оплата та доставка',
        marketingNav: 'Маркетинг',
        contactsNav: 'Контакти',
    },
};

function changeLanguage(lang) {
    const t = translations[lang];
    localStorage.setItem('selectedLanguage', lang);

    document.querySelector('.left-content h2').textContent = t.mainTitle;
    document.querySelector('.left-content p').textContent = t.mainDescription;
    document.querySelector('.left-content button').textContent = t.catalogButton;
    document.querySelector('.about-company h2').textContent = t.aboutTitle;
    document.querySelector('.about-text p').textContent = t.aboutDescription;
    document.querySelector('.gifts h2').textContent = t.giftsTitle;
    document.querySelector('.gift-1 .gift-title').textContent = t.olivaTitle;
    document.querySelector('.gift-2 .gift-title').textContent = t.damlaTitle;
    document.querySelector('.gift-3 .gift-title').textContent = t.banyoTitle;
    document.querySelector('.gift-4 .gift-title').textContent = t.bioTitle;
    document.querySelector('.gift-5 .gift-title').textContent = t.shampTitle;
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
function loadSavedLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }
}
// Устанавливаем язык по умолчанию (например, русский)
changeLanguage('ru');