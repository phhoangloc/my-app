'use client'
import React, { useEffect } from 'react'
import axios from 'axios'
import store from '../store'
import { setUser } from '../reducer/UserReduce'

type Props = {
    children: React.ReactNode
}

type User = {
    id: number
    archive: string
    username: string
    email: string
    active: boolean
    position: 'user' | 'admin'
    createdAt: string
}

export const checkLogin = async (): Promise<{ isLoggedIn: boolean; user: User | null }> => {
    const apiUrl = process.env.api_url
    if (!apiUrl) {
        return { isLoggedIn: false, user: null }
    }

    try {
        const result = await axios.get(
            `${apiUrl}api/user`,
            {
                withCredentials: true,
                validateStatus: () => true
            }
        )
        if (result.data.success && result.data.data) {
            const user = result.data.data as User
            store.dispatch(setUser(user))
            return { isLoggedIn: true, user }
        } else {
            store.dispatch(setUser(null))
            return { isLoggedIn: false, user: null }
        }
    } catch {
        store.dispatch(setUser(null))
        return { isLoggedIn: false, user: null }
    }
}

const Provider = ({ children }: Props) => {

    useEffect(() => {
        const checkUserLogin = async () => {
            await checkLogin()
        }
        checkUserLogin()
    }, [])
    return (
        children
    )
}

export default Provider