// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Link } from 'react-router-dom';

// // const ReceivedProjects = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [user, setUser] = useState('alice'); // Replace with actual user logic

// //   useEffect(() => {
// //     const fetchReceivedProjects = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:5000/projects/sent?user=${user}`);
// //         setProjects(response.data);
// //       } catch (error) {
// //         console.error('Error fetching received projects', error);
// //       }
// //     };

// //     fetchReceivedProjects();
// //   }, [user]);

// //   return (
// //     <div>
// //       <h2>Requests Recieved</h2>
// //       <ul>
// //         {projects.map(project => (
// //           <li key={project._id}>
// //             <h3>{project.name}</h3>
// //             <p>{project.details}</p>
// //             <Link to={`/project/${project._id}`}>
// //               <button>View Details</button>
// //             </Link>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default ReceivedProjects;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const ReceivedProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const user = localStorage.getItem('name'); // Replace with actual user logic

//   useEffect(() => {
//     const fetchReceivedProjects = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/requests/received?user=${user}`);
//         setProjects(response.data);
//       } catch (error) {
//         console.error('Error fetching received projects', error);
//       }
//     };

//     fetchReceivedProjects();
//   }, [user]);

//   console.log(projects);
//   return (
//     <div className="min-h-screen bg-black text-white p-8">
//       <h2 className="text-4xl font-bold mb-6 text-center">Requests Received</h2>
//       <ul className="space-y-4">
//         {projects.map(project => (
//           <li key={project._id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
//             <h3 className="text-2xl font-semibold mb-2">{project.projectName}</h3>
//             <p className="mb-2">Details: {project.techStack || 'No additional information provided'}</p>
//             <p className="mb-4">Sent by: {project.senderName}</p>
//             <Link to={`/requests/${project.requestid}`}>
//               <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                 View Details
//               </button>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ReceivedProjects;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReceivedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = localStorage.getItem('name'); // Replace with actual user logic

  useEffect(() => {
    const fetchReceivedProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/requests/received?user=${user}`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching received projects', error);
        setError('Failed to fetch projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReceivedProjects();
  }, [user]);

  if (loading) return <div className="text-white text-center text-xl">Loading...</div>;
  if (error) return <div className="text-white text-center text-xl bg-red-600 p-4 rounded">{error}</div>;
  if (projects.length === 0) return <div className="text-white text-center text-xl">No received projects.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-5xl font-extrabold mb-8 text-center text-gradient bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
        Received Projects
      </h2>
      <ul className="space-y-6">
        {projects.map(project => (
          <li key={project._id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-3xl font-semibold mb-3">{project.projectName}</h3>
            <p className="mb-2 text-lg">Details: {project.techStack || 'No additional information provided'}</p>
            <p className="mb-4 text-lg">Sent by: <span className="font-semibold">{project.senderName}</span></p>
            <Link to={`/requests/${project.requestid}`}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                View Details
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceivedProjects;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const ReceivedProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const user = localStorage.getItem('name'); // Replace with actual user logic

//   useEffect(() => {
//     const fetchReceivedProjects = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/requests/received?user=${user}`);
//         setProjects(response.data);
//       } catch (error) {
//         console.error('Error fetching received projects', error);
//         setError('Failed to fetch projects. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReceivedProjects();
//   }, [user]);

//   if (loading) return <div className="text-center text-gray-300">Loading...</div>;
//   if (error) return <div className="text-center text-red-400">{error}</div>;
//   if (projects.length === 0) return <div className="text-center text-gray-400">No received projects.</div>;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-8">
//       <h2 className="text-5xl font-bold mb-8 text-center text-gradient bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
//         Requests Received
//       </h2>
//       <ul className="space-y-6">
//         {projects.map(project => (
//           <li key={project._id} className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
//             <h3 className="text-3xl font-semibold mb-3">{project.projectName}</h3>
//             <p className="mb-2 text-lg">Details: {project.techStack || 'No additional information provided'}</p>
//             <p className="mb-4 text-lg">Sent by: {project.senderName}</p>
//             <Link to={`/requests/${project.requestid}`}>
//               <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
//                 View Details
//               </button>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ReceivedProjects;
