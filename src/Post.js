import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import SideCard from './SideCard';
export default function Post() {
  const location=useLocation();
  const [tags, setTags] = useState([]);
  const [selectedTag,selectTag]=useState([]);
  const classNameA="inline-block hover:cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-3";
  const classNameB="inline-block hover:cursor-pointer bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-3";
  const [post,createPost]=useState({
    title:"",
    postedById:localStorage.getItem('userId'),
    postedByusername:localStorage.getItem('username'),
    question:"",
    questionTag:[]
  })
  const notify = (message) => toast(message);
  useEffect(() => {
    axios.get('http://localhost:3001/api/tag')
      .then((res) => {
        console.log(res.data.data[0])
        const fetchedTags = res.data.data[0].tag.name;
        setTags(fetchedTags);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleselectTag=(index)=>{
    
       
        selectTag((prev)=>{
          if(prev.length&&prev.includes(index)){
             return  prev.filter((tagIndex)=>tagIndex!==index)
          }
          else 
             return [...prev,index]
        })
  }
  
  const handleCreatepost=(e)=>{
      const {name,value}=e.target;
      createPost((prev)=>(
        {...prev,[name]:value}))
  }

  const handleSubmit=()=>{
     const qtag=[];
     for(let i=0;i<selectedTag.length;i++){
         qtag.push(tags[selectedTag[i]]);
     }
     post.questionTag=qtag; 

      axios.post('http://localhost:3001/api/askquestion',post)
      .then((res)=>{
          if(res.data.success){
           notify("Post Created");
           
          }
      })
      .catch((err)=>console.log(err));
  }

  return (
    <div >
    <Header />
    <SideCard path={location.pathname}/>
    {/* <div className="flex justify-center mt-5"> */}
      <div className="max-w-4xl transform translate-x-[25vw] translate-y-4 p-6 bg-gray-800 shadow-lg rounded-lg w-full sm:w-11/12 lg:w-3/4">
        <h3 className="font-bold text-lg text-white mb-2">Title</h3>
        <input 
          name="title"
          placeholder="Enter title"
          className="w-full bg-white border border-gray-300 p-2 rounded shadow-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
          onChange={(e)=>handleCreatepost(e)}
          value={post.title}
        />
        <h3 className="font-bold text-lg text-white mb-2">Write your Question</h3>
        <textarea name='question'
          placeholder="Write your question here"
          className="w-full h-32 lg:h-48 bg-white border border-gray-300 p-2 rounded shadow-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
          onChange={(e)=>handleCreatepost(e)}
          value={post.question}
        />
        <h3 className="font-bold text-lg text-white mb-2">Tags</h3>
        <div className="flex flex-wrap mb-4">
          {tags.length > 0 ? tags.map((tag, index) => (
            
            <span 
              key={index} 
              className={(selectedTag.length&&selectedTag.includes(index))?classNameB:classNameA}
              onClick={() => handleselectTag(index)}
            >
              #{tag}
            </span>
          )) : "empty"}
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
          <ToastContainer/>
          Post
        </button>
      </div>
    {/* </div> */}
  </div>
  );
}
