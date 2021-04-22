import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

/* 리덕사는 3가지 액션이 필요하다. (호출,성공,실패) 
미동기 작업후 다시 dispatch를 호출하면 동기적인 작업으로 보임
*/

//리덕스 내부에서 미들웨어의 타이밍을 잡기위해 사용하는 커링 

//action 은 내가 바꿀 데이터를 의미
//state 은 리덕스가 가지고 있는 state을 의미 

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

// 객체 모양을 type 이란 속성을 가지도록 규정한다. 
// 데이터줒 payload 가로 명칭 후 사용 

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


//Comments
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




export const postComment = (bloginfosId, rating, author, text) => dispatch => {
    
    const newComment = {
        bloginfosId: bloginfosId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
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