'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ApiItem } from "@/api/client"
import moment from "moment"
import parse from "html-react-parser";


export default function Home() {

  const [_blog, set_blog] = useState<{
    cover: string
    name: string,
    slug: string,
    id: number,
    createdAt: string,
    host: {
      username: string
    },
    content: string
  }[]>([])


  useEffect(() => {
    const getBlogList = async () => {
      const res = await ApiItem({ archive: "blog" });
      if (res.success) {
        set_blog(res.data as {
          name: string,
          slug: string,
          id: number,
          cover: string,
          createdAt: string,
          host: {
            username: string
          },
          content: string
        }[]);
      } else {
        alert("Failed to fetch blog list");
      }
    }
    getBlogList();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
        {_blog.map((item) => (
          <div key={item.id} className=" rounded-md overflow-hidden">
            <div className="relative aspect-video backdrop-brightness-75">
              {item.cover ? <Image src={process.env.ftp_url + item.cover || "/default-cover.jpg"} fill className="object-cover" alt={item.name} /> : null}
            </div>
            <div className="h-4"></div>
            <div className="opacity-50 text-xs ">{moment(item.createdAt).format("YYYY/MM/DD")}</div>
            <Link href={`/blog/${item.slug}`}>
              <h1 className="line-clamp-3 m-0! overflow-hidden text-lg font-bold font-noto-serif h-[84px]">{item.name}</h1>
            </Link>
            <div className="h-1"></div>
            <div className="line-clamp-4 opacity-75">{parse(item.content)}</div>
          </div>

        ))}
      </div>
    </div>
  )
}

