// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // const ViewCollaborations = () => {
// //   return (
// //     <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
// //       <h2 className="text-3xl font-bold mb-6">View Collaborations</h2>
// //       <div className="space-x-4">
// //         <Link to="/sent-projects">
// //           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
// //             Sent Projects
// //           </button>
// //         </Link>
// //         <Link to="/received-projects">
// //           <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
// //             Received Projects
// //           </button>
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ViewCollaborations;



// import React from 'react';
// import { Link } from 'react-router-dom';

// const ViewCollaborations = () => {
//   return (
//     <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white p-8">
//       <h2 className="text-4xl font-bold mb-8">View Collaborations</h2>
//       <div className="flex space-x-4">
//         <Link to="/viewMyCollabRequests">
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
//             Sent Projects
//           </button>
//         </Link>
//         <Link to="/received-projects">
//           <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
//             Received Projects
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ViewCollaborations;

import React from 'react';
import { Link } from 'react-router-dom';

const ViewCollaborations = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-8">
      <h2 className="text-5xl font-bold mb-10 text-gradient bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
        View Collaborations
      </h2>
      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
        <Link to="/viewMyCollabRequests">
          <button
            aria-label="View Sent Projects"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
          >
            Requests Send
          </button>
        </Link>
        <Link to="/received-projects">
          <button
            aria-label="View Received Projects"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
          >
            Requests Received 
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ViewCollaborations;
