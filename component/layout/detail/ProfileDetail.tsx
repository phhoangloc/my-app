import { ApiDeleteItem, ApiItem } from '@/api/user'
import { UserState } from '@/redux/reducer/UserReduce'
import store from '@/redux/store'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation'
type Props = {}

const ProfileDetail = (props: Props) => {
    const [_currentUser, set_currentUser] = useState<UserState>(store.getState().user)
    const update = () => {
        store.subscribe(() => set_currentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    }, [])

    const [_pic, set_pic] = useState<{ name: string }[]>([])
    const [_blog, set_blog] = useState<{ id: number, name: string, slug: string }[]>([])

    useEffect(() => {
        const getPic = async () => {
            const res = await ApiItem({ position: "user", archive: "pic" })
            if (res.success) {
                set_pic(res.data as { name: string }[])
            }
        }
        const getBlog = async () => {
            const res = await ApiItem({ position: "user", archive: "blog" })
            if (res.success) {
                set_blog(res.data as { id: number, name: string, slug: string }[])
            }
        }
        getBlog()
        getPic()
    }, [])

    const toPage = useRouter()

    const deleteBlog = async (id: number) => {
        const res = await ApiDeleteItem({ position: "user", archive: "blog", id })
        if (res.success) {
            alert(res.success)
        } else {
            alert(res.success)
        }
    }
    return (
        <div>
            <div className="text-xl font-bold uppercase">Profile</div>
            <div className=" gap-2 border border-three/50 p-2 rounded-md bg-white h-12 flex flex-col justify-center">
                hello {_currentUser.user?.username}!
            </div>
            <div className="h-12"></div>
            <div className="font-bold uppercase">Picture</div>
            <div className="grid grid-cols-3 gap-2 border border-three/50 p-2 rounded-md bg-white">
                {_pic.map((item, index) => <div key={index} className='relative aspect-video w-full'>
                    <Image src={process.env.ftp_url + item.name} fill className='object-cover' alt={item.name} />
                </div>)}
            </div>

            <div className="h-12"></div>
            <div className="font-bold uppercase">Blog</div>
            <div className="grid grid-cols-1 gap-2 border border-three/50 rounded-md bg-white">
                <div className='bg-two/50 p-2 text-sm border-b border-three/50'>name</div>
                {_blog.map((item, index) =>
                    <div key={index} className="flex justify-between odd:bg-two/25 p-2">
                        <div key={index} className='relative  line-clamp-1 overflow-hidden '>
                            {item.name}
                        </div>
                        <div className="flex gap-1">
                            <EditIcon className='w-6! h-6! cursor-pointer opacity-50 hover:opacity-100' onClick={() => toPage.push("/add?slug=" + item.slug)} />
                            <DeleteIcon className='w-6! h-6! cursor-pointer opacity-50 hover:opacity-100' onClick={() => deleteBlog(item.id)} />
                        </div>
                    </div>)}
            </div>
        </div>
    )
}

export default ProfileDetail