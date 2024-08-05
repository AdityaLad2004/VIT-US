// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const MyCurrCollabReqDetails = () => {
//   const { id } = useParams(); // Get the request ID from the URL parameters
//   const [request, setRequest] = useState(null);

//   useEffect(() => {
//     const fetchRequestDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/collabrequests/details/${id}`);
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

//   console.log(request);

//   return (
//     <div>
//       <h3>Request Details</h3>
//       <p><strong>projectName:</strong> {request.projectName}</p>
//       <p><strong>projectMakerName:</strong> {request.projectMakerName}</p>
//       {/* <p><strong>Receiver:</strong> {request.receiver}</p>
//       <p><strong>Details:</strong> {request.details}</p>
//       <p><strong>Status:</strong> {request.status}</p> */}
//     </div>
//   );
// };

// export default MyCurrCollabReqDetails;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MyCurrCollabReqDetails = () => {
  const { id } = useParams(); // Get the request ID from the URL parameters
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/collabrequests/details/${id}`);
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
    return <div className="text-white text-center text-xl">Loading...</div>; // Display loading text while fetching data
  }

  if (!request) {
    return <div className="text-white text-center text-xl">No request details found.</div>; // Handle case when request is null
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h3 className="text-3xl font-extrabold mb-6 text-gradient bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Request Details
        </h3>
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <p className="text-lg mb-2"><strong className="text-blue-400">Project Name:</strong> {request.projectName}</p>
          <p className="text-lg mb-2"><strong className="text-blue-400">Project Maker Name:</strong> {request.projectMakerName}</p>
          {/* Uncomment these if needed */}
          {/* <p className="text-lg mb-2"><strong className="text-blue-400">Receiver:</strong> {request.receiver}</p>
          <p className="text-lg mb-2"><strong className="text-blue-400">Details:</strong> {request.details}</p>
          <p className="text-lg mb-2"><strong className="text-blue-400">Status:</strong> {request.status}</p> */}
        </div>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => console.log('Action Button Clicked')}
        >
          Take Action
        </button>
      </div>
    </div>
  );
};

export default MyCurrCollabReqDetails;
