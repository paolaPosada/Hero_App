import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
//import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {

    const { dispatch } = useContext(AuthContext)

    const handleLogin = () => {
        // history.push('/') //Se usa para redireccionar si se da en el boton de atras vuelve a lo que tiene en el hisotrial

        const lastPath = localStorage.getItem('lastPath') || '/'; //Para llevar al usuario a la pagina que estaba antes de cerrar sesion
        dispatch({
            payload: { name: 'Dani' },
            type: types.login
        });
        history.replace(lastPath); //reemplaza el history con la nueva ruta
    }

    return (
        <div className="container mt-5">
            <h1>Login </h1>
            <hr></hr>
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
    )
}
