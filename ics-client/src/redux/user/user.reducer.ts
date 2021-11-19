import {  userActions, UserState } from "./user.types"

const INITIAL_STATE : UserState = {
    currentUser : {},
    isAdmin: true,
}

const userReducer = (state = INITIAL_STATE, action : any) => {
    switch(action.type) {
        case userActions.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        default:
            return state;
    }
}

export default userReducer;