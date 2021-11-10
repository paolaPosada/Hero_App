import { heroes } from "../data/heroes";

export const getHeroesByPublisher = (publisher) => {
    const validPublisher = ['DC Comics','Marvel Comics'];
    //Validar si existe el publisher, si no existe genera un error
    if (!validPublisher.includes(publisher)){
        throw new Error(`Publisher "${publisher}" no es correcto`);
    }
    //Si existe lo retorna
    return heroes.filter(hero => hero.publisher === publisher);
}