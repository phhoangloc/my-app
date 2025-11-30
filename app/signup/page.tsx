'use client'
import PersonIcon from '@mui/icons-material/Person';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { ApiLogin, ApiSignup } from '@/api/client';
const Page = () => {

    const [_isView, set_isView] = useState<boolean>(false)
    const [_username, set_username] = useState<string>("")
    const [_password, set_password] = useState<string>("")
    const [_email, set_email] = useState<string>("")

    const Login = async () => {
        const res = await ApiSignup({ username: _username, password: _password, email: _email })
        console.log(res)
    }
    return (
        <div className='max-w-(--sm) m-auto p-4'>
            <div className="">
                <div className="h-12"></div>
                <div className="h-24 aspect-square m-auto overflow-auto rounded-[50%] bg-five text-one p-4">
                    <PersonIcon className='mx-auto w-full! h-full! ' />
                </div>
                <div className="h-12"></div>
                <div className="text-center uppercase text-2xl font-bold">sign up</div>
                <div className="h-4"></div>
                <div className="text-center text-lg"></div>
                <div className="h-4"></div>
                <div className="">username</div>
                <div className="h-1"></div>
                <input onChange={(e) => set_username(e.currentTarget.value)} className="border border-three bg-white rounded-md w-full h-10 outline-three px-2" ></input>
                <div className="h-4"></div>
                <div className="">password</div>
                <div className="h-1"></div>
                <div className="relative">
                    <input onChange={(e) => set_password(e.currentTarget.value)} type={_isView ? "text" : "password"} className="border border-three bg-white rounded-md w-full h-10 outline-three px-2"></input>
                    {!_isView ?
                        <VisibilityOffIcon className="absolute right-2 top-2" onClick={() => { set_isView(true) }} /> :
                        <RemoveRedEyeIcon className="absolute right-2 top-2" onClick={() => { set_isView(false) }} />}
                </div>
                <div className="h-4"></div>
                <div className="">email</div>
                <div className="h-1"></div>
                <input onChange={(e) => set_email(e.currentTarget.value)} className="border border-three bg-white rounded-md w-full h-10 outline-three px-2" ></input>
            </div>
            <div className="h-12"></div>
            <button className='block! w-40 h-12 m-auto bg-three text-white rounded-md cursor-pointer uppercase' onClick={() => Login()}>Sign up</button>
        </div>
    )
}

export default Page