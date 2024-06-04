const rodent = require.context('./../../../public/assets/images/rodent', true, /\.jpg$/);
const food = require.context('./../../../public/assets/images/food', true, /\.jpg$/);
const fruits = require.context('./../../../public/assets/images/fruits', true, /\.jpg$/);

const backSideCard = require.context('./../../../public/assets/images/back-side-card', true, /\.jpg$/);
const backgrounds = require.context('./../../../public/assets/images/numbers-background', true, /\.jpg$/);




const imagePathsFruits = fruits.keys().map(image => {
    const imagePath = "assets/images/fruits" + image;
    return imagePath.replace("./", '/');
});

const imagePathsRodent = rodent.keys().map(image => {
    const imagePath = "assets/images/rodent" + image;
    return imagePath.replace("./", '/');
});

const imagePathsFood = food.keys().map(image => {
    const imagePath = "assets/images/food" + image;
    return imagePath.replace("./", '/');
});

const imagePathsBackSideCard = backSideCard.keys().map(image => {
    const imagePath = "assets/images/back-side-card" + image;
    return imagePath.replace("./", '/');
});

const imagePathsBackgrounds = backgrounds.keys().map(image => {
    const imagePath = "assets/images/numbers-background" + image;
    return imagePath.replace("./", '/');
});

export {
    imagePathsBackSideCard, imagePathsBackgrounds,
    imagePathsFood, imagePathsRodent, imagePathsFruits,

}

