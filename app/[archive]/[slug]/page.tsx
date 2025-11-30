'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ApiItem } from '@/api/client'
import { BlogSummarize } from '@/api/user'
import parse from "html-react-parser";
import moment from "moment"
const Page = () => {
    const params = useParams<{ archive: string, slug: string }>();
    const archive = params.archive;
    const slug = params.slug;

    const [_item, set_item] = useState<BlogSummarize | undefined>()
    useEffect(() => {
        const getBlogDetail = async (slug: string | null) => {
            if (!slug) {
                set_item(undefined)
                return;
            }
            const res = await ApiItem({ slug: slug, archive: archive });
            if (res.success) {
                set_item(res.data as BlogSummarize)
            }
        }
        getBlogDetail(slug);
        // }
    }, [archive, slug]);


    return (
        _item ?
            <div>
                <div className="flex flex-col justify-center text-center h-96 gap-2 border-b border-three">
                    <div className='uppercase px-2 rounded-2xl opacity-75 w-max mx-auto'>{moment(_item.createdAt).format("YYYY/MM/DD")}</div>

                    <h1 className='flex flex-col justify-center text-3xl font-bold text-center font-noto-serif'>{_item.name}</h1>
                    {/* <div className='uppercase py-1 px-2 rounded-2xl text-three font-bold w-max mx-auto'>{_item.host}</div> */}
                </div>
                <div className="py-12">{parse(_item.content)}</div>
                <div className="border-b border-t border-three h-12"></div>
                <div className="h-12"></div>
            </div> :
            <p>no item</p>
    )




}

export default Page