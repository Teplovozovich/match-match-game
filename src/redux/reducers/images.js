const rodent = require.context('./../../../public/assets/jpg', true, /\.jpg$/);

const imagePathsRodent = rodent.keys().map(image => rodent.resolve(image).replace('./public', '.'));

export default imagePathsRodent

