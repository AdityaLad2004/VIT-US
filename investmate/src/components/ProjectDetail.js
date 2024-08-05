// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProjectDetail = ({ match }) => {
//   const [project, setProject] = useState(null);
//   const [amount, setAmount] = useState(0);

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/projects/${match.params.id}`);
//         setProject(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchProject();
//   }, [match.params.id]);

//   const handleInvestment = async () => {
//     // Handle the investment logic here
//     console.log(`Invested amount: ${amount}`);
//   };

//   if (!project) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{project.title}</h1>
//       <p>{project.description}</p>
//       <p>Amount: {project.amount}</p>
//       <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Investment Amount" />
//       <button onClick={handleInvestment}>Invest</button>
//     </div>
//   );
// };

// export default ProjectDetail;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetail = () => {
  const { id } = useParams(); // Get project ID from URL params
  const [project, setProject] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${id}`);
        setProject(res.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };
    fetchProject();
  }, [id]);

  const handleInvestment = async () => {
    if (amount <= 0) {
      alert('Investment amount must be greater than 0.');
      return;
    }
    try {
      // Replace with actual investment API call
      await axios.post(`http://localhost:5000/api/projects/invest`, { projectId: id, amount });
      alert('Investment successful!');
      setAmount('');
    } catch (error) {
      console.error('Error making investment:', error);
      alert('Error making investment.');
    }
  };

  if (!project) {
    return <div className="text-white text-center text-xl">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 flex flex-col items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold mb-4 text-gradient bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
          {project.title}
        </h1>
        <p className="text-lg mb-2">{project.description}</p>
        <p className="text-lg mb-4">Amount Needed: <span className="font-semibold">${project.amount}</span></p>
        <div className="mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Investment Amount"
            className="bg-gray-700 text-white p-3 rounded-lg w-full max-w-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleInvestment}
          className="bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Invest
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;
