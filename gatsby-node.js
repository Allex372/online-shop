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

    const cultureFilter = ['wheat', 'sunflower', 'soybean', 'apple', 'rapeseed', 'tomatoes']; // Типи фільтрів опт/гурт

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
};
