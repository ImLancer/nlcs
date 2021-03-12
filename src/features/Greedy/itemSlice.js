const { createSlice } = require("@reduxjs/toolkit");

const items = createSlice({
    name: 'items',
    initialState: [],
    reducers: {
        addItem: (state, action) =>{
            state.push( action.payload )
        },
    }
})

const { reducer, actions } = items;
export const { addItem } = actions;
export default reducer;