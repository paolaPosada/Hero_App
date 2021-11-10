import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {

const user = {
    name: 'Danielito'
}

    test('Debe retornar el estado por defecto', () => {
        const state = authReducer({logged :false}, {});
        expect(state).toEqual({logged :false});
    });

    test('Debe autenticar y colocar el name del usuario', () => {

        const action = {
            type: types.login,
            payload: user
        }

        const state = authReducer({logged :false}, action );
        expect(state.name).toBe('Danielito');
        expect(state.logged).toBe(true);
        expect(state).toEqual({
            logged: true,
            name:'Danielito'
        })

    })

    test('Debe de borrar el name del usuario y logged en false', () => {
        const action = {
            type: types.logout,
        }

        const state = authReducer({logged:true, name:"Paola"}, action );
        expect(state.name).toBe(undefined);
        expect(state.logged).toBe(false);
        expect(state).toEqual({
            logged: false,
        });

    })
    
})
