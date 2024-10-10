import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBookmark, FaLessThanEqual } from "react-icons/fa6";
import { MdLocationDisabled } from 'react-icons/md';

const WarningCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-red-500 text-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Login First</h2>
        <p className="text-center">
          You need to log in first to access this content.
        </p>
      </div>
    </div>
  );
};

const Card = () => {
  const [questions, setQuestions] = useState([]);
 
  const [save,setSave]=useState([]);
  const navigate = useNavigate();
  
  const isLoggedIn =true; 
  const defColor='red';
  const handleLogin = (id,question,author,title,date,questionTag) => {
    console.log(id,question,author,title,date,questionTag)
    const questionObject={
       questionId:id,
       question:question,
       author:author,
       title:title,
       date:date,
       questionTag:questionTag
    }
    if (localStorage.getItem('userId')) {
      console.log(questionObject)
      navigate('/reply',{state:{questionObject}});
    }
      return <WarningCard />;
    
  };
  const handleSave = (id) => {
    if (save.includes(id)) {
      const updated = save.filter(item => item !== id);
      setSave(updated);
      const mapped_id =  "favorite"+localStorage.getItem('userId');
      localStorage.setItem(mapped_id, JSON.stringify(updated));
    } else {
      const updated = [...save, id];
      setSave(updated);
      const mapped_id = "favorite"+localStorage.getItem('userId');
      localStorage.setItem(mapped_id, JSON.stringify(updated));
    }
  };
  
  


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    
    
    axios.get('http://localhost:3001/api/getquestion')
      .then((res) => {
        const cpyArray = res.data.getQuestions;
        setQuestions(cpyArray.map((item) => ({
          author: item.postedByusername,
          date: formatDate(item.createdAt),
          title: item.title,
          questionTag: item.questionTag,
          question: item.question,
          questionId: item._id
        })));
      })
      .catch((err) => {
        console.log(err);
      });
      

  }, []);

  console.log(questions)

  return (
    <div className='float-right transform translate-x-[-150px] '>
      {
        questions.length > 0 ? (
          questions.map((q) => (
            <div key={q.questionId} className="max-w-4xl mx-auto bg-gradient-to-r from-green-400 to-blue-500 shadow-lg rounded-lg overflow-hidden my-4 w-11/12">
              <div className="md:flex">
                <div className="w-full p-4">
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg leading-tight font-semibold text-gray-900">
                      {q.title}
                    </h1>
                    <span className='hover:cursor-pointer'>
                      <FaBookmark color={save.includes(q.questionId)?defColor:'white'} size={20} onClick={()=>handleSave(q.questionId)}/>
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{q.question}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm">
                      <p className="text-gray-900 leading-none">{q.author}</p>
                      <p className="text-gray-600">{q.date}</p>
                    </div>
                    <div className="flex flex-wrap">
                      {q.questionTag.map((tag, index) => (
                        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>handleLogin(q.questionId,q.question,q.author,q.title,q.date,q.questionTag)}>Reply</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No questions available.</p>
        )
      
      }
    </div>
  );
};

export default Card;
