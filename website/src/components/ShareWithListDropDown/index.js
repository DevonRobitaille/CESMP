/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline';

export function ShareWithListDropDown({ editors, index }) {
    return (
        <Menu as="div" className={`relative inline-block text-left bg-white z-${index}`}>
            <div>
                <Menu.Button className='flex items-center'>
                    <DotsVerticalIcon className='icon' />
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
                        {
                            editors.map((editor, index) => {
                                return (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <p className='ml-2 flex flex-1 text-gray-700 px-2 py-2 text-sm'>
                                                {editor}
                                            </p>
                                        )}
                                    </Menu.Item>
                                )
                            })
                        }

                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default ShareWithListDropDown