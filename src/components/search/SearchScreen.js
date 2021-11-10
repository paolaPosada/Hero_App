import React, { useMemo } from 'react';
import queryString from 'query-string';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/UseForm/useForm';
import { useLocation } from 'react-router';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    //Obtener el query
    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        searchText: q
    });

    const { searchText } = formValues;

    // const heroesFiltered = getHeroesByName(searchText);
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    //Como hace refresh hay que recibir el evento
    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`)
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr></hr>
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr></hr>

                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder="Find your hero" className="form-control" autoComplete="off"
                            name="searchText" value={searchText} onChange={handleInputChange}></input>
                        <button type="submit" className="btn m-1 btn-block btn-outline-primary" >
                            Search</button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />
                    { 
                        (q === '' )
                            && <div className="alert alert-info">
                                Search a hero
                            </div>
                    }
                    { 
                        (q !== '' && heroesFiltered.length === 0)
                            && <div className="alert alert-danger">
                                There is no a hero "{q}"
                            </div>
                    }
                    {
                        heroesFiltered.map(hero => (
                            <HeroCard key={hero.id} {...hero} />
                        ))
                    }
                </div>

            </div>
        </div>
    )
}
