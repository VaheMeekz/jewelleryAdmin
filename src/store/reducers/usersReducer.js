import { GET_USERS } from "../types"

const initialState = {
    users:null,
    count:null
}


export const usersReducer = (state=initialState,action) => {
    switch (action.type){
        case GET_USERS:
            return {
                ...state,
                users:action.payload.users,
                count:action.payload.count
            }
        default:
            return state
    }
}