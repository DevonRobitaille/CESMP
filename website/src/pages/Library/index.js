import React, { useState } from 'react'
import { NewspaperIcon, OfficeBuildingIcon } from '@heroicons/react/outline'
import { Document, LibrarySearchBar } from '../../components/index'
import axios from '../../api/axios'

export function Library() {
    const [editors, setEditors] = useState([])
    const [isFilterMenuOpen, setFilterMenuOpen] = useState(false)
    const [filterOptions, setFilterOptions] = useState({
        "medium": {
            "Article": false,
            "Book": false,
            "Report": false,
            "Video": false,
        },
        "focusArea": {
            "Law": false,
            "Policy": false,
            "Strategy": false
        },
        "type": [],
        "years": [],
        "author": [],
    })
    const [publicationList, setPublicationList] = useState([])

    const clearFilter = () => {
        setFilterOptions({
            "medium": {
                "Article": false,
                "Book": false,
                "Report": false,
                "Video": false,
            },
            "focusArea": {
                "Law": false,
                "Policy": false,
                "Strategy": false
            },
            "type": [],
            "years": [],
            "author": [],
        })
    }

    const removeFilterOptions = (update) => {
        const option = update.split('-')
        const category = filterOptions[option[0]].filter((filter) => filter !== option[1])
        if (option[0] === 'type') setFilterOptions((prevState) => ({ ...prevState, type: category }))
        if (option[0] === 'years') setFilterOptions((prevState) => ({ ...prevState, years: category }))
        if (option[0] === 'author') setFilterOptions((prevState) => ({ ...prevState, author: category }))
    }

    const updateFilterOptions = (update) => {
        if (update === 'Article' || update === 'Book' || update === 'Report' || update === 'Video') {
            let medium = filterOptions.medium;
            const newValue = !medium[update]
            medium.Article = false;
            medium.Book = false;
            medium.Report = false;
            medium.Video = false;
            medium[update] = newValue;
            setFilterOptions((prevState) => ({ ...prevState, medium }));
        }
        if (update === 'Law' || update === 'Policy' || update === 'Strategy') {
            let focusArea = filterOptions.focusArea;
            focusArea[update] = !focusArea[update];
            setFilterOptions((prevState) => ({ ...prevState, focusArea }));
        }
        if (update?.target?.id === 'type') {
            let type = filterOptions.type.filter((option) => option !== update?.target.value)
            type = [...type, update?.target.value]
            setFilterOptions((prevState) => ({ ...prevState, type }));
        }
        if (update?.target?.id === 'years') {
            let years = filterOptions.years.filter((option) => option !== update?.target.value)
            years = [...years, update?.target.value]
            setFilterOptions((prevState) => ({ ...prevState, years }));
        }
        if (update?.target?.id === 'author') {
            let author = filterOptions.author.filter((option) => option !== update?.target.value)
            author = [...author, update?.target.value]
            setFilterOptions((prevState) => ({ ...prevState, author }));
        }
    }

    React.useEffect(() => {
        function handleResize() {
            setFilterMenuOpen(false)
        }

        window.addEventListener('resize', handleResize)
    }, [])

    React.useEffect(() => {
        getPublication()
    }, [filterOptions])

    const getPublication = async () => {
        let options = { ...filterOptions }
        options.medium = Object.keys(options.medium).filter(val => options.medium[val] === true)
        options.focusArea = Object.keys(options.focusArea).filter(val => options.focusArea[val] === true)
        try {
            const response = await axios.put('/publications-not-protected',
                JSON.stringify({ ...options }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            let documentList = response.data.map((document, index) => document = {
                "year": document.createdAt.split('-')[0],
                "title": document.title,
                "body": document.content,
                "editors": document.editors.map((obj, index) => obj.username),
                "owner": document.owner.username,
                "focusArea": document.focusArea,
                "mediums": document.medium,
                "type": document.type,
                "id": document._id
            })

            setPublicationList(documentList)
        } catch (err) {
            console.log(err)
        }
    }

    // load values
    React.useEffect(() => {
        getPublication()
    }, [])

    React.useEffect(() => {
        const getAuthors = async () => {
            try {
                const response = await axios.get('/editors',
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                const data = response?.data
                setEditors(data)
            } catch (err) {
                console.log(err)
            }
        }

        getAuthors()
    }, [])

    return (
        <div className='flex h-screen'>
            <div className='flex w-full'>
                {/* sidebar */}
                <div className='hidden w-[150px] text-center bg-gray-200 lg:flex flex-col items-center justify-center font-semibold pl-4 pr-4'>
                    <NewspaperIcon className='h-12 w-12 hover:cursor-pointer' />
                    <p className='hidden lg:inline mb-20 hover:cursor-pointer'>Publications</p>
                    <OfficeBuildingIcon className='h-12 w-12 hover:cursor-pointer' />
                    <p className='hidden lg:inline hover:cursor-pointer'>Strategies and Governance</p>
                </div>
                <vr className='bg-gray-300 w-1 font-thin hidden lg:inline' />

                {/* search sidebar */}
                <LibrarySearchBar getPublication={getPublication} editors={editors} filterOptions={filterOptions} updateFilterOptions={updateFilterOptions} removeFilterOptions={removeFilterOptions} />

                <vr className='bg-gray-300 mx-auto w-1 font-thin hidden md:inline' />

                <div className='flex flex-col w-full mt-3 gap-3'>
                    {/* Search Bar When screen medium */}
                    <div className='md:hidden flex w-full ml-10'>
                        <div className='flex min-w-[100px]'>
                            {!isFilterMenuOpen && <button onClick={() => clearFilter()} className='text-sm p-1 pl-2 pr-2 border rounded-2xl bg-yellow-500 text-gray-600 hover:bg-yellow-400'>Clear Filters</button>}
                        </div>
                        <div className='flex w-full justify-end mr-[50px]'>
                            <button onClick={() => setFilterMenuOpen(!isFilterMenuOpen)} className='text-sm p-1 pl-2 pr-2 border rounded-2xl bg-yellow-500 text-gray-600 hover:bg-yellow-400'>{!isFilterMenuOpen ? "Filters" : "Close"}</button>
                        </div>
                    </div>

                    <hr className='ml-10 mr-2 bg-gray-300 h-0.5' />
                    <div className='flex flex-col p-2 pl-10 w-full'>
                        {publicationList.map((document, index) => (
                            <Document updateFilterOptions={updateFilterOptions} key={index} details={document} />
                        ))}
                    </div>
                </div>

                {/* Drawer */}
                {isFilterMenuOpen && (
                    <div className={
                        "mt-[95px] bg-white fixed overflow-hidden z-10 inset-0 transform ease-in-out" + (isFilterMenuOpen
                            ? " transition-opacity opacity-100 duration-500 translate-x-0"
                            : " transition-all delay-500 opacity-0 translate-x-full"
                        )
                    }>
                        <section className={'w-full right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' + (isFilterMenuOpen
                            ? " translate-x-0 "
                            : " translate-x-full "
                        )
                        }>

                            {/* search sidebar */}
                            <LibrarySearchBar getPublication={getPublication} editors={editors} filterOptions={filterOptions} updateFilterOptions={updateFilterOptions} sideMenu={true} removeFilterOptions={removeFilterOptions} />
                        </section>


                    </div>
                )}
            </div>
        </div >
    )
}

export default Library