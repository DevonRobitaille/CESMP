import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'
const bodyLength = 200

export function Document({ details, updateFilterOptions }) {
    let { year, title, body, editors, owner, focusArea, mediums, type, id } = details

    const [bodyText, setBodyText] = useState("")
    useEffect(() => {
        // build out body
        let text = ""
        if (body?.ops) {
            body.ops.forEach((el, index) => {
                // console.log(el)
                if (text.length >= bodyLength) return;
                let flag = text.length + el?.insert.length > bodyLength
                text += el?.insert.substring(0, bodyLength - text.length)
                if (flag) text += "..."
            })
        }

        setBodyText(text)
        // body = (body instanceof String) ? body : text
    }, [])

    return (
        <div className='flex flex-col w-full pb-10 justify-evenly'>
            <div className='flex pt-5 justify-evenly'>

                {/* Year */}
                <p className='text-gray-600'>{year}</p>

                {/* Title & Body */}
                <Link to={`/library/publication`} state={{ id: id }} className='hover:cursor-pointer w-[275px]'>
                    <h2 className='text-blue-900 text-2xl mb-4 hover:text-blue-600'>{title}</h2>
                    <p>{bodyText}</p>
                </Link>

                {/* Author & Focus Area & Type */}
                <div className='hidden sm:inline'>
                    <h2 className='mb-2'>Authors:</h2>
                    <div className='flex gap-1 flex-wrap mb-4'>
                        <button onClick={() => updateFilterOptions(
                            {
                                "target": {
                                    "id": "author",
                                    "value": owner
                                }
                            })} className='authorButton'>{owner}</button>
                        {editors && editors.map((author, index) => (
                            <button onClick={() => updateFilterOptions(
                                {
                                    "target": {
                                        "id": "author",
                                        "value": author
                                    }
                                })} key={index} className='authorButton'>{author}</button>
                        ))}
                    </div>
                    <h2 className='mb-2'>Type:</h2>
                    <div className='flex gap-1 flex-wrap mb-4'>
                        {type && type.map((t, index) => (
                            <button onClick={() => updateFilterOptions(
                                {
                                    "target": {
                                        "id": "type",
                                        "value": t
                                    }
                                })} key={index} className='emergencyButton'>{t}</button>
                        ))}
                    </div>
                    <h2 className='mb-2'>Focus Areas:</h2>
                    <div className='flex gap-1 flex-wrap mb-4'>
                        {focusArea && focusArea.map((fA, index) => (
                            <button onClick={() => updateFilterOptions(fA)} key={index} className='focusAreaButton'>{fA}</button>
                        ))}
                    </div>
                </div>

                {/* Medium */}
                <div className='hidden md:inline'>
                    <div className='flex flex-col gap-1 flex-wrap mb-4'>
                        {mediums && mediums.map((medium, index) => (
                            <button onClick={() => updateFilterOptions(medium)} key={index} className='mediumButton'>{medium}</button>
                        ))}
                    </div>
                </div>

            </div>
            <hr className='bg-gray-300 h-0.5 w-full mt-10' />
        </div>
    )
}

export default Document