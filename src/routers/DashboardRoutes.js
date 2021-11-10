import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { DcScreen } from '../components/dc/DcScreen'
import { HeroScreen } from '../components/heroes/HeroScreen'
import { Navbar } from '../components/iu/Navbar'
import { MarvelScreen } from '../components/marvel/MarvelScreen'
import { SearchScreen } from '../components/search/SearchScreen'

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="container mt-2">
                <Switch>
                    <Route exact path='/marvel' component={MarvelScreen}></Route>
                    <Route exact path='/hero/:heroeId' component={HeroScreen}></Route>
                    <Route exact path='/search' component={SearchScreen}></Route>
                    <Route exact path='/dc' component={DcScreen}></Route>
                    
                    <Redirect to="/marvel"/>
                </Switch>
            </div>
        </>
    )
}
