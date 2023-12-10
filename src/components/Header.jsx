// Header.jsx
import React, {useState} from 'react';
import {Search, LogIn, LogOut} from 'react-feather';
import Login from '../pages/Login';
import {Link, useNavigate} from "react-router-dom";
import Logout from "../components/Logout.jsx";

const Header = ({onSearch, searchTerm, setSearchTerm, toggleLoginStatus}) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isLoggedIn = localStorage.getItem('token') !== null;
    const navigate = useNavigate();

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        // Perform logout logic here, e.g., remove token from localStorage
        localStorage.removeItem('token');
        // Redirect to login page
        navigate('/');
    };

    return (
        <div className="relative">
            <header className="text-blue-700 p-4 fixed top-0 z-10 bg-white w-full border-b-2">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="/" className="flex gap-2">
                        {/* <img src="https://flowbite.com/docs/images/logo.svg" className=""
                             alt="FlowBite Logo"/> */}
                        <span
                            className="self-center text-xl font-bold font-noto sm:text-2xl whitespace-nowrap dark:text-white">JobHunter</span>
                    </a>
                    <button
                        onClick={handleMobileMenuToggle}
                        className="md:hidden text-white focus:outline-none absolute right-4"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke=""
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden absolute top-16 right-4 bg-white p-4 rounded-md border border-gray-300">
                            {/* Search Input in Mobile Menu */}
                            <div
                                className="mb-2 flex flex-col items-center space-x-2"> {/* Tambahkan class space-x-2 di sini juga */}
                                {/* <input
                                    type="text"
                                    placeholder="Search jobs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="px-2 py-1 rounded-md text-red-950"
                                />
                                <button
                                    onClick={onSearch}
                                    className="bg-white text-blue-700 px-2 py-1 my-1 rounded-md ml-2"
                                >
                                    <Search size={18}/>
                                </button> */}
                                {/* <div className="px-4 py-3" role="none">
                                    <p className="text-sm text-gray-900 dark:text-white" role="none">

                                    </p>
                                </div> */}
                                <ul className="py-1" role="none">
                                    <li>
                                        <a href="/edituser"
                                           className="block px-4 py-2 text-center text-sm text-blue-700 hover:bg-blue-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                           role="menuitem">Profile</a>
                                    </li>
                                    <li>
                                        <a href="/edituser"
                                           className="block px-4 py-2 text-center text-sm text-blue-700 hover:bg-blue-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                           role="menuitem">History</a>
                                    </li>
                                    <li onClick={handleLogout}>
                                        <span href="#"
                                              className="block px-4 py-2 text-center text-sm text-blue-700 hover:bg-blue-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                              role="menuitem">Log out</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Login/Logout Button in Mobile Menu */}
                            {/*<Link*/}
                            {/*    onClick={toggleLoginStatus}*/}
                            {/*    className="px-4 py-1 bg-green-500 rounded-md flex items-center"*/}
                            {/*>*/}
                            {/*    {isLoggedIn ? `<Logout/>` : 'Login'} <LogIn size={18} className="ml-2" />*/}
                            {/*</Link>*/}
                        </div>
                    )}

                    {/* Login/Logout Button in Desktop (shown when mobile menu is closed) */}
                    <div>
                        {isLoggedIn ? (
                            <>
                                <button type="button"
                                        className="sm:block flex text-sm  rounded-full focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-200"
                                        aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span className="sr-only">Open user menu</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12 21C13.7608 21.0019 15.483 20.4843 16.951 19.512C16.835 18.5451 16.3691 17.6541 15.6412 17.0071C14.9133 16.3601 13.9739 16.0019 13 16H11C10.0261 16.0019 9.08665 16.3601 8.35879 17.0071C7.63092 17.6541 7.16502 18.5451 7.049 19.512C8.51698 20.4843 10.2392 21.0019 12 21ZM15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z" stroke="blue" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <div
                                    className="z-50 hidden text-start my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                                    id="dropdown-user">
                                    <ul className="py-1 px-3 text-start" role="none">
                                        <li>
                                            <Link to="/edituser"
                                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                               role="menuitem">Profile</Link>
                                        </li>
                                        <li onClick={handleLogout}>
                                        <span href="#"
                                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                              role="menuitem">Log out</span>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <Link to="/login"
                                  className="md:flex items-center px-4 py-1 bg-blue-700 text-white hover:bg-blue-600 rounded-md absolute right-12 top-4">
                                Login
                                {/* <LogIn size={12} className="ml-3"/> */}
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        </div>
    )
        ;
};

export default Header;