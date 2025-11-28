import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./reducer/MenuReduce";
import ChangePageReducer from "./reducer/ChangePageReduce";
import FooterReducer from "./reducer/Footer";
import UserReducer from "./reducer/UserReduce";
const store = configureStore({
    reducer: {
        menu: MenuReducer.reducer,
        changePage: ChangePageReducer.reducer,
        footer: FooterReducer.reducer,
        user: UserReducer.reducer
    }
})

export default store