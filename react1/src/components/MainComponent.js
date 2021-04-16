import React, { Component } from 'react';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import Blog from './BlogComponent';
import Movies from './MovieComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { BLOGINFOS } from '../shared/bloginfos';
import Bloginformation from './BlogInformation';

// import { connect } from 'react-redux';



class Main extends Component {
        constructor(props) {
        super(props);
        this.state = {
            bloginfos: BLOGINFOS,
            bloginfoId: BLOGINFOS.id
        };
    }  

    
    

    render() {

        const BloginformationId = ({match}) => {
            return (
                <Bloginformation 
                    bloginfo={this.state.bloginfos.filter(bloginfo => bloginfo.id === +match.params.bloginfoId[0])}
                />
            )
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path ='/feedback' component= { Contact } />
                    <Route path ='/movies' component= { Movies } />
                    <Route exact path='/blog' render={() => <Blog bloginfos={this.state.bloginfos} />} />
                    <Route path='/blog/:bloginfoId' component={BloginformationId} />

                </Switch>
            </div>
        )
    }

    
}

export default Main ;