import axios from "axios"
import { arch } from "os"

type BlogSummarize = {
    id: number
    archive: string
    name: string
    slug: string
    host: {
        id: number
        username: string
        email: string
    }
    cover: string | null
    content: string
    createdAt: string
    tag: Array<{
        tag: {
            id: number
            name: string
        }
    }>
}

type ApiResponse = {
    success: boolean
    message?: string
    data: BlogSummarize[] | BlogSummarize
}
type QyeryParams = {
    slug?: string | "blog",
    archive?: string,
    name?: string,
}
export const ApiLogin = async (body: { username: string, password: string }) => {
    const result = await axios.post(process.env.api_url + "api/login", body, {
        withCredentials: true
    })
    return result.data
}
export const ApiSignup = async (body: { username: string, password: string, email: string }) => {
    const result = await axios.post(process.env.api_url + "api/signup", body, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return result.data
}
export const ApiItem = async (queryParams: QyeryParams): Promise<ApiResponse> => {
    // Load directly from JSON file
    const response = await axios.get(`${process.env.api_url}api/${queryParams.archive}?${queryParams.slug ? `slug=${queryParams.slug}` : ""}`)
    const apiResponse: ApiResponse = response.data
    return apiResponse
}