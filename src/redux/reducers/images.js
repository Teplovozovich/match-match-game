const rodent = require.context('./../../../public/assets/jpg', true, /\.jpg$/);

const imagePathsRodent = rodent.keys().map(image => {
    const imagePath = "assets/jpg" + image;
    return imagePath.replace("./", '/');
});

export {imagePathsRodent}

