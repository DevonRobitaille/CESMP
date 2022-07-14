import { useCallback, useEffect, useState } from "react"
import Quill from 'quill'
import { io } from 'socket.io-client'
import { useLocation } from 'react-router-dom'
import './publication.css'
import ArticleWidget from "../../components/ArticleWidget"

export function Publication() {
    const location = useLocation()
    const { id: documentId } = location.state

    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()
    const [documentInfo, setDocumentInfo] = useState(null)

    // Connect to socket
    useEffect(() => {
        const s = io('http://localhost:3001')
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, [])

    // Load Document
    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once("load-document", ({ document }) => {
            document.createdAt = new Date(document.createdAt)
            setDocumentInfo(document)
            // console.log(document)
            quill.setContents(document.content ? document.content : "")
        })

        socket.emit("get-document", { documentId })
    }, [socket, quill, documentId])

    // create the editor
    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return

        wrapper.innerHTML = ''
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, {
            theme: 'snow',
            modules: {
                toolbar: []
            }
        })
        q.disable()
        q.setText("Loading...")
        setQuill(q)
    }, [])

    return (
        <div className="flex h-screen w-screen flex-col">
            {/* Title */}
            {documentInfo && <h2 className="mx-4 mt-5 mb-1 font-normal text-2xl">{documentInfo.title}</h2>}
            <hr />
            <div className="flex flow-row">
                {/* Document */}
                <div className="publicationContainer" ref={wrapperRef}></div>
                {documentInfo && <ArticleWidget documentInfo={documentInfo} />}
            </div>
        </div>
    )
}

export default Publication