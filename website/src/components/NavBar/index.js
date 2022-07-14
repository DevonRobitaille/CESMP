import { SearchIcon } from '@heroicons/react/solid'
import { BeakerIcon, LibraryIcon, ClipboardCheckIcon, AtSymbolIcon, QuestionMarkCircleIcon, LoginIcon, LogoutIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom';
import NavBarDropDown from '../NavBarDropDown';

import useAuth from '../../hooks/useAuth';
import ProfileDropDown from '../ProfileDropDown';

export const NavBar = () => {
  const navigate = useNavigate();

  const { auth } = useAuth()

  return (
    <div id='navbar' className='sticky top-0 z-50 flex bg-white px-4 shadow-sm w-full mb-1'>
      {/* Website Name */}
      <div onClick={() => navigate('/')} className='cursor-pointer text-blue-400 text-xl px-2 mr-4 font-semibold hidden sm:flex items-center'>
        <p>CESMP</p>
      </div>

      {/* Search Box */}
      <form className='flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1'>
        <SearchIcon className='h-6 w-6 text-gray-400' />
        <input className='flex-1 bg-transparent outline-none' type="text" placeholder="Search Library" />
        <button type="submit" hidden />
      </form>

      {/* Icons */}
      <div className='flex items-end'>
        <div onClick={() => navigate('/about')} className='NavButtons'>
          <QuestionMarkCircleIcon className='h-9 w-7 lg:w-9' />
          <p className='hidden lg:inline'>About Us</p>
        </div>
        <div onClick={() => navigate('/plan')} className='NavButtons'>
          <ClipboardCheckIcon className='h-9 w-9' />
          <p className='hidden lg:inline'>Plan</p>
        </div>
        <div onClick={() => navigate('/research')} className='NavButtons'>
          <BeakerIcon className='h-9 w-9' />
          <p className='hidden lg:inline'>Research</p>
        </div>
        <div onClick={() => navigate('/library')} className='NavButtons'>
          <LibraryIcon className='h-9 w-9' />
          <p className='hidden lg:inline'>Library</p>
        </div>
        <div onClick={() => navigate('/contact')} className='NavButtons'>
          <AtSymbolIcon className='h-9 w-7 lg:w-9' />
          <p className='hidden lg:inline'>Contact</p>
        </div>
        {!auth?.user && <div onClick={() => navigate('/login')} className='NavButtons'>
          <LoginIcon className='h-9 w-7 lg:w-9' />
          <p className='hidden lg:inline'>Sign In</p>
        </div>}
        {auth?.user &&
          <div className='NavButtons hidden md:flex'>
            <ProfileDropDown />
          </div>
        }
        <div className='flex items-center md:hidden'>
          <NavBarDropDown />
        </div>
      </div>


    </div>
  )
}

export default NavBar