'use client';
import BlogDetail from '@/component/layout/detail/BlogDetail';
import ProfileDetail from '@/component/layout/detail/ProfileDetail';
import { UserState } from '@/redux/reducer/UserReduce';
import store from '@/redux/store';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
    const params = useParams<{ archive: string }>();
    const archive = params.archive;
    const [_currentUser, set_currentUser] = useState<UserState>(store.getState().user)
    const updateUser = () => {
        store.subscribe(() => { set_currentUser(store.getState().user) })
    }
    useEffect(() => {
        updateUser()
    }, [])
    if (!_currentUser.isLoggedIn) {
        return (
            <div>you have to login</div>
        )
    }
    switch (archive) {
        case "profile":

            return (
                <ProfileDetail />
            )
        case "add":
            return <BlogDetail />
        default:
            return <div>Invalid archive type</div>
    }
}

export default Page