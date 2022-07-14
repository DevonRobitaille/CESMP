/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/solid'
import {
    BeakerIcon,
    LibraryIcon,
    ClipboardCheckIcon,
    AtSymbolIcon,
    QuestionMarkCircleIcon,
    LoginIcon,
    LogoutIcon,
    UserIcon,
    FolderOpenIcon,
    HomeIcon
} from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

export function NavBarDropDown() {
    const navigate = useNavigate();

    const { auth } = useAuth()

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className='items-center hover:text-gray-600'>
                    <MenuIcon className='icon w-9' />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <div className='NavButtons flex sm:hidden hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg py-0 px-2 m-0'>
                                    <HomeIcon className='h-9 w-7' />
                                    <p
                                        onClick={() => navigate('/')}
                                        className='flex flex-1 text-gray-700 px-2 py-2 text-sm font-normal'
                                    >
                                        Home
                                    </p>
                                </div>

                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div className='NavButtons flex hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg py-0 px-2 m-0'>
                                    <QuestionMarkCircleIcon className='h-9 w-7' />
                                    <p
                                        onClick={() => navigate('/about')}
                                        className='flex flex-1 text-gray-700 px-2 py-2 text-sm font-normal'
                                    >
                                        About Us
                                    </p>
                                </div>

                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div className='NavButtons flex hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg py-0 px-2 m-0'>
                                    <ClipboardCheckIcon className='h-9 w-7' />
                                    <p
                                        onClick={() => navigate('/plan')}
                                        className='flex flex-1 text-gray-700 px-2 py-2 text-sm font-normal'
                                    >
                                        Plan
                                    </p>
                                </div>

                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div className='NavButtons flex hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg py-0 px-2 m-0'>
                                    <BeakerIcon className='h-9 w-7' />
                                    <p
                                        onClick={() => navigate('/research')}
                                        className='flex flex-1 text-gray-700 px-2 py-2 text-sm font-normal'
                                    >
                                        Research
                                    </p>
                                </div>

                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div className='NavButtons flex hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg py-0 px-2 m-0'>
                                    <LibraryIcon className='h-9 w-7' />
                                    <p
                                        onClick={() => navigate('/library')}
                                        className='flex flex-1 text-gray-700 px-2 py-2 text-sm font-normal'
                                    >
                                        Library
                                    </p>
                                </div>

                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div className='NavButtons flex hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg py-0 px-2 m-0'>
                                    <AtSymbolIcon className='h-9 w-7' />
                                    <p
                                        onClick={() => navigate('/contact')}
                                        className='flex flex-1 text-gray-700 px-2 py-2 text-sm font-normal'
                                    >
                                        Contact
                                    </p>
                                </div>

                            )}
                        </Menu.Item>
                        <hr />
                        {!auth?.user &&
                            <Menu.Item>
                                {({ active }) => (
                                    <div className='NavButtons flex hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg py-0 px-2 m-0'>
                                        <LoginIcon className='h-9 w-7' />
                                        <p
                                            onClick={() => navigate('/login')}
                                            className='flex flex-1 text-gray-700 px-2 py-2 text-sm font-normal'
                                        >
                                            Sign In
                                        </p>
                                    </div>

                                )}
                            </Menu.Item>
                        }
                        {auth?.user &&
                            <Menu.Item>
                                {({ active }) => (
                                    <div className='NavButtons flex hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg py-0 px-2 m-0'>
                                        <FolderOpenIcon className='h-9 w-7' />
                                        <p
                                            onClick={() => navigate('/folder')}
                                            className='flex flex-1 text-gray-700 px-2 py-2 text-sm font-normal'
                                        >
                                            Folder
                                        </p>
                                    </div>

                                )}
                            </Menu.Item>
                        }
                        {auth?.user &&
                            <Menu.Item>
                                {({ active }) => (
                                    <div className='NavButtons flex hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg py-0 px-2 m-0'>
                                        <UserIcon className='h-9 w-7' />
                                        <p
                                            onClick={() => navigate('/profile')}
                                            className='flex flex-1 text-gray-700 px-2 py-2 text-sm font-normal'
                                        >
                                            Profile
                                        </p>
                                    </div>

                                )}
                            </Menu.Item>
                        }
                        {auth?.user &&
                            <Menu.Item>
                                {({ active }) => (
                                    <div className='NavButtons flex hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg py-0 px-2 m-0'>
                                        <LogoutIcon className='h-9 w-7' />
                                        <p
                                            onClick={() => navigate('/logout')}
                                            className='flex flex-1 text-gray-700 px-2 py-2 text-sm font-normal'
                                        >
                                            Sign Out
                                        </p>
                                    </div>

                                )}
                            </Menu.Item>
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default NavBarDropDown