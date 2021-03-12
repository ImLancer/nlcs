const { createSlice } = require("@reduxjs/toolkit");

const session = createSlice({
    name: 'session',
    initialState: {
        session: [],
        isByHand: false,
        isBag3: false,
        isBb: false,
        isGr: false,
        isBoth: false,
        isBoth: false,
        isNotSort: false,
    },
    reducers: {
        addSession: (state, action) => {
            state.session.push( action.payload );
        },

        checkBag3: (state, action) => {
            state.isBag3 = action.payload;
        },
        setBb: (state, action) => {
            state.isBb = action.payload;
        },
        setGr: (state, action) => {
            state.isGr = action.payload
        },
        setBoth: (state, action) => {
            state.isBoth = action.payload
        },

        setByHand: (state,action) => {
            state.isByHand = action.payload;
        },
        setNotSort: (state,action) => {
            state.isNotSort = action.payload
        }
    }
})

const { reducer, actions } = session;
export const { addSession, checkBag3, setBb, setGr, setBoth, setByHand, setNotSort } = actions;
export default reducer;