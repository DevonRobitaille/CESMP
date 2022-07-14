import React, { useState } from 'react'
import { XIcon } from '@heroicons/react/outline'

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from '../../hooks/useAuth';

export function PublicationModal(props) {
    const { setShowModal, editors, getPublication } = props
    const [title, setTitle] = useState('')
    const [filterOptions, setFilterOptions] = useState({
        "medium": [],
        "focusArea": [],
        "type": [],
        "editor": [],
    })
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth()

    const localEditors = editors.filter((editor, index) => editor.username !== auth.user).map((editor, index) => editor.username)

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        const publication = {
            title,
            editors: [...filterOptions.editor],
            medium: [...filterOptions.medium],
            focusArea: [...filterOptions.focusArea],
            type: [...filterOptions.type]
        }

        try {
            const response = await axiosPrivate.post('/publications-protected',
                JSON.stringify({ ...publication }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            getPublication()
        } catch (err) {
            console.log(err)
        }
    }

    const removeFilterOptions = (update) => {
        const option = update.split('-')
        const category = filterOptions[option[0]].filter((filter) => filter !== option[1])
        if (option[0] === 'type') setFilterOptions({ ...filterOptions, type: category })
        if (option[0] === 'editor') setFilterOptions({ ...filterOptions, editor: category })
        if (option[0] === 'medium') setFilterOptions({ ...filterOptions, medium: category })
        if (option[0] === 'focusArea') setFilterOptions({ ...filterOptions, focusArea: category })
    }

    const updateFilterOptions = (update) => {
        if (update?.target.id === 'type') {
            let type = filterOptions.type.filter((option) => option !== update?.target.value)
            type = [...type, update?.target.value]
            setFilterOptions({ ...filterOptions, type })
        }
        if (update?.target.id === 'editor') {
            let editor = filterOptions.editor.filter((option) => option !== update?.target.value)
            editor = [...editor, update?.target.value]
            setFilterOptions({ ...filterOptions, editor })
        }
        if (update?.target.id === 'medium') {
            let medium = filterOptions.medium.filter((option) => option !== update?.target.value)
            medium = [...medium, update?.target.value]
            setFilterOptions({ ...filterOptions, medium })
        }
        if (update?.target.id === 'focusArea') {
            let focusArea = filterOptions.focusArea.filter((option) => option !== update?.target.value)
            focusArea = [...focusArea, update?.target.value]
            setFilterOptions({ ...filterOptions, focusArea })
        }
    }

    const Field = ({ fieldName, fieldOptions, defaultField }) => {
        return (
            <div>
                {/* Add editors */}
                <div className='mb-5'>
                    <p className='font-semibold'>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:</p>
                    <select id={fieldName} onChange={updateFilterOptions} value={`Choose ${fieldName}`} className='mt-2 form-select appearance-none
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
                        <option value={`Choose ${fieldName}`}>{defaultField}</option>
                        {fieldOptions.map((value, index) => <option value={value}>{value}</option>)}
                    </select>
                </div>

                {/* field's Choosen */}
                {filterOptions[fieldName].length > 0 && (
                    <div className='flex flex-wrap'>
                        {filterOptions[fieldName].map((_fieldName, index) => (
                            <div key={`${fieldName}-${_fieldName}`} id={`${fieldName}-${_fieldName}`} className='authorButton'>
                                <span>{_fieldName}</span>
                                <XIcon onClick={() => removeFilterOptions(`${fieldName}-${_fieldName}`)} className='icon h-5 w-5 hover:bg-transparent' />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="max-w-[350px] border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Create Publication
                            </h3>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <form onSubmit={handleSubmit} className='mx-auto flex flex-col content-center justify-center items-center gap-3'>
                                <div className='flex flex-1 items-center bg-[#EFEFEF] border rounded-lg p-1'>
                                    <input id='title' onChange={(e) => setTitle(e.target.value)} required className='flex-1 outline-none bg-transparent italic pl-4' type="text" placeholder="Title ..." id="title" />
                                </div>

                                <Field fieldName="editor" fieldOptions={localEditors} defaultField="Share with ..." />
                                <Field fieldName="medium" fieldOptions={["Article", "Book", "Report", "Video"]} defaultField="Choose a medium" />
                                <Field fieldName="focusArea" fieldOptions={["Law", "Policy", "Strategy"]} defaultField="Choose a focus area" />
                                <Field fieldName="type" fieldOptions={["Pandemic", "Flooding", "Fire", "Evacuation"]} defaultField="Choose an emergency" />

                            </form>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    handleSubmit()
                                    setShowModal(false)
                                }}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default PublicationModal