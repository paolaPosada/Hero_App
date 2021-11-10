import React from 'react';
import { mount, shallow } from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';
describe('Pruebas en <SearchScreen/>', () => {

    const wrapper = mount(
        <MemoryRouter initialEntries={['/search']}>
            <Route path="/search" component={SearchScreen}>

            </Route>
        </MemoryRouter>
    );

    test('Debe de mostrarse correctamente con los valores por defecto', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
    });

    test('Debe de mostrar a Batman y el input con el valor del queryString', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={SearchScreen}>
                </Route>
            </MemoryRouter>
        );

        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de mostrar un errorsi no se encuentra el hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=paola']}>
                <Route path="/search" component={SearchScreen}>
                </Route>
            </MemoryRouter>
        );

        expect(wrapper.find('input').prop('value')).toBe('paola');
        expect(wrapper.find('.alert-danger').text().trim()).toBe('There is no a hero "paola"');
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de llamar el push del history', () => {
        const historyMock ={
            push: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={() => <SearchScreen history={historyMock}/>}>
                </Route>
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })

        expect(historyMock.push).toHaveBeenCalledWith('?q=batman');
    })
    



})
