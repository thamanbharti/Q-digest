// src/index.js
import React from 'react';
import './tailwind.css'; 
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Reply from './Reply';
import Login from './login';
import Notification from './Notification';
import Favourite from './favourite';
import Register from './Register';
import Post from './Post';
import YourQuestion from './YourQuestion';
import Main from './Main';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/main',
    element: <Main />,
  },
  {
    path: '/reply',
    element: <Reply />,
  },{
    path:'/login',
    element:<Login/>,
  },{
    path:'/register',
    element:<Register/>
  },{
    path:'/askquestion',
    element:<Post/>
  }
  ,{
    path:'/save',
    element:<Favourite/>
  },{
    path:'userquestion',
    element:<YourQuestion/>
  },{
    path:'/notification',
    element:<Notification/>
  }
]);

root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);

reportWebVitals();
