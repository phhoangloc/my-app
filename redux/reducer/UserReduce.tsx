import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"

type User = {
    id: number
    archive: string
    username: string
    email: string
    active: boolean
    position: 'user' | 'admin'
    createdAt: string
}

export type UserState = {
    user: User | null
    isLoggedIn: boolean
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false
}

const UserReducer = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: {
            reducer: (state: UserState, action: PayloadAction<User | null>) => {
                state.user = action.payload
                state.isLoggedIn = action.payload !== null
                return state
            },
            prepare: (user: User | null) => {
                return {
                    payload: user
                }
            }
        },
        clearUser: {
            reducer: (state: UserState) => {
                state.user = null
                state.isLoggedIn = false
                return state
            },
            prepare: () => {
                return {
                    payload: undefined
                }
            }
        }
    }
})

export const { actions, reducer } = UserReducer
export const { setUser, clearUser } = actions;

export default UserReducer

