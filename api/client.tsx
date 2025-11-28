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
export const ApiItem = async (queryParams: QyeryParams): Promise<ApiResponse> => {
    // Load directly from JSON file
    const response = await axios.get(`${process.env.api_url}api/${queryParams.archive}?${queryParams.slug ? `slug=${queryParams.slug}` : ""}`)
    const apiResponse: ApiResponse = response.data
    return apiResponse
}