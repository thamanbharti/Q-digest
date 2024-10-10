import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import Avatar from '@mui/material/Avatar';

function Header() {
  const navigate = useNavigate();
  const [isLogin, setUserLogged] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUserLogged(true);
    } else {
      setUserLogged(false);
    }
    console.log(userId);
  }, []);

  return (
    <header className="bg-gray-800 text-white fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Website Name */}
        <div className="text-2xl font-bold">
          Q~digest
        </div>

        {/* Notification Icon and Avatar */}
        <div className="flex items-center space-x-4">
          <div className='hover:cursor-pointer'>
            {localStorage.getItem('seen') !== null ? (
              <MdNotificationsActive onClick={() => navigate('/notification')} color='red' size={23} />
            ) : (
              <IoMdNotificationsOutline onClick={() => navigate('/notification')} size={23} />
            )}
          </div>
          {
            localStorage.getItem('userId') ? (
              <Avatar>
                {localStorage.getItem('username')[0].toUpperCase()}
              </Avatar>
            ) : (
              <div className="flex space-x-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/login')}>
                  Login
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/register')}>
                  Signup
                </button>
              </div>
            )
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
