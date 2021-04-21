import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';



export const fetchBloginfos = () => dispatch => {
    dispatch(bloginfosLoading());

    return fetch(baseUrl + 'bloginfos')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(bloginfos => dispatch(addBloginfos(bloginfos)))
        .catch(error => dispatch(bloginfosFailed(error.message)));
};



export const bloginfosLoading = () => ({
    type: ActionTypes.BLOGINFOS_LOADING
});

export const bloginfosFailed = errMess => ({
    type: ActionTypes.BLOGINFOS_FAILED,
    payload: errMess
});


export const addBloginfos = bloginfos => ({
    type: ActionTypes.ADD_BLOGINFOS,
    payload: bloginfos
});

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};


export const postComment = (bloginfosId, rating, author, text) => dispatch => {
    
    const newComment = {
        bloginfosId: bloginfosId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'bloginfos', {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post comment', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        });
};

export const postFeedback = (feedback) => dispatch =>  {
    
    const newComment = {
        ...feedback
    };
console.log("hi")
    return fetch(baseUrl + 'feedback', {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }
        )
        //.then(response => response.json())
        .then(response => postFeedback(response))
        .then(console.log('Current State is: ' + JSON.stringify(newComment)))
        .then(alert('Thank you for your feedback! \r\n\r\n You Submitted: ' + JSON.stringify(newComment)))
        .catch(error => {
            console.log('post comment', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        });

};