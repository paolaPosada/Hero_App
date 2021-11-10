import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroesList = ({publisher}) => {

    //input (Segundo argumento): cuando debe volverse a disparar el metodo; [publisher]= es decir si el publisher cambia
    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher])
    //const heores = getHeroesByPublisher(publisher);

    return (
        <div className="card-columns animate__animated animate__fadeIn">
            {
                heroes.map(hero => (
                    <HeroCard key={hero.id}
                        {...hero}>
                    </HeroCard>
                ))
            }
            
        </div>
    )
}
