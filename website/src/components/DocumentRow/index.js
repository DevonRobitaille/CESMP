import { DocumentReportIcon, DotsVerticalIcon } from '@heroicons/react/outline'
import ShareWithListDropDown from '../ShareWithListDropDown'
import { useNavigate } from 'react-router-dom';

export function DocumentRow({ fileName, date, editors, index, id }) {
    const createdAt = new Date(date).toLocaleDateString()
    editors = editors.map(editor => editor.username)
    const navigate = useNavigate()

    return (
        <div className='flex items-center w-full p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm hover:cursor-pointer'>
            <DocumentReportIcon className='icon text-blue-400' />
            <p onClick={() => navigate('/doc', { state: { id } })} className='flex-1 pl-5 w-10 pr-10 truncate text-md flex'>{fileName}</p>
            <p className='pr-5 text-sm'>{createdAt}</p>
            <ShareWithListDropDown editors={editors} index={index} />
        </div>
    )
}

export default DocumentRow