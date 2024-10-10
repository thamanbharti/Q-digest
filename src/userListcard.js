import React, { useEffect, useRef } from 'react';

const UserListCard = ({ users, onUserSelected, onClose }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={cardRef} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 w-72 max-h-80 overflow-y-auto border border-gray-300 bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Select User</h2>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li
            key={index}
            className="flex items-center justify-between hover:bg-gray-100 p-2 rounded cursor-pointer transition-colors duration-300 ease-in-out"
            onClick={() => onUserSelected(user)}
          >
            <span className="text-gray-700">{user}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500 hover:text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListCard;
