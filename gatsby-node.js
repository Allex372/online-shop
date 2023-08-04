const path = require('path');

const ChemistryArray = [
    {
        id: 1,
        name: 'gerbicydy',
    },
    {
        id: 2,
        name: 'fungicydy',
    },
    {
        id: 3,
        name: 'inectecydy',
    },
    {
        id: 4,
        name: 'protruinyky',
    },
    {
        id: 5,
        name: 'desucanty',
    },
    {
        id: 6,
        name: 'adiuvanty',
    },
    {
        id: 7,
        name: 'dobryva',
    },
]

const ProductsArray = [
    {
        id: 1,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        activeIng: 'Імідаклоприд, 600 г/л',
        // img: require('./src/images/bigBotltle.png'),
        price: 200,
    },
    {
        id: 2,
        name: 'МЕДЯН ЕКСТРА TURBO',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['sunflower', 'soybean'],
        chemistry: 'gerbicydy',
        size: 'gurt',
        activeIng: 'Імідаклоприд, 600 г/л',
        // img: require('./src/images/bigBotltle.png'),
        price: 300,
    },
    {
        id: 3,
        name: 'МЕДЯН ЕКСТРА TURBO',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['sunflower', 'soybean'],
        chemistry: 'gerbicydy',
        size: 'gurt',
        activeIng: 'Імідаклоприд, 600 г/л',
        // img: require('./src/images/bigBotltle.png'),
        price: 400,
    },
    {
        id: 4,
        name: 'МЕДЯН ЕКСТРА TURBO',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['sunflower', 'soybean'],
        chemistry: 'gerbicydy',
        size: 'gurt',
        activeIng: 'Імідаклоприд, 600 г/л',
        // img: require('./src/images/smallBottle.png'),
        price: 500,
    },
    {
        id: 5,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        activeIng: 'Імідаклоприд, 600 г/л',
        // img: require('./src/images/smallBottle.png'),
        price: 600,
    },
    {
        id: 6,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        activeIng: 'Імідаклоприд, 600 г/л',
        // img: require('./src/images/smallBottle.png'),
        price: 700,
    },
    {
        id: 7,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        activeIng: 'Імідаклоприд, 600 г/л',
        // img: require('./src/images/smallBottle.png'),
        price: 800,
    },
    {
        id: 8,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        activeIng: 'Імідаклоприд, 600 г/л',
        // img: require('./src/images/smallBottle.png'),
        price: 900,
    },
    {
        id: 9,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        activeIng: 'Імідаклоприд, 600 г/л',
        // img: require('./src/images/smallBottle.png'),
        price: 100,
    },
    {
        id: 10,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        activeIng: 'Імідаклоприд, 600 г/л',
        // img: require('./src/images/smallBottle.png'),
        price: 1000,
    },
    {
        id: 11,
        name: 'МЕДЯН ЕКСТРА Фунгіцид',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        activeIng: 'Імідаклоприд, 600 г/л',
        // img: require('./src/images/smallBottle.png'),
        price: 1100,
    },
    {
        id: 12,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        activeIng: 'Імідаклоприд, 600 г/л',
        // img: require('./src/images/smallBottle.png'),
        price: 1200,
    },
    {
        id: 13,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'apple', 'rapeseed'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        activeIng: 'Імідаклоприд, 600 г/л',
        // img: require('./src/images/smallBottle.png'),
        price: 1300,
    },
    {
        id: 14,
        name: 'МЕДЯН ЕКСТРА',
        description: 'Системний післясходовий гербіцид для контролю однорічних широколистих',
        culture: ['tomatoes', 'soyabean'],
        chemistry: 'fungicydy',
        size: 'rozdrib',
        activeIng: 'Імідаклоприд, 600 г/л',
        // img: require('./src/images/smallBottle.png'),
        price: 1400,
    },
];



exports.createPages = async ({ actions }) => {
    const { createPage } = actions;

    // Для кожного об'єкта ChemistryArray створюємо сторінку з відповідним фільтром
    ChemistryArray.forEach((el) => {
        const filter = encodeURIComponent(el.name);

        createPage({
            path: `/products/${filter}`,
            component: require.resolve('./src/pages/products.js'),
            context: { filter },
        });
    });

    const filters = ['rozdrib', 'gurt']; // Типи фільтрів опт/гурт

    filters.forEach((filter) => {
        const path = `/products/${filter}`;

        createPage({
            path,
            component: require.resolve('./src/pages/products.js'),
            context: {
                filter,
            },
        });
    });

    const cultureFilter = ['wheat', 'sunflower', 'soybean', 'apple', 'rapeseed', 'tomatoes']; // Типи фільтрів культури

    cultureFilter.forEach((filter) => {
        const path = `/products/${filter}`;

        createPage({
            path,
            component: require.resolve('./src/pages/products.js'),
            context: {
                filter,
            },
        });
    });

    ProductsArray?.forEach(node => {
        const { id, name } = node;
        actions.createPage({
            path: `products/${id}/${name}`,
            component: path.resolve('./src/templates/single-product.js'),
            // context: { url }
            context: { productData: node }
        })
    });
};
