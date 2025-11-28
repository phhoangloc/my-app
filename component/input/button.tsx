import { ChangeEvent, useRef } from "react"

type Props = {
    onClick: (e: ChangeEvent<HTMLInputElement>) => void,
    name: React.ReactNode,
    disable?: boolean,
    sx?: string,
}
export const UploadButton = ({ name, onClick, sx }: Props) => {
    const IconRef = useRef<HTMLInputElement | null>(null)
    return (
        <div className={`${sx} `}>
            <input ref={IconRef} type="file" style={{ display: "none" }} onChange={(e) => onClick && onClick(e)} multiple={true} />
            <div className=" h-max w-max p-3 flex flex-col justify-center text-center bg-lv-11 rounded cursor-pointer" onClick={() => IconRef.current && IconRef.current.click()}>{name}</div>
        </div>
    )
}