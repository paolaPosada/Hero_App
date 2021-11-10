//export const heroImg = require.context('../assets/heroes', true);
let loadImages = () => ({default: ''});
 
try {
    loadImages = require.context('../assets/heroes',true);
} catch (e){};
 
export const heroImg = (image) => (loadImages(`./${image}`));