import React from 'react';
import { mount, shallow } from 'enzyme'
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <HeroScreen/>', () => {

    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }


    test('Debe mostrar el componente redirect si no hay argumentos en el URL (initial entries)', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={historyMock} />
            </MemoryRouter>
        )
        expect(wrapper.find('Redirect').exists()).toBe(true);
    });

    test('Debe de mostrar un heroe si el parametro existe y se encuentra', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path='/hero/:heroeId' component={HeroScreen}></Route>
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);

    });

    test('Debe de regresar a la pantalla anterior con push', () => {

        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path='/hero/:heroeId'
                    component={(props) => <HeroScreen history={historyMock} />} />
            </MemoryRouter>
        );
    
        wrapper.find('button').prop('onClick')();
            expect(historyMock.push).toHaveBeenCalledWith('/marvel');
            expect(historyMock.goBack).not.toHaveBeenCalled();
    });

    test('Debe de regresar a la pantalla anterior con push', () => {

        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/dc-batman']}>
                <Route
                    path='/hero/:heroeId'
                    component={(props) => <HeroScreen history={historyMock} />} />
            </MemoryRouter>
        );
    
        wrapper.find('button').prop('onClick')();
            expect(historyMock.push).toHaveBeenCalledWith('/dc');
            expect(historyMock.goBack).not.toHaveBeenCalled();
    });

    test('Debe de regresar a la pantalla anterior', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/dc-batman']}>
                <Route
                    path='/hero/:heroeId'
                    component={(props) => <HeroScreen history={historyMock} />} />
            </MemoryRouter>
        );
    
        wrapper.find('button').prop('onClick')();
            expect(historyMock.push).not.toHaveBeenCalled();
            expect(historyMock.goBack).toHaveBeenCalled();
    });

    test('Debe de llamar el redirect si el hero no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/dc-batman12332']}>
                <Route
                    path='/hero/:heroeId'
                    component={(props) => <HeroScreen history={historyMock} />} />
            </MemoryRouter>
        );
            expect(wrapper.text()).toBe('')

    });

})

