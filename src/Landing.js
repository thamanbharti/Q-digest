import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();


  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate('/main');
    }
  }, [navigate]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    localStorage.removeItem('token');
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-6">
    <header className="bg-gray-800 text-white fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Website Name */}
        <div className="text-2xl font-bold">
          Q~digest
        </div>

        {/* Notification Icon and Avatar */}
        <div className="flex items-center space-x-4">
          
          
              <div className="flex space-x-2">
                <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/login')}>
                  Login
                </button>
                <button  onClick={handleRegister} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/register')}>
                  Signup
                </button>
              </div>
            
        </div>
      </div>
    </header>
      <header className="w-full max-w-6xl p-4 bg-white shadow-md rounded-lg mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Q~digest</h1>
      </header>


      <main className="flex flex-col items-center space-y-8">
        <h2 className="text-2xl font-semibold text-white">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {[
            {
              title: 'Ask Questions',
              description: 'Explore your curiosity by asking questions and getting answers from experts worldwide.',
            },
            {
              title: 'Mention Users',
              description: 'Engage directly with other users by mentioning them in your replies and discussions.',
            },
            {
              title: 'Expert Answers',
              description: 'Receive detailed answers and insights from knowledgeable experts in various fields.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md transform transition duration-500 hover:scale-105 cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
