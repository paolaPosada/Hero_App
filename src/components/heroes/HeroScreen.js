import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { heroImg } from '../../helpers/heroImg';
import { getHeroesById } from '../../selectors/getHeroesById';

//Si la carpeta assets esta en el Src
//const heroImg = require.context('../../assets/heroes', true);

export const HeroScreen = ({ history }) => {

    //Extraer el heroeID
    const { heroeId } = useParams(); //Extrae argumentos en el url como un objeto, se desesctructura para extraer el necesario
    //input (Segundo argumento): cuando debe volverse a disparar el metodo; [heroeId]= es decir si el id cambia
    const hero = useMemo(() => getHeroesById(heroeId), [heroeId])
    //const hero = getHeroesById(heroeId);
    // console.log('Hero: ', hero, 'HeroId: ', heroeId);
    //Validar que el url sea valido
    if (!hero) {
        return <Redirect to="/" />
    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters,
    } = hero;

    const handleReturn = () => {
        if (history.length <= 2) {
            if (hero.publisher === 'DC Comics') {
                history.push('/dc')
            } else {
                history.push('/marvel')
            }
        } else {
            
            history.goBack();
        }
    }

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img
                    //src={`../assets/heroes/${heroeId}.jpg`} //COn la carpeta en public/assets
                    src ={heroImg(`${heroeId}.jpg`)}
                    alt={superhero}
                    className="img-thumbnail animate__animated animate__fadeInLeft" />
            </div>
            <div className="col-8">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b>Alter ego: </b>
                        {alter_ego}
                    </li>
                    <li className="list-group-item">
                        <b>Publisher: </b>
                        {publisher}
                    </li>
                    <li className="list-group-item">
                        <b>First appearance: </b>
                        {first_appearance}
                    </li>
                </ul>
                <h5>Characters</h5> <p>{characters}</p>
                <button className="btn btn-outline-info"
                    onClick={handleReturn}>
                    Return
                </button>

            </div>
        </div>
    )
}
