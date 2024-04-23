import { Link, useNavigate } from "react-router-dom";
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../features/authSlice'


import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"


import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"


export default function Header() {

    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    const user = useSelector(state => state.auth.user)

    const isAutheticated = useSelector(state => state.auth.isAutheticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('sessionData')
        navigate('/login')
    }

    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen)
    }

    const NAV_LINKS = [
        { title: 'Crear Usuario', path: '/create-user' },
    ]
    const NAV_LINKS_PRIVATE = [
        { title: 'Inicio', path: '/' },
        { title: 'Usuarios', path: '/user' },
        { title: 'Create House', path: '/create-house' },
        { title: "Casas", path: '/house' },
        { title: 'Chat', path: '/chat' },
    ]

    return (
        <>
            <nav className="fixed z-50 w-screen pz-4">
                <div className="container flex items-center justify-between rounded-sm mx-auto bg-black py-3">
                    <div className="flex flex-shrink-0 items-center justify-between">
                        <Link to='/' className="flex items-center ">
                            <img
                                className="mr-2 h-12 w-16"
                                src="/logo/color1.png"
                                alt="Logo"
                            />
                            <span className="text-green-900 text-lg tracking-tight hover:text-neutral-500">UrbanAbode</span>
                        </Link>
                    </div>
                    <div className="hidden lg:flex">
                        <ul className="flex items-center gap-4">
                            {
                                !isAutheticated ? null : (
                                    NAV_LINKS_PRIVATE.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                className="text-sm text-white hover:text-neutral-500"
                                                to={item.path}
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))
                                )
                            }
                            {
                                NAV_LINKS.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            className="text-sm text-white hover:text-neutral-500"
                                            to={item.path}
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="hidden text-sm text-white lg:flex">
                        {
                            !isAutheticated ? (
                                <Link to="/login">
                                    <Button variant="outline" className="mr-2 bg-black">Login</Button>
                                </Link>
                            ) : (
                                <div>
                                    <Menubar className="bg-transparent w-full border-none">
                                        <MenubarMenu>
                                            <MenubarTrigger className="text-slate-400 w-full" >
                                                <Avatar>
                                                    <AvatarImage src={`http://localhost:3000/${user.avatar}`} alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            </MenubarTrigger>
                                            <MenubarContent>
                                                <MenubarItem>
                                                    <MenubarItem disabled className="px-4 py-2 text-lg font-bold w-full text-teal-600">{
                                                        `${user.name} ${user.lastname}`
                                                    }</MenubarItem>
                                                </MenubarItem>
                                                <MenubarItem>
                                                    <Link to={`/user/${user._id}`}
                                                        className="px-4 py-2 text-sm font-medium w-full">
                                                        Profile
                                                    </Link>
                                                </MenubarItem>
                                                <MenubarSeparator />
                                                <MenubarItem>
                                                    <Link to={`/change-password`}
                                                        className="px-4 py-2 text-sm font-medium w-full">
                                                        Change password
                                                    </Link>
                                                </MenubarItem>
                                                <MenubarSeparator />
                                                <MenubarItem >
                                                    <span onClick={handleLogout} className="px-4 py-2 text-sm font-medium w-full cursor-pointer">

                                                        Logout
                                                    </span>
                                                    {/* <Button
                                                    onClick={handleLogout}
                                                    variant="solid" className="bg-white text-black"></Button> */}
                                                </MenubarItem>
                                            </MenubarContent>
                                        </MenubarMenu>
                                    </Menubar>
                                </div>
                            )
                        }
                    </div>
                    <div className="flex flex-row justify-end text-white md:flex lg:hidden">
                        <button onClick={toggleNavbar} className="">
                            {mobileDrawerOpen ? <X /> : <Menu />}
                        </button>
                        {
                            !isAutheticated ? null : (
                                <Menubar className="bg-transparent w-full border-none">
                                    <MenubarMenu>
                                        <MenubarTrigger className="text-slate-400 w-full" >
                                            <Avatar>
                                                <AvatarImage src={`http://localhost:3000/${user.avatar}`} alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </MenubarTrigger>
                                        <MenubarContent>
                                            <MenubarItem>
                                                <MenubarItem disabled className="px-4 py-2 text-sm font-medium w-full">{
                                                    `${user.name} ${user.lastname}`
                                                }</MenubarItem>
                                            </MenubarItem>
                                            <MenubarItem>
                                                <Link to={`/user/${user._id}`}
                                                    className="px-4 py-2 text-sm font-medium w-full">
                                                    Profile
                                                </Link>
                                            </MenubarItem>
                                            <MenubarSeparator />
                                            <MenubarItem >
                                                <span onClick={handleLogout} className="px-4 py-2 text-sm font-medium w-full cursor-pointer">

                                                    Logout
                                                </span>
                                                {/* <Button
                                                    onClick={handleLogout}
                                                    variant="solid" className="bg-white text-black"></Button> */}
                                            </MenubarItem>
                                        </MenubarContent>
                                    </MenubarMenu>
                                </Menubar>
                            )
                        }


                    </div>
                </div>
                {
                    mobileDrawerOpen && (
                        <div className="rounded-md bg-black py-3 lg:hidden">
                            <ul className="flex flex-col items-center">
                                {
                                    !isAutheticated ? null : (
                                        NAV_LINKS_PRIVATE.map((item, index) => (
                                            <li key={index} className="py-6">
                                                <Link
                                                    className="text-sm text-white hover:text-neutral-500"
                                                    to={item.path}
                                                    onClick={() => setMobileDrawerOpen(false)}

                                                >
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))
                                    )
                                }

                                {
                                    NAV_LINKS.map((item, index) => (
                                        <li key={index} className="py-6">
                                            <Link
                                                className="text-sm text-white hover:text-neutral-500"
                                                to={item.path}
                                                onClick={() => setMobileDrawerOpen(false)}

                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="flex items-center justify-center pb-8 text-white">
                                {
                                    !isAutheticated ? (
                                        <Link to="/login">
                                            <Button variant="outline" className="mr-2 bg-black">Login</Button>
                                        </Link>
                                    ) : null /* (
                                        <div>

                                            <Button
                                                onClick={handleLogout}
                                                variant="solid" className="bg-white text-black">Logout</Button>
                                        </div>
                                    ) */
                                }
                            </div>
                        </div>
                    )
                }
            </nav>
        </>
    );
}