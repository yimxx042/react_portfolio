import React, { Component } from 'react';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import Blog from './BlogComponent';
import Movies from './MovieComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import BlogInformation from './BlogInformation';
import { connect } from 'react-redux';
import { postComment, fetchBloginfos, postFeedback, fetchComments  } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';


// import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        bloginfos: state.bloginfos,
        comments: state.comments
    };
};

const mapDispatchToProps = {
    postComment: (bloginfoId, rating, author, text ) => (postComment(bloginfoId, rating, author, text)),
    fetchBloginfos: () => (fetchBloginfos()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    postFeedback: (text) => (postFeedback(text)),
    fetchComments: () => (fetchComments())
}


class Main extends Component {
    componentDidMount() {
        this.props.fetchBloginfos();
        this.props.fetchComments();
    }

    render() {

        const BloginformationId = ({match}) => {
            return (
                <BlogInformation 
                    bloginfo={this.props.bloginfos.bloginfos.filter(bloginfo => bloginfo.id === +match.params.bloginfoId[0])}
                    errMess={this.props.bloginfos.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.bloginfoId === +match.params.bloginfoId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                
                />
            );
        };

        return (
            <div>
                <Header />
                <Switch>               
                    <Route path ='/movies' component= { Movies } />
                    <Route exact path='/blog' render={() => <Blog bloginfos={this.props.bloginfos} />} />
                    <Route path='/blog/:bloginfoId' component={BloginformationId} />
                    <Route exact path ='/feedback' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}  postFeedback={this.props.postFeedback}/> } />
                    <Redirect to='./movies' />
                    {/* <Route path ='/home' component= { Home } /> */}

                </Switch>
            </div>
        )
    }

    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));