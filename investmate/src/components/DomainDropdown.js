// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const DomainDropdown = () => {
//   const [domains, setDomains] = useState([]);
//   const [selectedDomain, setSelectedDomain] = useState('');
//   const [projects, setProjects] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDomains = async () => {
//       try {
//         const response = await axios.get('http://localhost:5003/domains');
//         setDomains(response.data);
//       } catch (error) {
//         console.error('Error fetching domains:', error);
//       }
//     };

//     fetchDomains();
//   }, []);

//   const handleDomainChange = (e) => {
//     const domain = e.target.value;
//     setSelectedDomain(domain);
//     const selected = domains.find((d) => d.domain === domain);
//     setProjects(selected ? selected.projects : []);
//   };

//   const handleProjectClick = (projectName) => {
//     navigate(`/project/${projectName}`);
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
//       <h1 className="text-4xl font-bold mb-8 text-center">Explore Domains and Projects</h1>
      
//       <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-4 text-center">Select a Domain</h2>
        
//         <select
//           value={selectedDomain}
//           onChange={handleDomainChange}
//           className="bg-gray-700 text-white p-3 rounded mb-6 w-full"
//         >
//           <option value="">Select a domain</option>
//           {domains.map((domain) => (
//             <option key={domain._id} value={domain.domain}>
//               {domain.domain}
//             </option>
//           ))}
//         </select>

//         {selectedDomain && (
//           <div>
//             <h3 className="text-xl font-semibold mb-4 text-center">Projects:</h3>
//             <ul className="space-y-3">
//               {projects.map((project, index) => (
//                 <li key={index}>
//                   <button
//                     onClick={() => handleProjectClick(project.name)}
//                     className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded-lg w-full text-left transition duration-300 ease-in-out"
//                   >
//                     {project.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DomainDropdown;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DomainDropdown = () => {
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await axios.get('http://localhost:5003/domains');
        setDomains(response.data);
      } catch (error) {
        console.error('Error fetching domains:', error);
      }
    };

    fetchDomains();
  }, []);

  const handleDomainChange = (e) => {
    const domain = e.target.value;
    setSelectedDomain(domain);
    const selected = domains.find((d) => d.domain === domain);
    setProjects(selected ? selected.projects : []);
  };

  const handleProjectClick = (projectName) => {
    navigate(`/project/${projectName}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gradient bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
        Explore Domains and Projects
      </h1>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-100">Select a Domain</h2>

        <select
          value={selectedDomain}
          onChange={handleDomainChange}
          className="bg-gray-700 text-gray-200 p-4 rounded-lg mb-6 w-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select a domain</option>
          {domains.map((domain) => (
            <option key={domain._id} value={domain.domain}>
              {domain.domain}
            </option>
          ))}
        </select>

        {selectedDomain && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-100">Projects:</h3>
            <ul className="space-y-4">
              {projects.map((project, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleProjectClick(project.name)}
                    className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-3 px-6 rounded-lg w-full text-left transition-transform transform hover:scale-105 ease-in-out shadow-md hover:shadow-lg"
                  >
                    {project.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainDropdown;
