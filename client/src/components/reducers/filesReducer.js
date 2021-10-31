export const filesReducer = (state = [], action) => {
    switch(action.type){
        case 'IN':
            return [...state, ...action.payload];
        default:
            return state;
    }
}