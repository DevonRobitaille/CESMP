import React from 'react'

import { ArrowRightIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'

export function Landing() {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col h-screen justify-between'>
            {/* About Us */}
            <div className='flex flex-col bg-blue-900 items-center text-gray-300 pt-8 pb-8'>
                <div className='flex flex-col'>
                    <h2 className='text-2xl font-semibold max-w-xl pb-8'>The CESMP Cooperative Emergency Supply Management and Planning is an emergency management hub</h2>
                    <div className='flex pb-10'>
                        <vr className='bg-blue-300 w-1 font-thin mr-5' />
                        <p className='max-w-xs font-semibold text-lg'>We do research, data distribution, and planning in three core areas: law, policy, and strategy</p>
                    </div>
                    <div onClick={() => navigate('/about')} className='flex items-center'>
                        <ArrowRightIcon className='h-5 w-5 text-blue-300 mr-2' />
                        <p className='text-blue-300 font-semibold text-xl hover:underline hover:cursor-pointer'>Find out more</p>
                    </div>
                </div>

            </div>
            {/* News / Updates */}
            <div className='flex flex-col mx-auto text-gray-300 pt-8 pb-4'>
                <div className='flex flex-col pb-5'>
                    <div onClick={() => navigate('/research')} className='flex items-center'>
                        <p className='text-blue-300 font-semibold text-xl hover:underline hover:cursor-pointer'>All news</p>
                        <ArrowRightIcon className='h-5 w-5 text-blue-300 ml-2' />
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row'>
                    {/* image */}

                    {/* details */}
                    <div className='flex flex-col mr-20 hover:cursor-pointer'>
                        <p className='text-gray-400 pb-2'>23.05.2022</p>
                        <h2 className='pb-4 text-2xl text-blue-900 hover:underline'>Article Heading</h2>
                        <div className='flex pb-10'>
                            <vr className='bg-blue-300 w-1 font-thin mr-5' />
                            <p className='max-w-xs text-blue-900 text-lg'>Article Body. Lorem ipsum, quia dolor sit amet consectetur adipisci...</p>
                        </div>
                    </div>

                    <div className='flex flex-col mr-20 hover:cursor-pointer'>
                        <p className='text-gray-400 pb-2'>23.05.2022</p>
                        <h2 className='pb-4 text-2xl text-blue-900 hover:underline'>Article Heading</h2>
                        <div className='flex pb-10'>
                            <vr className='bg-blue-300 w-1 font-thin mr-5' />
                            <p className='max-w-xs text-blue-900 text-lg'>Article Body. Lorem ipsum, quia dolor sit amet consectetur adipisci...</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Publications */}
            <div className='flex flex-col items-center w-full'>
                <hr className='w-3/4 h-0.5 bg-blue-900' />
            </div>
            <div className='flex flex-col mx-auto text-gray-300 pt-12 pb-8 mb-auto'>
                <div className='flex flex-col pb-5'>
                    <div onClick={() => navigate('/library')} className='flex items-center'>
                        <p className='text-blue-300 font-semibold text-xl hover:underline hover:cursor-pointer'>Recent Publications</p>
                        <ArrowRightIcon className='h-5 w-5 text-blue-300 ml-2' />
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row'>
                    {/* image */}

                    {/* details */}
                    <div className='flex flex-col mr-20 hover:cursor-pointer'>
                        <p className='text-gray-400 pb-2'>23.05.2022</p>
                        <h2 className='pb-4 text-2xl text-blue-900 hover:underline'>Article Heading</h2>
                        <div className='flex pb-10'>
                            <vr className='bg-blue-300 w-1 font-thin mr-5' />
                            <p className='max-w-xs text-blue-900 text-lg'>Article Body. Lorem ipsum, quia dolor sit amet consectetur adipisci...</p>
                        </div>
                    </div>

                    <div className='flex flex-col mr-20 hover:cursor-pointer'>
                        <p className='text-gray-400 pb-2'>23.05.2022</p>
                        <h2 className='pb-4 text-2xl text-blue-900 hover:underline'>Article Heading</h2>
                        <div className='flex pb-10'>
                            <vr className='bg-blue-300 w-1 font-thin mr-5' />
                            <p className='max-w-xs text-blue-900 text-lg'>Article Body. Lorem ipsum, quia dolor sit amet consectetur adipisci...</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Footer */}
            <div className='flex flex-row bg-blue-900 items-center text-gray-300 h-20'>
                {/* contact info */}
                <div>
                </div>

                {/* website summary */}
                <div></div>
            </div>
        </div >
    )
}

export default Landing