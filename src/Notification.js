import React, { useEffect, useState } from 'react';
import Header from './Header';
import SideCard from './SideCard';
import axios from 'axios';
const Notification = () => {
  const [notifications, setNotifications] = useState([{message:"new notify1"},{message:"new notify1"}]);
  
  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications'))||[] ;
    console.log(localStorage.getItem('notifications'))
    setNotifications(storedNotifications);
    const user=localStorage.getItem('username');
    localStorage.removeItem('seen');
    axios.put(`http://localhost:3001/api/notification/${user}`,{seen:true})
    .then((res)=>{
      console.log(res.message);
    })
    .catch((err)=>{
         console.log(err);
    })
  }, []);

  return (
    <div>
      <Header />
      
        <SideCard />
     
        <div className="max-w-4xl h-[100vh] transform translate-x-[400px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg rounded-lg overflow-hidden w-11/12 p-6">
        <h1 className="text-white text-3xl font-bold mb-6">Notifications</h1>
        <div className="bg-white bg-opacity-90 shadow-md rounded-lg p-6 overflow-y-auto max-h-[60vh]">
            {
                notifications.length > 0 ? notifications.map((notification, index) => (
                    <div className="p-4 mb-4 border-b last:border-b-0" key={index}>
                        <p className="text-gray-700 text-lg font-semibold leading-snug">{notification.notification}</p>
                    </div>
                )) : <p className="text-center text-gray-700 text-lg">No notifications available.</p>
            }
        </div>
    </div>
   
   </div>
  )
          
        
};

export default Notification;
