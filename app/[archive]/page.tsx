'use client';
import BlogDetail from '@/component/layout/detail/BlogDetail';
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

    switch (archive) {
        case "profile":
            if (!_currentUser.isLoggedIn) {
                return (
                    <div>Please log in to view your profile.</div>
                )
            }
            return (
                <div>Welcome, {_currentUser.user?.username}!</div>
            )
        case "add":
            return <BlogDetail />
        default:
            return <div>Invalid archive type</div>
    }
}

export default Page