// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const ViewMyCollabRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const currentUser = localStorage.getItem('name'); // Replace with the actual username you want to hardcode
//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/fetchcollabrequestsforauser?senderName=${currentUser}`);
//         setRequests(response.data);
//       } catch (error) {
//         console.error('Error fetching requests:', error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleRequestClick = (id) => {
//     navigate(`/collabrequests/details/${id}`); // Navigate to details page
//   };

//   return (
//     <div>
//       <h2>My Requests</h2>
//       <ul>
//         {requests.map((request) => (
//           <li key={request._id}>
//             <button onClick={() => handleRequestClick(request._id)}>
//               {request.projectName}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ViewMyCollabRequests;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewMyCollabRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = localStorage.getItem('name'); // Replace with actual username logic
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/fetchcollabrequestsforauser?senderName=${currentUser}`);
        setRequests(response.data);
      } catch (error) {
        setError('Error fetching requests.');
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentUser]);

  const handleRequestClick = (id) => {
    navigate(`/collabrequests/details/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-gradient bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
        My Collaboration Requests
      </h2>
      {loading && <div className="text-center text-blue-400 text-xl">Loading...</div>}
      {error && <div className="text-center text-red-500 text-xl bg-red-900 p-4 rounded-md shadow-lg">{error}</div>}
      {requests.length === 0 && !loading && !error && (
        <div className="text-center text-gray-400 text-lg">No requests available.</div>
      )}
      <ul className="space-y-6">
        {requests.map((request) => (
          <li
            key={request._id}
            className="bg-gray-800 p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-700"
          >
            <button
              onClick={() => handleRequestClick(request._id)}
              className="w-full text-left focus:outline-none"
            >
              <h3 className="text-2xl font-semibold mb-2">{request.projectName}</h3>
              <p className="text-gray-300 mb-2">{request.additionalInfo || 'No additional information provided'}</p>
              <p className="text-gray-500 text-sm">Requested by: {request.requesterName || 'Unknown'}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMyCollabRequests;
