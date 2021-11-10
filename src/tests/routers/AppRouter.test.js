import React from 'react';
import { mount} from 'enzyme'
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en <AppRouter/>', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged:false
        }
    }

    test('Debe de mostrar el login si no esta autenticado ', () => {

        const wrapper = mount(
            <AuthContext.Provider value = {contextValue}>
                <AppRouter/>
            </AuthContext.Provider>

        );

        expect(wrapper).toMatchSnapshot();

    });

    test('Debe de mostrar el componente marvel si esta autenticado', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged:true,
                name: 'Milu'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value = {contextValue}>
                <AppRouter/>
            </AuthContext.Provider>

        );

        expect(wrapper.find('.navbar').exists()).toBe(true);
        
    })
    


})
