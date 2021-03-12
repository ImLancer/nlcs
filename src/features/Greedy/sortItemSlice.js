const { createSlice } = require("@reduxjs/toolkit");

const sortItem = createSlice({
    name: 'sortItem',
    initialState: {
        sortItem: [],
        isSort: false,
        isSolve: true,
        grTGT: 0,
        bbTGT: 0,
        GLNTT: 0,
        grLastW: 0,
        bbLastW: 0,
    },
    reducers: {
        addSortItem: (state, action) =>{
            state.sortItem.push(action.payload);
        },
        swapSortItem: (state, action) => {
            let handle = action.payload

            handle.forEach((item, index) => (
                state.sortItem[index] = item
            ))
        },

        setSortComplete: (state,action) => {
            state.isSort = action.payload;
        },
        solveComplete: (state,action) => {
            state.isSolve = action.payload
        },

        setGrResult: (state, action) =>{
            let handle = action.payload;

            state.sortItem[handle[0]].grResult = handle[1];
        },
        setBbResult: (state, action) =>{
            let handle = action.payload;

            state.sortItem[handle[0]].bbResult = handle[1];
        },
        setListResult: (state, action) =>{
            let handle = action.payload;

            handle.forEach((item,index) => {
                state.sortItem[index].bbResult = item;
            })
        },
        setGrTGT: (state, action) =>{
            state.grTGT = action.payload
        },
        setBbTGT: (state, action) =>{
            state.bbTGT = action.payload
        },
        setGLNTT: (state, action) =>{
            state.GLNTT = action.payload
        },
        setGrLastW: (state, action) =>{
            state.grLastW = action.payload
        },
        setBbLastW: (state, action) =>{
            state.bbLastW = action.payload
        }
    }
})

const { reducer, actions } = sortItem;
export const { addSortItem, swapSortItem, setSortComplete, solveComplete, setGrTGT, setBbTGT, setGLNTT, setGrLastW, setBbLastW, setGrResult, setBbResult, setListResult } = actions;
export default reducer;