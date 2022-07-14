import React from 'react'

export function ArticleWidget({ documentInfo }) {
    return (
        <div className='flex flex-col mx-auto'>
            {/* Title */}
            <h3 className='font-semibold text-center'>{documentInfo.title}</h3>
            {/* Card */}
            <div className='flex flex-col w-[275px] border border-gray-400'>
                <table className='w-full text-sm text-left text-gray-700'>
                    <tbody>
                        <tr className='bg-white'>
                            <th scope='row' className='font-semibold pl-2'>
                                Medium
                            </th>
                            <th className='font-normal'>
                                {documentInfo.medium.map((medium, index) => {
                                    return (
                                        <span key={`span-medium-${medium}`}>{medium}</span>
                                    )
                                })}
                            </th>
                        </tr>
                        <tr className='bg-white'>
                            <th scope='row' className='font-semibold pl-2'>
                                Author(s)
                            </th>
                            <th className='font-normal'>
                                {documentInfo.editors.map((editor, index) => {
                                    return (
                                        <span key={`span-editor-${editor}`}>{editor}</span>
                                    )
                                })}
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ArticleWidget