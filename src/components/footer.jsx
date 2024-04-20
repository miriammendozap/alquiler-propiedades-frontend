import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Footer() {

    const isAutheticated = useSelector(state => state.auth.isAutheticated)
    const NAV_LINKS = [
        { title: 'Crear Usuario', path: '/create-user' },
    ]
    const NAV_LINKS_PRIVATE = [
        { title: 'Inicio', path: '/' },
        { title: 'Usuarios', path: '/user' },
    ]


    return (
        <div>
            <footer className="bg-black pb-5">
                <div className="max-w-screen-xl px-4 pt-8 mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row sm:items-center sm:justify-between">
                        <div className="flex justify-center text-gray-300 sm:justify-start">
                            <ul className="flex flex-col md:flex-row items-center gap-4">
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
                        <p className="mt-4 text-sm text-center text-gray-400 lg:text-right lg:mt-0">
                            T&C &nbsp; Career &nbsp; Privacy & Policy &nbsp; Developer  for <link></link>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}