import React, { Component } from 'react';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import Movies from './MovieComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

// import { connect } from 'react-redux';


class Main extends Component {

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path ='/feedback' component= { Contact } />
                    <Route path ='/movies' component= { Movies } />

                </Switch>
            </div>
        )
    }
}

export default Main ;