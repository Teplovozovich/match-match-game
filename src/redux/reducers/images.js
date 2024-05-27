const rodent = require.context('./../../../public/assets/images/rodent', true, /\.jpg$/);
const food = require.context('./../../../public/assets/images/food', true, /\.jpg$/);
const backSideCard = require.context('./../../../public/assets/images/back-side-card', true, /\.jpg$/);

const imagePathsBackSideCard = backSideCard.keys().map(image => {
    const imagePath = "assets/images/back-side-card" + image;
    return imagePath.replace("./", '/');
});

const imagePathsRodent = rodent.keys().map(image => {
    const imagePath = "assets/jpg" + image;
    return imagePath.replace("./", '/');
});

const imagePathsFood = food.keys().map(image => {
    const imagePath = "assets/jpg" + image;
    return imagePath.replace("./", '/');
});

export {imagePathsRodent, imagePathsBackSideCard, imagePathsFood}

