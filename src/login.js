import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const notify = (message) => toast(message);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev, [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('http://localhost:3001/api/auth/login', formData)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem('jwt', res.data.token);
          localStorage.setItem('userId',res.data.userId);
          localStorage.setItem('username',res.data.username);
          const user=res.data.username;
          axios.get(`http://localhost:3001/api/notification/${user}`)
          .then((res)=>{
              console.log(res.data.notification)
              localStorage.setItem('notifications',JSON.stringify(res.data.notification))
              console.log(res.data.notification.length);
              if(res.data.notification.length>0)
              localStorage.setItem('seen',false);    
          })
          .catch((err)=>{
            console.log(err);
            
          })
          setLoading(false);
          navigate('/main');
         
        }
      })
      .catch((err) => {
        console.log(err);
        notify("user not registered or password invalid");
        setLoading(false);
      });
  };

  return (
    <div>
      <Header />
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleFormData}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleFormData}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
                >
                   <ToastContainer />
                  Login
                </button>
              </div>
              <div className="flex items-center justify-between mt-5">
                <button
                  type="button"
                  className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
                >
                  New on Q~digest? Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
