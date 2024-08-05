// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const ProjectDetailsCollab = () => {
// //   const { projectName } = useParams();
// //   const [project, setProject] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchProject = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:5003/project/${projectName}`);
// //         setProject(response.data);
// //       } catch (error) {
// //         console.error('Error fetching project details:', error);
// //       }
// //     };
// //     fetchProject();
// //   }, [projectName]);

// //   if (!project) {
// //     return <div className="text-white text-center">Loading...</div>;
// //   }

// //   const handleSendRequest = () => {
// //     navigate(`/request/${projectName}`);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
// //       <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
// //         <div className="flex flex-col items-center">
// //           <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
// //             {project.name}
// //           </h1>
// //           <h2 className="text-2xl font-semibold mb-4">{project.makerName}</h2>
// //           <p className="text-lg mb-4">{project.description}</p>
// //           <p className="text-md mb-8">{project.details}</p>
// //         </div>

// //         <div className="mt-6 text-center">
// //           <button
// //             onClick={handleSendRequest}
// //             className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300"
// //           >
// //             Send Request
// //           </button>
// //         </div>
// //       </div>

// //       <div className="mt-8 w-full max-w-4xl bg-gray-900 p-4 rounded-lg">
// //         <h3 className="text-2xl font-semibold mb-4 text-center">Project Images</h3>
// //         <div className="flex justify-center space-x-4 overflow-x-auto">
// //           {/* Replace with actual project images */}
          
// //           <img
// //             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ENeEJPdJVKHsz1Z105gDDYWkCPQ5Ap4s8g&s"
// //             alt="Project"
// //             className="w-32 h-32 object-cover rounded-lg shadow-md"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProjectDetailsCollab;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ProjectDetailsCollab = () => {
//   const { projectName } = useParams();
//   const [project, setProject] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5003/project/${projectName}`);
//         setProject(response.data);
//       } catch (error) {
//         console.error('Error fetching project details:', error);
//       }
//     };
//     fetchProject();
//   }, [projectName]);

//   if (!project) {
//     return <div className="text-white text-center">Loading...</div>;
//   }

//   const handleSendRequest = () => {
//     console.log("here");
//     navigate(`/requestt/${projectName}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
//       <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
//         <div className="flex flex-col items-center">
//           <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//             {project.name}
//           </h1>
//           <h2 className="text-2xl font-semibold mb-4">{project.makerName}</h2>
//           <p className="text-lg mb-4">{project.description}</p>
//           <p className="text-md mb-8">{project.details}</p>
//         </div>

//         <div className="mt-6 text-center">
//           <button
//             onClick={handleSendRequest}
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300"
//           >
//             Send Request
//           </button>
//         </div>
//       </div>

//       <div className="mt-8 w-full max-w-4xl bg-gray-900 p-4 rounded-lg">
//         <h3 className="text-2xl font-semibold mb-4 text-center">Project Images</h3>
//         <div className="flex justify-center space-x-4 overflow-x-auto">
//           {/* Replace with actual project images */}
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ENeEJPdJVKHsz1Z105gDDYWkCPQ5Ap4s8g&s"
//             alt="Project"
//             className="w-32 h-32 object-cover rounded-lg shadow-md"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetailsCollab;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectDetailsCollab = () => {
  const { projectName } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/project/${projectName}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
        alert('Error fetching project details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectName]);

  const handleSendRequest = () => {
    navigate(`/requestt/${projectName}`);
  };

  if (loading) return <div className="text-white text-center text-xl">Loading...</div>;
  if (!project) return <div className="text-white text-center text-xl">Project not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {project.name}
          </h1>
          <h2 className="text-3xl font-semibold mb-4 text-gray-300">{project.makerName}</h2>
          <p className="text-lg mb-4 text-gray-400">{project.description}</p>
          <p className="text-md mb-8 text-gray-500">{project.details}</p>
        </div>

        <div className="text-center">
          <button
            onClick={handleSendRequest}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            aria-label="Send Request"
          >
            Send Request
          </button>
        </div>
      </div>

      <div className="mt-12 w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-xl">
        <h3 className="text-3xl font-semibold mb-6 text-center text-gradient bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          Project Images
        </h3>
        <div className="flex justify-center space-x-4 overflow-x-auto">
          {project.images && project.images.length > 0 ? (
            project.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Project Image ${index + 1}`}
                className="w-48 h-48 object-cover rounded-lg shadow-lg border-2 border-gray-700"
              />
            ))
          ) : (
            <p className="text-white text-center text-lg">No images available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsCollab;
