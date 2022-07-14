import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import useLogout from "../../hooks/useLogout";

export function Logout() {
    const navigate = useNavigate();
    const logout = useLogout();



    useEffect(() => {
        const signOut = async () => {
            await logout();
            navigate('/', { replace: true });
        }

        signOut()
    }, [])

    return (
        <div>Logout</div>
    )
}

export default Logout