// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const SendRequest = () => {
// //   const [labs, setLabs] = useState([]);
// //   const [selectedLab, setSelectedLab] = useState('');
// //   const [senderName, setSenderName] = useState('');
// //   const [details, setDetails] = useState('');
// //   const [status, setStatus] = useState('PENDING');

// //   useEffect(() => {
// //     const fetchLabs = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:5000/labs');
// //         setLabs(response.data);
// //       } catch (error) {
// //         console.error('Error fetching labs', error);
// //       }
// //     };

// //     fetchLabs();
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const requestData = {
// //         senderName,
// //         receiver: selectedLab,
// //         details,
// //         status
// //       };
// //       await axios.post('http://localhost:5000/requests', requestData);
// //       alert('Request sent successfully!');
// //       // Clear the form
// //       setSenderName('');
// //       setSelectedLab('');
// //       setDetails('');
// //     } catch (error) {
// //       console.error('Error sending request', error);
// //     }
// //   };

// //   console.log(labs);

// //   return (
// //     <div>
// //       <h2>Send Request</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Sender Name:</label>
// //           <input
// //             type="text"
// //             value={senderName}
// //             onChange={(e) => setSenderName(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Select Lab:</label>
// //           <select
// //             value={selectedLab}
// //             onChange={(e) => setSelectedLab(e.target.value)}
// //             required
// //           >
// //             <option value="" disabled>Select a lab</option>
// //             {labs.map((lab) => (
// //               <option key={lab._id} value={lab.name}>
// //                 {lab.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //         <div>
// //           <label>Details:</label>
// //           <textarea
// //             value={details}
// //             onChange={(e) => setDetails(e.target.value)}
// //             required
// //           ></textarea>
// //         </div>
// //         <div>
// //           <button type="submit">Send Request</button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default SendRequest;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SendRequest = () => {
//   const [labs, setLabs] = useState([]);
//   const [selectedLab, setSelectedLab] = useState('');
//   const [senderName, setSenderName] = useState('');
//   const [details, setDetails] = useState('');
//   const [title, setTitle] = useState('');
//   const [status, setStatus] = useState('PENDING');
//   const [currentStep, setCurrentStep] = useState(1); // State to track the current step

//   useEffect(() => {
//     const fetchLabs = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/labs');
//         setLabs(response.data);
//       } catch (error) {
//         console.error('Error fetching labs', error);
//       }
//     };

//     fetchLabs();
//   }, []);

//   const handleLabSelect = (labName) => {
//     setSelectedLab(labName);
//     setCurrentStep(2); // Move to step two after selecting a lab
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const requestData = {
//         senderName,
//         receiver: selectedLab,
//         title,
//         details,
//         status
//       };
//       await axios.post('http://localhost:5000/requests', requestData);
//       alert('Request sent successfully!');
//       // Clear the form
//       setSenderName('');
//       setSelectedLab('');
//       setDetails('');
//       setTitle('');
//       setCurrentStep(1); // Reset to step one after submission
//     } catch (error) {
//       console.error('Error sending request', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Send Request</h2>
//       {currentStep === 1 && (
//         <div>
//           <h3>Select a Lab</h3>
//           <ul>
//             {labs.map((lab) => (
//               <li key={lab._id} onClick={() => handleLabSelect(lab.name)}>
//                 {lab.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       {currentStep === 2 && (
//         <div>
//           <button onClick={() => setCurrentStep(1)}>Back</button>
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label>Sender Name:</label>
//               <input
//                 type="text"
//                 value={senderName}
//                 onChange={(e) => setSenderName(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label>Title:</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label>Selected Lab:</label>
//               <input type="text" value={selectedLab} readOnly />
//             </div>
//             <div>
//               <label>Details:</label>
//               <textarea
//                 value={details}
//                 onChange={(e) => setDetails(e.target.value)}
//                 required
//               ></textarea>
//             </div>
//             <div>
//               <button type="submit">Send Request</button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SendRequest;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SendRequest = () => {
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState('');
  const [senderName, setSenderName] = useState('');
  const [details, setDetails] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('PENDING');
  const [currentStep, setCurrentStep] = useState(1); // State to track the current step

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/labs');
        setLabs(response.data);
      } catch (error) {
        console.error('Error fetching labs', error);
      }
    };

    fetchLabs();
  }, []);

  const handleLabSelect = (labName) => {
    setSelectedLab(labName);
    setCurrentStep(2); // Move to step two after selecting a lab
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        senderName,
        receiver: selectedLab,
        title,
        details,
        status
      };
      await axios.post('http://localhost:5000/requests', requestData);
      alert('Request sent successfully!');
      // Clear the form
      setSenderName('');
      setSelectedLab('');
      setDetails('');
      setTitle('');
      setCurrentStep(1); // Reset to step one after submission
    } catch (error) {
      console.error('Error sending request', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-4xl font-bold mb-8 text-center text-gradient bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
        Send Request
      </h2>
      {currentStep === 1 && (
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6">Select a Lab</h3>
          <ul className="space-y-4">
            {labs.map((lab) => (
              <li 
                key={lab._id} 
                onClick={() => handleLabSelect(lab.name)} 
                className="cursor-pointer bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                {lab.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {currentStep === 2 && (
        <div className="max-w-lg mx-auto">
          <button 
            onClick={() => setCurrentStep(1)} 
            className="mb-6 px-4 py-2 bg-red-600 rounded-md hover:bg-red-500 transition duration-200"
          >
            Back
          </button>
          <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
            <div>
              <label className="block text-lg font-medium mb-2">Sender Name:</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
                className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Selected Lab:</label>
              <input 
                type="text" 
                value={selectedLab} 
                readOnly 
                className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Details:</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
                className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>
            <div>
              <button 
                type="submit" 
                className="w-full py-3 bg-green-600 rounded-md hover:bg-green-500 transition duration-200"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SendRequest;
