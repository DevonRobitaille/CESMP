import React, { useState } from 'react'

import { PhoneIcon, MailIcon, LocationMarkerIcon } from '@heroicons/react/outline'

export function Contact() {
    const [page, setPage] = useState(0);

    React.useEffect(() => {
        function handleResize() {
            setPage(0)
        }

        window.addEventListener('resize', handleResize)
    }, [])

    return (
        <div className='flex lg:flex-row flex-col h-full w-full'>
            <div className='sticky z-1 bg-gray-200 pl-5 pr-5 pt-10 flex flex-col lg:max-w-[300px]'>
                <div>
                    <h2 className='text-xl font-semibold pb-2'>Get in touch</h2>
                    <p className='text-sm pb-4'>We would love to hear from you. Our friendly team is always here to chat.</p>
                </div>
                <div className='flex lg:flex-col mx-auto lg:m-0'>
                    <div className='flex flex-col pb-5 pr-10 lg:pr-0'>
                        <div className='flex items-center md:disa'>
                            <MailIcon onClick={() => (window.innerWidth <= 768) ? setPage(0) : ""} className='icon mr-2 md:hover:bg-transparent md:cursor-default' />
                            <h2 onClick={() => (window.innerWidth <= 768) ? setPage(0) : ""} className='md:cursor-default cursor-pointer'>Chat to us</h2>
                        </div>
                        <div className='flex flex-col pl-8 lg:pl-11'>
                            <p className='hidden md:inline text-xs pb-3'>Our friendly teamis here to help.</p>
                            <p className='hidden md:inline text-xs font-semibold'>contact@cesmp.com</p>
                        </div>
                    </div>
                    <div className='flex flex-col pb-5 pr-10 lg:pr-0'>
                        <div className='flex items-center'>
                            <LocationMarkerIcon onClick={() => (window.innerWidth <= 768) ? setPage(1) : ""} className='icon mr-2 md:hover:bg-transparent md:cursor-default' />
                            <h2 onClick={() => (window.innerWidth <= 768) ? setPage(1) : ""} className='md:cursor-default cursor-pointer'>Office</h2>
                        </div>
                        <div className='flex flex-col pl-8 lg:pl-11'>
                            <p className='hidden md:inline text-xs pb-3'>Come say hello at our office HQ.</p>
                            <p className='hidden md:inline text-xs font-semibold'>
                                100 1st Street <br />
                                Ottawa ON
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col pb-5 pr-10 lg:pr-0'>
                        <div className='flex items-center'>
                            <PhoneIcon onClick={() => (window.innerWidth <= 768) ? setPage(2) : ""} className='icon mr-2 md:hover:bg-transparent md:cursor-default' />
                            <h2 onClick={() => (window.innerWidth <= 768) ? setPage(2) : ""} className='md:cursor-default cursor-pointer'>Phone</h2>
                        </div>
                        <div className='flex flex-col pl-8 lg:pl-11'>
                            <p className='hidden md:inline text-xs pb-3'>Mon-Fri from 8am to 5pm.</p>
                            <p className='hidden md:inline text-xs font-semibold'>+1 (500) 000-0000</p>
                        </div>
                    </div>
                </div>
            </div>

            <vr className='bg-gray-300 w-1 font-thin hidden lg:inline' />
            <div className='flex flex-col w-full'>
                <hr className='bg-gray-300 h-1 w-full flex lg:hidden' />
                <div className='flex flex-col items-center'>
                    {page === 0 && (
                        <div className='flex flex-col pt-10'>
                            <h2 className='text-2xl font-semibold pb-2 text-blue-600'>Contact Us</h2>
                            <p className='text-sm'>You can reach us anytime via <span className='font-semibold text-gray-900'>contact@cesmp.com</span></p>

                            <form className='pt-10 text-sm pb-10'>
                                <div className='flex flex-col'>
                                    <label className='pb-1'>Name</label>
                                    <input className='mb-3 outline-none border rounded-md p-1 pl-2 pr-2' type='text' placeholder='Your name' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='pb-1'>Email</label>
                                    <input className='mb-3 outline-none border rounded-md p-1 pl-2 pr-2' type='email' placeholder='you@company.com' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='pb-1'>Phone Number</label>
                                    <input className='mb-3 outline-none border rounded-md p-1 pl-2 pr-2' type='text' placeholder='+1 (555) 000-0000' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='pb-1'>How can we help?</label>
                                    <textarea
                                        className="form-control block w-full mb-3 outline-none border rounded-md p-1 pl-2 pr-2"
                                        id="FormControlTextArea"
                                        rows="5"
                                        placeholder="Tell us a little about it..."
                                    />
                                </div>
                                <button className='w-full pt-1 pb-1 bg-blue-300 font-semibold border rounded-md hover:bg-blue-200 focus:bg-blue-400'>Send</button>
                            </form>
                        </div>
                    )}
                    {page === 1 && (
                        <div className='flex flex-col pb-5 pr-10 lg:pr-0'>
                            <div className='flex flex-col pl-8 lg:pl-11 items-center text-center pt-20'>
                                <div className='flex items-center'>
                                    <LocationMarkerIcon className='icon mr-2 hover:bg-transparent cursor-default' />
                                    <h2 className='text-blue-600 font-semibold text-lg'>Office</h2>
                                </div>
                                <p className='text-md pb-3'>Come say hello at our office HQ.</p>
                                <p className='text-md font-semibold'>
                                    100 1st Street <br />
                                    Ottawa ON
                                </p>
                            </div>
                        </div>
                    )}
                    {page === 2 && (
                        <div className='flex flex-col pb-5 pr-10 lg:pr-0'>
                            <div className='flex flex-col pl-8 lg:pl-11 items-center text-center pt-20'>
                                <div className='flex items-center'>
                                    <PhoneIcon className='icon mr-2 hover:bg-transparent cursor-default' />
                                    <h2 className='text-blue-600 font-semibold text-lg'>Phone</h2>
                                </div>
                                <div className='flex flex-col pl-8 lg:pl-11'>
                                    <p className='text-md pb-3'>Mon-Fri from 8am to 5pm.</p>
                                    <p className='text-md font-semibold'>+1 (500) 000-0000</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Contact