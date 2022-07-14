import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from "react"
import Quill from 'quill'
import { io } from 'socket.io-client'
import 'quill/dist/quill.snow.css'
import './quill.css'
import useAuth from '../../hooks/useAuth'
import useRefreshToken from "../../hooks/useRefreshToken";

export function DocumentEdit() {
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()
    const [documentInfo, setDocumentInfo] = useState({})

    const { auth } = useAuth()
    const refresh = useRefreshToken()

    const location = useLocation()
    const navigate = useNavigate()
    if (!location?.state?.id) navigate('/')

    const documentId = location.state?.id

    const SAVE_INTERVAL_MS = 2000
    const TOOLBAR_OPTIONS = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ align: [] }],
        ["image", "blockquote", "code-block"],
        ["clean"],
    ]

    // Connect to socket
    useEffect(() => {

        let s = undefined

        const createSocket = async () => {
            const newAccessToken = await refresh();

            s = io('http://localhost:3001', {
                query: { token: newAccessToken }
            })
            setSocket(s)
        }

        createSocket()

        return () => {
            s.disconnect()
        }
    }, [])

    // Load Document
    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once("load-document", ({ document, canEdit }) => {
            if (!canEdit) navigate('/publication', { state: { id: documentId } })
            setDocumentInfo(document)
            quill.setContents(document.content ? document.content : "")
            // only if in edit mode
            quill.enable()
        })

        socket.emit("get-document", { documentId })
    }, [socket, quill, documentId])

    // Save the whole document, this will be saved to draft
    useEffect(() => {
        if (socket == null || quill == null) return

        const interval = setInterval(() => {
            socket.emit("save-document", quill.getContents())
        }, SAVE_INTERVAL_MS)

        return () => {
            clearInterval(interval)
        }
    }, [socket, quill])

    // receive updates to the contents of the document
    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = delta => {
            quill.updateContents(delta)
        }
        socket.on("receive-changes", handler)

        return () => {
            socket.off("receive-changes", handler)
        }
    }, [socket, quill])

    // send updates of the contents of the document
    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = (delta, oldDelta, source) => {
            if (source !== "user") return
            socket.emit("send-changes", delta)
        }
        quill.on("text-change", handler)

        return () => {
            quill.off("text-change", handler)
        }
    }, [socket, quill])

    // create the editor
    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return

        wrapper.innerHTML = ''
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, {
            theme: 'snow',
            modules: {
                toolbar: TOOLBAR_OPTIONS
            }
        })
        q.disable()
        q.setText("Loading...")
        setQuill(q)
    }, [])

    return (
        <div className='flex mx-auto'>
            <div className="container" ref={wrapperRef}></div>
        </div>
    )
}

export default DocumentEdit