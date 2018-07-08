// @flow

const homepage = (state = {userInfo:null}, action) => {
    console.log(action);
    switch (action.type) {
        case "SET_USER_INFO":
            return {...state, userInfo:action.data};
        default:
            return state;
    }
}

export default homepage;