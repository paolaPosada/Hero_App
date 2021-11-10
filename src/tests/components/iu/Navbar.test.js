import React from 'react';
import { mount } from 'enzyme'
import { MemoryRouter, Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/iu/Navbar';
import { types } from '../../../types/types';

describe('Pruebas en <Navbar/>', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Kyra'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Kyra');
    });

    test('Debe de llamar el logout y usar history', () => {
        // wrapper.find('button').prop('Onclick')();
        wrapper.find('button').simulate('click');
        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.logout
        });

        expect(historyMock.replace).toHaveBeenCalledWith('/login')

    });




})
