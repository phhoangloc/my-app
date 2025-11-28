import React from "react"
import Header from "./header"
import { Sidebar } from "./sidebar"
type Props = {
    children: React.ReactNode
}
const Layout = ({ children }: Props) => {
    return (
        <div>
            <Header />
            {/* <div className="h-4"></div> */}
            <div className="pt-12 flex max-w-(--xxl) m-auto">
                <Sidebar />
                <div className="w-full md:w-(--vw-60) max-w-(--md) px-4">
                    {children}
                </div>
            </div>

        </div>
    )
}

export default Layout

