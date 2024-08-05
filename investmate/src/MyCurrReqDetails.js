// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const MyCurrReqDetails = () => {
//   const { id } = useParams(); // Get the request ID from the URL parameters
//   const [request, setRequest] = useState(null);

//   useEffect(() => {
//     const fetchRequestDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/requests/details/${id}`);
//         setRequest(response.data);
//       } catch (error) {
//         console.error('Error fetching request details:', error);
//       }
//     };

//     fetchRequestDetails();
//   }, [id]);

//   if (!request) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h3>Request Details</h3>
//       <p><strong>Title:</strong> {request.title}</p>
//       <p><strong>Sender:</strong> {request.senderName}</p>
//       <p><strong>Receiver:</strong> {request.receiver}</p>
//       <p><strong>Details:</strong> {request.details}</p>
//       <p><strong>Status:</strong> {request.status}</p>
//     </div>
//   );
// };

// export default MyCurrReqDetails;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MyCurrReqDetails = () => {
  const { id } = useParams(); // Get the request ID from the URL parameters
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/requests/details/${id}`);
        setRequest(response.data);
      } catch (error) {
        console.error('Error fetching request details:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched or if an error occurs
      }
    };

    fetchRequestDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-white mt-6">Loading...</div>;
  }

  if (!request) {
    return <div className="text-center text-white mt-6">No request details found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h3 className="text-4xl font-bold mb-8 text-gradient bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
        Request Details
      </h3>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <p className="text-lg mb-4">
          <strong className="text-teal-400">Title:</strong> {request.title}
        </p>
        <p className="text-lg mb-4">
          <strong className="text-teal-400">Sender:</strong> {request.senderName}
        </p>
        <p className="text-lg mb-4">
          <strong className="text-teal-400">Receiver:</strong> {request.receiver}
        </p>
        <p className="text-lg mb-4">
          <strong className="text-teal-400">Details:</strong> {request.details}
        </p>
        <p className="text-lg">
          <strong className="text-teal-400">Status:</strong> {request.status}
        </p>
      </div>
    </div>
  );
};

export default MyCurrReqDetails;
