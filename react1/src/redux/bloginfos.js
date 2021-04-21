import * as ActionTypes from './ActionTypes';

export const Bloginfos = (state = {
    isLoading: true,
    errMess: null,
    bloginfos: []
}, action) => {
switch (action.type) {
    case ActionTypes.ADD_BLOGINFOS:
        return {...state, isLoading: false, errMess: null, bloginfos: action.payload};
    case ActionTypes.BLOGINFOS_LOADING:
        return {...state, isLoading: true, errMess: null, bloginfos: []};
    case ActionTypes.BLOGINFOS_FAILED:
        return {...state, isLoading: false, errMess: action.payload};
    default:
        return state;
}
};