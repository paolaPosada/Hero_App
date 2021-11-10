import { heroes } from "../data/heroes";

export const getHeroesById = (id) => {
    const validPublisher = ['DC Comics','Marvel Comics'];

    return heroes.find(hero => hero.id === id);
}