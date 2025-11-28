import axios from "axios"

export type BlogSummarize = {
    id: number
    archive: string
    name: string
    slug: string,
    content: string,
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
    id?: number,
    position?: string,
    file?: File
}
export const ApiItem = async (queryParams: QyeryParams): Promise<ApiResponse> => {
    // Load directly from JSON file
    const response = await axios.get(`${process.env.api_url}api/user/${queryParams.archive}?${queryParams.slug ? `slug=${queryParams.slug}` : ""}`, {
        withCredentials: true
    })
    const apiResponse: ApiResponse = response.data
    if (apiResponse.success) {
        return apiResponse
    } else {
        return {} as ApiResponse
    }

}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ApiCreateItem = async ({ position, archive }: QyeryParams, body: any) => {
    const result = await axios.post(process.env.api_url + "api/" +
        position +
        "/" + archive,
        body,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
    return (result.data)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ApiUpdateItem = async ({ position, archive, id }: QyeryParams, body: any) => {

    const result = await axios.put(process.env.api_url + "api/" +
        position +
        "/" + archive +
        "/" + id,
        body,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
    return (result.data)

}
export const ApiUploadFile = async ({ position, archive, file }: QyeryParams) => {
    const formData = new FormData()
    if (file) {
        formData.append("file", file)
        const fileUpload = await axios.post(process.env.api_url + "api/" + position + "/" + archive, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,

            },
            withCredentials: true
        })
        return fileUpload.data
    }

}