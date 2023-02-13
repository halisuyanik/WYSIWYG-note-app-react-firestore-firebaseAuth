export const authReducer=(state, action)=>{
    switch(action.type){
        case 'SIGNIN': return{user:action.payload};
        case 'LOGOUT': return{user:null}
        default: return state;
    }
}
