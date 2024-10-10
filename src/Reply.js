import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Header from './Header';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import UserListCard from "./userListcard"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import 'reactjs-popup/dist/index.css';
import './App.css';
import SideCard from './SideCard';

export default function Reply() {
  const location = useLocation();
  const { questionObject } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [answer, setAns] = useState(localStorage.getItem('answer') || "");
  const [vote, setVote] = useState(new Map());
  const [AnswerToShow, setAllAnswers] = useState([]);
  const [show, setShow] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [userReplied, setRepliedUser] = useState([]);
  const [userSelected, selectUser] = useState([]);

  const getAnswerHandler = useCallback(() => {
    setLoading(true);
    if (questionObject) {
      
      let questionId= questionObject.questionId;
      if(questionId===undefined){
        questionId =questionObject._id;
      }
      console.log(questionId)
      axios.get(`http://localhost:3001/api/getanswer/${questionId}`)
        .then((res) => {
          const answers = res.data.getAnswers;
          setAllAnswers(answers);
          const userIds = answers.map(answer => answer.username);
          setRepliedUser(userIds);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
   
  }, [questionObject]);

  useEffect(() => {
    setLoading(true);
    getAnswerHandler();
  
    setLoading(false);
  }, [getAnswerHandler]);

  const handleSetAns = (e) => {
    const value = e.target.value;
    if(value==='@'){
      setShow(true);
    }
   
    setAns(value);
    localStorage.setItem('answer', value);
  };

  const handleCloseUserList = () => {
    setShow(false);
  };


  const handleVote = (voteType, answerId) => {
    setVote(prevVote => {
      const newVote = new Map(prevVote);
      if (newVote.get(answerId) === voteType) {
        newVote.delete(answerId);
      } else {
        newVote.set(answerId, voteType);
      }
      return newVote;
    });
  };

  const handleUserSelected = (user) => {
    selectUser((prev)=>[...prev,user]);
    setAns(prev => `${prev}@${user}`);
  };

  
 
  
  

  const postAnswer = () => {
    setLoading(true);
    if (questionObject) {
      let questionId= questionObject.questionId;
      if(questionId===undefined){
        questionId =questionObject._id;
      }
     
      const Answer = {
        answer: answer,
        questionId: questionId,
        userId: localStorage.getItem('userId'),
        username:localStorage.getItem('username'),
        mentionedUser:userSelected,
        userRepliedTo:questionObject.author
      };
      
      console.log(Answer)
      axios.post('http://localhost:3001/api/postAnswer', Answer)
        .then((res) => {
          if (res.data.success) {
            getAnswerHandler();
            setAns("");
            localStorage.removeItem('answer');
            setLoading(false);
          }
        })
        .catch(err => console.error(err));
    }
  };

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
      ) :(
      <div className="max-w-4xl transform translate-x-[300px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg rounded-lg overflow-hidden w-11/12">
        <div className="p-6 bg-white bg-opacity-90">
          <button
            className="text-green-400 hover:text-green-600 font-bold float-right bottom-9"
            onClick={() => setVisibility(!visibility)}
          >
            Add your answer
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{questionObject.title}</h1>
          <p className="text-gray-700">
            by {questionObject.author || "you"} on {moment(questionObject.date || questionObject.createdAt).format('MMMM Do YYYY')}
          </p>
          <div className="flex flex-wrap">
            {questionObject.questionTag.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                #{tag}
              </span>
            ))}
            <p className="text-gray-700 mt-2">{questionObject.question}</p>
          </div>
          <p className="text-gray-700 font-bold mt-2">Answers: {AnswerToShow.length}</p>
        </div>
        <hr className="border-t border-gray-300" />

        <div className="p-6 bg-gradient-to-r from-yellow-200 via-green-200 to-green-400">
          {AnswerToShow.length > 0 ? AnswerToShow.map((answer) => (
            <div className="mb-4 p-4 bg-gray-800 bg-opacity-80 rounded shadow-md" key={answer._id}>
              <p className="text-white">{answer.answer}</p>
              <p className="text-sm text-gray-300">by {answer.username}</p>
              <div className="flex items-center mt-2">
                <button
                  className="text-green-400 hover:text-green-600 mr-2"
                  onClick={() => handleVote(1, answer._id)}
                >
                  <BiUpvote size={21} color={vote.get(answer._id) === 1 ? 'violet' : null} />
                </button>
                <button
                  className="text-red-400 hover:text-red-600"
                  onClick={() => handleVote(-1, answer._id)}
                >
                  <BiDownvote size={21} color={vote.get(answer._id) === -1 ? 'red' : null} />
                </button>
              </div>
            </div>
          )) : "No answers yet"}
        </div>
      </div>)}

      {visibility && (
        <div className='max-w-4xl fixed bottom-0 transform translate-x-[300px] p-4 bg-gray-800 shadow-lg rounded-lg overflow-hidden w-11/12 animate__animated animate__fadeInUp'>
          <textarea
            className='w-full h-[120px] bg-white border border-gray-300 p-2 rounded shadow-md focus:outline-none focus:ring focus:border-blue-300'
            value={answer}
            onChange={handleSetAns}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={postAnswer}
          >
            Post
          </button>
        </div>
      )}

      {show && <UserListCard users={userReplied} onUserSelected={handleUserSelected} onClose={handleCloseUserList}/>}
    </div>
  );
}
