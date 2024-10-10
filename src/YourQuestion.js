import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import SideCard from './SideCard';
import Header from './Header';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import moment from 'moment';
import {  useLocation, useNavigate } from 'react-router-dom';
export default function YourQuestion() {
  const [loading, setLoading] = useState(false);
    const location=useLocation();
    const [questionObject,setQuestion]=useState([]);
    const navigate=useNavigate();
    
    useEffect(()=>{
               setLoading(true);
               const id=localStorage.getItem('userId');
               axios.get(`http://localhost:3001/api/getuserquestion/${id}`)
               .then((res)=>{
                   console.log(res.data.getQuestions);
                   setQuestion(res.data.getQuestions);
                   setLoading(false);
               })
               .catch((err)=>{
                  console.log(err);
                  setLoading(false);
               })
    },[])
    console.log(questionObject)

  return (
    <div>
      <Header />
      <SideCard path={location.pathname} />
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
      <div className="max-w-4xl transform translate-x-[400px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg rounded-lg overflow-hidden w-11/12">
        {
            questionObject.length>0?questionObject.map((questionObject,index)=>(
                <div className="p-6 bg-white bg-opacity-90" key={index}>
                <h1 className="text-2xl font-bold text-gray-900 hover:underline " onClick={()=>navigate('/reply',{state:{questionObject}})}>{questionObject.title}</h1>
                <p className="text-gray-700">posted on  {moment(questionObject.createdAt).format('MMMM Do YYYY')}</p>
                <div className="flex flex-wrap">
                  {questionObject.questionTag.map((tag, index) => (
                    <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #{tag}
                    </span>
                  ))}
                  <p className="text-gray-700 mt-2">{questionObject.question}</p>
                  
                </div>
                <hr />
          </div>
            )): <div className="bg-white bg-opacity-90 shadow-md rounded-lg p-6 overflow-y-auto max-h-[60vh]"><p className="text-center text-gray-700 text-lg">you have not asked questions yet</p></div>
        }
    </div>)}
    </div>
  )
}
