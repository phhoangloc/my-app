import Textarea from "@/component/input/textarea"
import { ChangeEvent, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ApiCreateItem, ApiItem, ApiUpdateItem, ApiUploadFile, BlogSummarize } from "@/api/user";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { UploadButton } from "@/component/input/button";
import Image from "next/image";
const BlogDetail = () => {
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");
    const [_id, set_id] = useState<number>(0)
    const [_name, set_name] = useState<string>("")
    const [_slug, set_slug] = useState<string>("")
    const [_content, set_content] = useState<string>("")
    const [_newcontent, set_newcontent] = useState<string>("")
    const [_imageName, set_imageName] = useState<string>("")
    const [_loadBlog, set_loadBlog] = useState<boolean>(true);

    useEffect(() => {
        const getBlogDetail = async (slug: string | null) => {
            if (!slug) {
                set_name("");
                set_slug("");
                set_content("write your content here...");
                set_loadBlog(true);
                set_imageName("")
                return;
            }
            const res = await ApiItem({ slug: slug, archive: "blog" });
            console.log(res);

            if (res.success) {
                set_name((res.data as BlogSummarize).name);
                set_slug((res.data as BlogSummarize).slug);
                set_content((res.data as BlogSummarize).content);
                set_imageName((res.data as BlogSummarize).cover || "");
                // set_imageName(res.data as BlogSummarize).cover
                set_id((res.data as BlogSummarize).id);
            } else {
                alert("Failed to fetch blog details");
                set_loadBlog(false);
            }
        }
        getBlogDetail(slug);
    }, [slug]);

    async function UpdateBlog(id: number): Promise<void> {
        const res = await ApiUpdateItem({ position: 'user', archive: 'blog', id }, {
            name: _name,
            slug: _slug,
            content: _newcontent,
            cover: _imageName
        });
        if (res.success) {
            alert("Blog updated successfully");
        } else {
            alert("Failed to update blog");
        }
    }
    async function CreateBlog(): Promise<void> {
        const res = await ApiCreateItem({ position: 'user', archive: 'blog' }, {
            name: _name,
            slug: _slug,
            content: _newcontent,
            cover: _imageName
        });
        if (res.success) {
            alert("Blog created successfully");
        } else {
            alert("Failed to create blog");
        }
    }
    const getFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) { return }
        const file: File = files[0]
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            const result = await ApiUploadFile({ position: "user", archive: "pic", file: file },)
            console.log(result)
            if (result.success) {
                set_imageName(result.data.name)
            }
        }
    }
    return (
        _loadBlog ?
            < div className="" key={slug}>
                <h1 className="text-2xl font-bold mb-4">{_slug ? "Update Post" : "Create Post"}</h1>
                <div className="flex flex-col gap-4">
                    <div className="w-full aspect-video relative overflow-hidden">
                        <UploadButton name={<AddAPhotoIcon className="w-12! h-12! opacity-50 hover:opacity-100 cursor-pointer absolute top-0 left-0 z-1" />} onClick={(e) => getFile(e)} />
                        {process.env.ftp_url && _imageName ? <Image src={process.env.ftp_url + _imageName} fill className="object-cover" alt={_imageName.toString()} /> : null}
                    </div>
                    <div className="flex w-full px-2">
                        /<input type="text" value={_slug} placeholder="Enter slug" onChange={(e) => set_slug(e.target.value)} className="w-max outline-none px-2" />
                    </div>
                    <div className="flex">
                        <input type="text" value={_name} placeholder="Enter title" onChange={(e) => set_name(e.target.value)} className="w-full h-12 outline-none px-2 font-bold text-lg" />
                    </div>

                    <div className="blog-post">
                        <Textarea getInnerHTML={(html) => set_newcontent(html)} innerHTML={_content} />
                    </div>
                    {slug ?
                        <button className="w-32 h-10 bg-three text-white rounded-md uppercase font-bold"
                            onClick={() => UpdateBlog(_id)}>Update</button> :
                        <button className="w-32 h-10 bg-three text-white rounded-md uppercase font-bold"
                            onClick={() => CreateBlog()}>Create</button>}
                </div>


            </div > : <div>404!</div>)
}

export default BlogDetail