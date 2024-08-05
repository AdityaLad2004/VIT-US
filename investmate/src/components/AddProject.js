// import React, { useState } from 'react';
// import axios from 'axios';

// const AddProject = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [investAmount, setInvestAmount] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'x-auth-token': token
//         }
//       };
//       const body = { title, description, investAmount };
//       await axios.post('http://localhost:5002/api/projects', body, config);
//       alert('Project added successfully!');
//     } catch (error) {
//       console.error(error);
//       alert('Error adding project.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Title"
//         required
//       />
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Description"
//         required
//       />
//       <input
//         type="number"
//         value={investAmount}
//         onChange={(e) => setInvestAmount(e.target.value)}
//         placeholder="Invest Amount"
//         required
//       />
//       <button type="submit">Add Project</button>
//     </form>
//   );
// };

// export default AddProject;


import React, { useState } from 'react';
import axios from 'axios';

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [investAmount, setInvestAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const body = { title, description, investAmount };
      await axios.post('http://localhost:5002/api/projects', body, config);
      alert('Project added successfully!');
      // Clear the form fields after successful submission
      setTitle('');
      setDescription('');
      setInvestAmount('');
    } catch (error) {
      console.error(error);
      alert('Error adding project.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-white text-center mb-8">Add New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project Title"
              required
              className="w-full p-4 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project Description"
              required
              rows="4"
              className="w-full p-4 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="investAmount" className="block text-sm font-medium text-gray-300 mb-2">
              Invest Amount
            </label>
            <input
              id="investAmount"
              name="investAmount"
              type="number"
              value={investAmount}
              onChange={(e) => setInvestAmount(e.target.value)}
              placeholder="Investment Amount"
              required
              className="w-full p-4 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
