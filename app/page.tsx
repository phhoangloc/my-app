'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { ApiItem } from "@/api/client"


export default function Home() {

  const [_blog, set_blog] = useState<{
    cover: string
    name: string;
    slug: string;
    id: number;
  }[]>([])


  useEffect(() => {
    const getBlogList = async () => {
      const res = await ApiItem({ archive: "blog" });
      if (res.success) {
        set_blog(res.data as {
          name: string;
          slug: string;
          id: number;
          cover: string;
        }[]);
      } else {
        alert("Failed to fetch blog list");
      }
    }
    getBlogList();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-12 px-2">
        {_blog.map((item) => (
          <div key={item.id} className="bg-white/50 rounded-md overflow-hidden shadow-lg">
            <div className="relative aspect-video backdrop-brightness-75">
              {item.cover ? <Image src={process.env.ftp_url + item.cover || "/default-cover.jpg"} fill className="object-cover" alt={item.name} /> : null}
            </div>
            <div className="h-24 px-4">
              <Link href={`/blog/${item.slug}`}>
                <h2 className="line-clamp-2">{item.name}</h2>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

