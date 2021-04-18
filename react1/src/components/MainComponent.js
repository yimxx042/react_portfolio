import React, { Component } from 'react';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import Blog from './BlogComponent';
import Movies from './MovieComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { BLOGINFOS } from '../shared/bloginfos';
import BlogInformation from './BlogInformation';



// import { connect } from 'react-redux';



class Main extends Component {
        constructor(props) {
        super(props);
        this.state = {
            bloginfos: BLOGINFOS
        };
    }  

    render() {

        const BloginformationId = ({match}) => {
            return (
                <BlogInformation bloginfo={this.state.bloginfos.filter(bloginfo => bloginfo.id === +match.params.bloginfoId[0])} />
            );
        };

        return (
            <div>
                <Header />
                <Switch>               
                    <Route path ='/movies' component= { Movies } />
                    <Route exact path='/blog' render={() => <Blog bloginfos={this.state.bloginfos} />} />
                    <Route path='/blog/:bloginfoId' component={BloginformationId} />
                    <Route exact path ='/feedback' component= { Contact } />
                    <Redirect to='./movies' />
                    {/* <Route path ='/home' component= { Home } /> */}

                </Switch>
            </div>
        )
    }

    
}

export default withRouter(Main) ;