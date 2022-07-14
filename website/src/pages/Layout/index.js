import { Outlet } from "react-router-dom"
// Components
import {
    NavBar,
} from '../../components'

export const Layout = () => {
    return (
        <main className="App flex flex-col h-screen">
            <NavBar />
            <Outlet />
        </main>
    )
}

export default Layout
