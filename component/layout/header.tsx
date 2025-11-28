'use client'
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
import { useRouter } from 'next/navigation';

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check login status from Redux
        const checkLoginStatus = () => {
            const userState = store.getState().user;
            setIsLoggedIn(userState.isLoggedIn);
        };

        checkLoginStatus();

        // Subscribe to Redux store changes
        const unsubscribe = store.subscribe(() => {
            checkLoginStatus();
        });

        return () => unsubscribe();
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic here
        console.log('Searching for:', searchQuery);
        setShowSearch(false);
    };

    const toPage = useRouter();
    return (
        <div className="h-12 fixed top-0 w-full bg-one lg:bg-transparent z-1">
            <div className="max-w-(--xxl) m-auto h-full flex justify-between items-center px-2">
                <div className="flex gap-2 items-center">
                    <MenuIcon className='h-8! w-8! rounded-[50%] m-auto sm:hidden! cursor-pointer hover:opacity-70 transition-opacity' onClick={() => { store.dispatch(setMenu(true)) }} />
                    <div className="h-full flex flex-col justify-center font-bold text-3xl uppercase pl-2" onClick={() => toPage.push("/")}>
                        {process.env.name}
                    </div>
                </div>
                <div className="flex gap-2 items-center relative">
                    {showSearch ? (
                        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                autoFocus
                                className="px-3 py-1 rounded-lg border border-five/20 bg-white text-five placeholder-five/40 focus:outline-none focus:border-two focus:ring-2 focus:ring-two/20 transition-colors"
                                onBlur={() => setShowSearch(false)}
                            />
                            <SearchIcon
                                className='h-8! w-8! rounded-[50%] cursor-pointer hover:opacity-70 transition-opacity'
                                onClick={handleSearchSubmit}
                            />
                        </form>
                    ) : (
                        <SearchIcon
                            className='h-8! w-8! rounded-[50%] cursor-pointer hover:opacity-70 transition-opacity'
                            onClick={() => setShowSearch(true)}
                        />
                    )}
                    {isLoggedIn ? (
                        <Link href="/add" className='h-8! w-8! m-auto'>
                            <AddIcon className='h-8! w-8! rounded-[50%] m-auto cursor-pointer hover:opacity-70 transition-opacity' />
                        </Link>
                    ) : (
                        <Link href="/login" className='h-8! w-8! m-auto'>
                            <LoginIcon className='h-8! w-8! rounded-[50%] m-auto cursor-pointer hover:opacity-70 transition-opacity' />
                        </Link>
                    )}
                    <Link href="/profile" className='h-8! w-8! m-auto'>
                        <PersonIcon className='h-8! w-8! rounded-[50%] m-auto cursor-pointer hover:opacity-70 transition-opacity' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header

