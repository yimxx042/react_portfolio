import React, { Component } from 'react';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

// import { connect } from 'react-redux';


class Main extends Component {

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path ='/contactme' component= { Contact } />
                </Switch>
            </div>
        )
    }
}

export default Main ;