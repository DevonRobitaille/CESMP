import React, { useState } from 'react'

import { XIcon } from '@heroicons/react/outline'
import { PublicationModal } from '../PublicationModal'

import useAuth from '../../hooks/useAuth';

const year = (new Date()).getFullYear();
const years = Array.from(new Array(20), (val, index) => index + year);

export function LibrarySearchBar({ getPublication, editors, filterOptions, updateFilterOptions, sideMenu, removeFilterOptions }) {
    const { auth } = useAuth()
    const [showModal, setShowModal] = useState(false)

    // console.log(filterOptions)

    return (
        <>
            {/*modal for creating publications */}
            {showModal && <PublicationModal getPublication={getPublication} editors={editors} setShowModal={setShowModal} />}

            <div className={sideMenu
                ? `flex flex-col md:w-[340px] lg:w-[390px] text-gray-600 lg:bg-white lg:text-gray-400 text-md pt-10 pb-10 pl-5 pr-5 overflow-auto`
                : `hidden md:inline flex-col md:w-[340px] lg:w-[390px] bg-gray-200 text-gray-600 lg:bg-white lg:text-gray-400 text-md pt-10 pb-10 pl-5 pr-5 overflow-auto `
            }>
                <div className='w-full flex justify-center mb-3 -mt-3'>
                    {auth?.roles?.name == 'Editor' &&
                        <button onClick={() => setShowModal(true)} className='font-semibold text-sm p-1 pl-2 pr-2 border rounded-2xl bg-yellow-500 text-gray-600 hover:bg-yellow-400'>Create Publication</button>
                    }
                </div>

                <div className='mb-5'>
                    <p className='font-semibold'>Medium:</p> {/* only select one */}
                    <div class='flex flex-col form-check'>
                        <div className='flex mt-1'>
                            <input checked={filterOptions.medium.Article} onChange={() => { updateFilterOptions('Article') }} class="form-check-input appearance-none h-4 w-4 border border-gray-400 rounded-sm bg-white checked:bg-blue-400 checked:border-blue-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label inline-block ml-3" htmlFor="flexCheckDefault">
                                Article
                            </label>
                        </div>
                        <div className='flex mt-1'>
                            <input checked={filterOptions.medium.Book} onChange={() => updateFilterOptions('Book')} class="form-check-input appearance-none h-4 w-4 border border-gray-400 rounded-sm bg-white checked:bg-blue-400 checked:border-blue-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label inline-block ml-3" htmlFor="flexCheckDefault">
                                Book
                            </label>
                        </div>
                        <div className='flex mt-1'>
                            <input checked={filterOptions.medium.Report} onChange={() => updateFilterOptions('Report')} class="form-check-input appearance-none h-4 w-4 border border-gray-400 rounded-sm bg-white checked:bg-blue-400 checked:border-blue-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label inline-block ml-3" htmlFor="flexCheckDefault">
                                Report
                            </label>
                        </div>
                        <div className='flex mt-1'>
                            <input checked={filterOptions.medium.Video} onChange={() => updateFilterOptions('Video')} class="form-check-input appearance-none h-4 w-4 border border-gray-400 rounded-sm bg-white checked:bg-blue-400 checked:border-blue-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label inline-block ml-3" htmlFor="flexCheckDefault">
                                Video
                            </label>
                        </div>
                    </div>
                </div>
                <div className='mb-5'>
                    <p className='font-semibold'>Focus Area:</p>
                    <div class='flex flex-col form-check'>
                        <div className='flex mt-1'>
                            <input checked={filterOptions.focusArea.Law} onChange={() => updateFilterOptions('Law')} class="form-check-input appearance-none h-4 w-4 border border-gray-400 rounded-sm bg-white checked:bg-blue-400 checked:border-blue-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label inline-block ml-3" htmlFor="flexCheckDefault">
                                Law
                            </label>
                        </div>
                        <div className='flex mt-1'>
                            <input checked={filterOptions.focusArea.Policy} onChange={() => updateFilterOptions('Policy')} class="form-check-input appearance-none h-4 w-4 border border-gray-400 rounded-sm bg-white checked:bg-blue-400 checked:border-blue-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label inline-block ml-3" htmlFor="flexCheckDefault">
                                Policy
                            </label>
                        </div>
                        <div className='flex mt-1'>
                            <input checked={filterOptions.focusArea.Strategy} onChange={() => updateFilterOptions('Strategy')} class="form-check-input appearance-none h-4 w-4 border border-gray-400 rounded-sm bg-white checked:bg-blue-400 checked:border-blue-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label inline-block ml-3" htmlFor="flexCheckDefault">
                                Strategy
                            </label>
                        </div>
                    </div>
                </div>
                <div className='mb-5'>
                    <p className='font-semibold'>Type:</p>
                    <select id='type' onChange={updateFilterOptions} value={'Choose Emergency'} className='mt-2 form-select appearance-none
                    block
                    px-3
                    w-[220px]
                    py-1.5
                    text-base
                    font-normal
                    bg-blue-50 bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" '>
                        <option value='Choose Emergency'>Choose Emergency</option>
                        <option value='Pandemic'>Pandemic</option>
                        <option value='Fire'>Fire</option>
                        <option value='Flooding'>Flooding</option>
                        <option value='Evacuation'>Evacuation</option>
                    </select>
                </div>
                <div className='mb-5'>
                    <p className='font-semibold'>Years:</p>
                    <select id='years' onChange={updateFilterOptions} value={'Choose Year'} className='mt-2 form-select appearance-none
                    block
                    px-3
                    w-[220px]
                    py-1.5
                    text-base
                    font-normal
                    bg-blue-50 bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" '>
                        <option value='Choose Year'>Choose Year</option>
                        {years.map((year, index) => {
                            return <option key={`year${index}`} value={year}>{year}</option>
                        })}
                    </select>
                </div>
                <div className='mb-5'>
                    <p className='font-semibold'>Author:</p>
                    <select id='author' onChange={updateFilterOptions} value={'Choose Author'} className='mt-2 form-select appearance-none
                    block
                    px-3
                    w-[220px]
                    py-1.5
                    text-base
                    font-normal
                    bg-blue-50 bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" '>
                        <option value='Choose Author'>Choose Author</option>
                        {editors.map((editor, index) =>
                            <option key={`editor-${editor}-${index}`} value={editor.username}>{editor.username}</option>
                        )}
                    </select>
                </div>

                {/* Button Options To Display Search */}
                {/* type */}
                {filterOptions.type.length > 0 && (
                    <div className='flex flex-wrap mb-10'>
                        {filterOptions.type.map((type, index) => (
                            <div key={`id-type-${type}`} id={`type-${type}`} className='emergencyButton'>
                                <span className='mr-1'>{type}</span>
                                <XIcon onClick={() => removeFilterOptions(`type-${type}`)} className='icon h-5 w-5 hover:bg-transparent' />
                            </div>
                        ))}
                    </div>
                )}

                {/* year */}
                {filterOptions.years.length > 0 && (
                    <div className='flex flex-wrap mb-10'>
                        {filterOptions.years.map((year, index) => (
                            <div key={`id-years-${year}`} id={`years-${year}`} className='yearButton'>
                                <span className='mr-1'>{year}</span>
                                <XIcon onClick={() => removeFilterOptions(`years-${year}`)} className='icon h-5 w-5 hover:bg-transparent' />
                            </div>
                        ))}
                    </div>
                )}

                {/* author */}
                {filterOptions.author.length > 0 && (
                    <div className='flex flex-wrap'>
                        {filterOptions.author.map((author, index) => (
                            <div key={`id-author-${author}`} id={`author-${author}`} className='authorButton'>
                                <span>{author}</span>
                                <XIcon onClick={() => removeFilterOptions(`author-${author}`)} className='icon h-5 w-5 hover:bg-transparent' />
                            </div>
                        ))}
                    </div>
                )}
            </div >
        </>

    )
}

export default LibrarySearchBar