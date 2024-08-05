// // RequestDetails.js for seeing req details for lab and accepting/rejecting them
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './my.css'; // Ensure this import is included to apply CSS styles

// function RequestDetails({ requests }) {
//   const { requestId } = useParams();
//   const request = requests.find(req => req._id === requestId);

//   if (!request) {
//     return <div>Request not found</div>;
//   }

//   const handleStatusChange = (status) => {
//     axios.patch(`http://localhost:5000/requests/${request._id}`, { status })
//       .then(response => {
//         alert(`Request status updated to ${status}`);
//         window.location.reload(); // Reload the page to see the updated status
//       })
//       .catch(error => {
//         console.error('Error updating request status:', error);
//       });
//   };

//   console.log(request);

//   return (
//     <div>
//       <h2>Request Details</h2>
//       <p><strong>Title:</strong> {request.title}</p>
//       <p><strong>Sender:</strong> {request.senderName}</p>
//       <p><strong>Requirements:</strong> {request.details}</p>
//       <p><strong>Status:</strong> {request.status}</p>
//       <div className="request-buttons">
//         <button onClick={() => handleStatusChange('ACCEPTED')}>ACCEPT</button>
//         <button onClick={() => handleStatusChange('REJECTED')}>REJECT</button>
//       </div>
//     </div>
//   );
// }

// export default RequestDetails;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RequestDetails() {
  const { requestId } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/requests/details/${requestId}`);
        setRequest(response.data);
      } catch (error) {
        setError('Error fetching request details.');
        console.error('Error fetching request details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [requestId]);

  const handleStatusChange = async (status) => {
    try {
      await axios.patch(`http://localhost:5000/requests/${request._id}`, { status });
      setRequest(prevRequest => ({ ...prevRequest, status }));
      alert(`Request status updated to ${status}`);
    } catch (error) {
      console.error('Error updating request status:', error);
      alert('Error updating request status.');
    }
  };

  if (loading) {
    return <div className="text-center text-white mt-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-6">{error}</div>;
  }

  if (!request) {
    return <div className="text-center text-red-500 mt-6">Request not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
        Request Details
      </h2>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <p className="text-lg mb-4">
          <strong className="text-teal-400">Title:</strong> {request.title}
        </p>
        <p className="text-lg mb-4">
          <strong className="text-teal-400">Sender:</strong> {request.senderName}
        </p>
        <p className="text-lg mb-4">
          <strong className="text-teal-400">Requirements:</strong> {request.details}
        </p>
        <p className="text-lg mb-6">
          <strong className="text-teal-400">Status:</strong> {request.status}
        </p>
        <div className="flex justify-around">
          <button
            onClick={() => handleStatusChange('ACCEPTED')}
            className="px-6 py-3 bg-green-600 rounded-md hover:bg-green-500 transition duration-200"
          >
            Accept
          </button>
          <button
            onClick={() => handleStatusChange('REJECTED')}
            className="px-6 py-3 bg-red-600 rounded-md hover:bg-red-500 transition duration-200"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestDetails;
