import sessionReducer from 'features/Greedy/greedySlice';
import itemReducer from 'features/Greedy/itemSlice';
import sortItemReducer from 'features/Greedy/sortItemSlice';

const { configureStore } = require("@reduxjs/toolkit");

const rootReducer = {
    session: sessionReducer,
    items: itemReducer,
    sortItem: sortItemReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;