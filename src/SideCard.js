import React from 'react';
import { FaHome,FaBookmark} from "react-icons/fa";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { LiaQuestionSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import { CiLogout,CiCircleList } from "react-icons/ci";
export default function SideCard({path}) {
    const navigate=useNavigate();
    const defColor='red';
  const menuItems = [
    { name: 'Saves', icon: <FaBookmark color={path==='/save'?defColor:null}/> },
    { name: 'Home', icon: <FaHome color={path==='/main'?defColor:null}/> },
    { name: 'Your Questions', icon: <CiCircleList size={18} color={path==='/userquestion'?defColor:null}/>  },
    {name:'Ask Questions',icon:<LiaQuestionSolid color={path==='/askquestion'?defColor:null}/>},
    {name:'Logout',icon:<CiLogout size={18}/>}
  ];
  
  return (
    <div className="w-[200px] fixed h-full border hover:cursor-pointer border-black bg-white rounded-lg shadow-md p-6  ">
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index} onClick={()=>{
            if(index===3){
                navigate('/askquestion')
            }
            else if(index===0){
              navigate('/save')
            }
            else if(index===1){
              navigate('/main')
            }else if(index===2){
              navigate('/userquestion')
            }
            else{
              localStorage.clear();
              navigate('/')
            }
          }} className="flex items-center space-x-4">
            {item.icon}
            <span className="text-gray-700 font-semibold">{item.name}</span>
          </li>
        ))}
      </ul>
      
    </div>
  );
}
