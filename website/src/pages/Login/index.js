import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, UserIcon } from '@heroicons/react/outline'

import axios from '../../api/axios';
const LOGIN_URL = '/auth';

export function Login() {
    const { setAuth } = useAuth()

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [pwdVisible, setPwdVisible] = useState(false)

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, roles, accessToken });
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className='flex justify-center'>
            <div className='text-center block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>

                <p ref={errRef} className={errMsg ? "text-red-500 font-semibold mb-2" : "hidden"} aria-live="assertive">{errMsg}</p>

                {/* form */}
                <form onSubmit={handleSubmit} className='mx-auto flex flex-col content-center justify-center items-center gap-3'>
                    <div className='flex flex-1 items-center bg-[#EFEFEF] border rounded-lg p-1'>
                        <input onChange={(e) => setUser(e.target.value)} ref={userRef} required className='flex-1 outline-none bg-transparent italic pl-4' type="text" placeholder="Email" id="username" />
                        <UserIcon className='icon' />
                    </div>
                    <div className='flex flex-1 items-center bg-[#EFEFEF] border rounded-lg p-1'>
                        <input onChange={(e) => {
                            setPwd(e.target.value)
                            setPwdVisible(false)
                        }} value={pwd} required className='flex-1 outline-none bg-transparent italic pl-4' type={pwdVisible ? "text" : "password"} placeholder="Password" id="password" />
                        {!pwdVisible && <EyeOffIcon onClick={() => setPwdVisible(!pwdVisible)} className='icon' />}
                        {pwdVisible && <EyeIcon onClick={() => setPwdVisible(!pwdVisible)} className='icon' />}
                    </div>
                    <button className='w-full pt-1 pb-1 bg-blue-300 font-semibold border rounded-md hover:bg-blue-200 focus:bg-blue-400'>Log In</button>
                </form>

                {/* other */}
                <div className='text-center mb-4'>
                    <Link to='/forgot-password'><span className='hover:cursor-pointer hover:underline text-sm'>Forgot password</span></Link>
                </div>
                <div className='text-center'>
                    <span>Don't have an account? Register <Link to='/register'><span className='hover:cursor-pointer underline'>here</span></Link></span>
                </div>
            </div>
        </div>
    )
}

export default Login