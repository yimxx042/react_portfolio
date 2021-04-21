import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Bloginfos } from './bloginfos';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';
import { Comments } from './comments';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            bloginfos: Bloginfos,
            comments: Comments,
            ...createForms({
                feedbackForm: InitialFeedback
            })
        }),       
        applyMiddleware(thunk, logger)
    );

    return store;
};