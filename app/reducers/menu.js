// @flow

const homepage = (state = {activeMenu:null}, action) => {
    console.log(action);
    switch (action.type) {
        case "ROUTE_CHANGE":
            return {...state, activeMenu: action.data};
        default:
            return state;
    }
}

export default homepage;