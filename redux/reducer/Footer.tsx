
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"

const FooterReducer = createSlice({
    name: "Footer",
    initialState: false,
    reducers: {
        setFooter: {
            reducer: (state: boolean, action: PayloadAction<boolean>) => {
                return (state = action.payload)
            },
            prepare: (msg: boolean) => {
                return {
                    payload: msg
                }
            }
        }
    }
})

export const { actions, reducer } = FooterReducer
export const { setFooter } = actions;

export default FooterReducer