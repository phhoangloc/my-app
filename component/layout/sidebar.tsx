'use client'
import { setMenu } from '@/redux/reducer/MenuReduce';
import store from '@/redux/store';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
export const Sidebar = () => {
    const tags = [
        "AI",
        "MachineLearning",
        "Blockchain",
        "CloudComputing",
        "CyberSecurity",
        "IoT",
        "WebDevelopment",
        "BigData",
        "FutureOfTech",
        "Programming"
    ]
    const [_currentMenu, set_currentMenu] = useState<boolean>(store.getState().menu)
    const update = () => {
        store.subscribe(() => { set_currentMenu(store.getState().menu) })
    }
    useEffect(() => {
        update()
    }, [])
    return (
        <div className={`fixed z-2 top-0 backdrop-brightness-50 backdrop-blur-xs transition-all duration-200 ${_currentMenu ? "w-full " : "w-0 delay-500"} h-screen sm:sticky sm:w-60 sm:z-0 sm:h-(--vh-12) sm:top-12 sm:backdrop-brightness-100`}>
            <div className={`bg-one h-full overflow-auto relative transition-all duration-300 delay-200  ${_currentMenu ? "w-5/6" : "w-0"} sm:w-full`}>
                <CloseIcon className='h-8! w-8! rounded-[50%] m-auto absolute right-2 sm:hidden!' onClick={() => { store.dispatch(setMenu(false)) }} />
                {/* <div className='font-bold text-lg pl-2'>hash tag</div>
                {tags.map((tags, index) =>
                    <div key={index} className="h-10 flex flex-col justify-center pl-2">#{tags}</div>
                )} */}
            </div>
        </div>
    )
}

