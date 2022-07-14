import React, { useState, useEffect } from 'react'
import { DocumentRow } from '../../components'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { UserGroupIcon } from '@heroicons/react/outline'
import useAuth from '../../hooks/useAuth'

export function Folder() {
    const [documentList, setDocumentList] = useState([])
    const axiosPrivate = useAxiosPrivate();

    const { auth } = useAuth()

    useEffect(() => {
        const getDocuments = async () => {
            try {
                const response = await axiosPrivate.get('/folder')
                let data = response?.data == [] ? [] : Object.values(response?.data)
                data = data.map(doc => {
                    let editors = doc.editors.filter((editor => editor.username != auth.user))
                    if (doc.owner.username != auth.user) editors = [...editors, doc.owner]
                    return { ...doc, editors }
                })
                setDocumentList(data)
            } catch (err) {
                console.log(err)
            }
        }
        getDocuments()
    }, [])

    return (
        <section>
            <div className='max-w-3xl mx-auto py-10 md:px-10 px-2 text-sm text-gray-700'>
                <div className='flex items-center justify-between pb-1'>
                    <h2 className='flex-1'>My Documents</h2>
                    <p className='mr-12'>Date Created</p>
                    <UserGroupIcon className='icon text-gray-300' />
                </div>
                <hr />
                {
                    documentList.map((doc, index) => {
                        return (<DocumentRow
                            id={doc._id}
                            index={index}
                            editors={doc.editors}
                            fileName={doc.title}
                            date={doc.createdAt}
                        />)
                    })
                }

            </div>
        </section>

    )
}

export default Folder