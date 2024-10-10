// src/RegistrationCard.js
import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate=useNavigate();
       const [formData,setformData]=useState({
        username:'',
        email:'',
        password:''
       })

       const notify = (message) => toast(message);

       
       const handleFormData=(e)=>{
        const {name,value}=e.target;
             setformData((prev)=>({
              ...prev,
              [name]:value
             }))
             console.log(formData)
       }
       
       const submitFomrData=(e)=>{
            e.preventDefault();
            axios.post('http://localhost:3001/api/auth/register',formData)
            .then((res)=>{
              console.log(res)
              if(res.data.success){
                navigate('/login');
              }else {
                    
              }

            })
            .catch((err)=>{
              notify("user already registered");
              console.log(err);
            })
       }

  return (
    <div>
        <Header/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center"> Join Q~digest </h2>
        <form onSubmit={(e)=>{
          submitFomrData(e)
        }}>
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
              onChange={(e)=>handleFormData(e)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your username"
              required
              value={formData.username}
              onChange={(e)=>handleFormData(e)}
            />
          </div>
          <div className="mb-8">
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
              onChange={(e)=>handleFormData(e)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
            onSubmit={(e)=>submitFomrData(e)}
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
            >
              Register
            </button>
          </div>
          <div className="flex items-center justify-between mt-5">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
            >
              <ToastContainer />
              Already have account Login
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Register;
