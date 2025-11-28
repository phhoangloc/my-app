'use client'

import { useState } from "react"
import Link from "next/link"
import { TextField, Button, Container, Card, CardContent, CircularProgress, Alert } from "@mui/material"
import { EmailOutlined, LockOutlined } from "@mui/icons-material"
import axios from "axios"

const Page = () => {
    const [username, set_username] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({})
    const [isLoading, setIsLoading] = useState(false)
    const [submitError, setSubmitError] = useState('')

    const validateForm = () => {
        const newErrors: { username?: string; password?: string } = {}

        if (!username) {
            newErrors.username = 'Username is required'
        }

        if (!password) {
            newErrors.password = 'Password is required'
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitError('')
        if (!validateForm()) {
            return
        }
        setIsLoading(true)
        try {
            const response = await axios.post(process.env.api_url + 'api/login', {
                username,
                password,
            }, {
                withCredentials: true
            })
            // Handle successful login here (e.g., redirect, show message)
            console.log('Login successful:', response.data)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setSubmitError('Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="">
                <form className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                    {submitError && <Alert severity="error">{submitError}</Alert>}
                    <div className="text-center mb-6 text-3xl font-bold">
                        <div className="my-2">Log In</div>
                        <div className="text-sm text-gray-600">Welcome Back</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-sm">Username</div>
                        <input
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-three focus:border-three"
                            type="text"
                            onChange={(e) => set_username(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-sm">Password</div>
                        <input
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-three focus:border-three"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full max-w-40 m-auto bg-three text-white rounded-lg px-4 py-2 hover:bg-three/90 transition-colors disabled:opacity-50 flex justify-center items-center"
                        onClick={handleSubmit}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
                    </button>
                </form>
                {/* Footer */}
                <p className="text-center text-gray-600 text-xs mt-6">
                    © 2025 My Project. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default Page