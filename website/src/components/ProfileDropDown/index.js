/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { UserIcon, LogoutIcon, FolderOpenIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

export function ProfileDropDown() {
    const navigate = useNavigate();

    const { auth } = useAuth()

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className='flex items-center'>
                    <UserIcon className='icon' />
                    <p className='hidden lg:inline'>Profile</p>
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
                                <div className='NavButtons hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg hover:font-semibold py-0 px-2 m-0'>
                                    <FolderOpenIcon className='h-9 w-7' />
                                    <p
                                        onClick={() => navigate('/folder')}
                                        className='flex flex-1 text-gray-700 px-2 py-2 text-sm'
                                    >
                                        Folder
                                    </p>
                                </div>

                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div className='NavButtons hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg hover:font-semibold py-0 px-2 m-0'>
                                    <UserIcon className='h-9 w-7' />
                                    <p
                                        onClick={() => navigate('/profile')}
                                        className='flex flex-1 text-gray-700 px-2 py-2 text-sm'
                                    >
                                        Account
                                    </p>
                                </div>

                            )}
                        </Menu.Item>
                        <hr />
                        <Menu.Item>
                            {({ active }) => (
                                <div className='NavButtons hover:cursor-pointer hover:bg-gray-200 hover:border hover:rounded-lg hover:font-semibold py-0 px-2 m-0'>
                                    <LogoutIcon className='h-9 w-7' />
                                    <p
                                        onClick={() => navigate('/logout')}
                                        className='flex flex-1 text-gray-700 px-2 py-2 text-sm'
                                    >
                                        Sign Out
                                    </p>
                                </div>

                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default ProfileDropDown