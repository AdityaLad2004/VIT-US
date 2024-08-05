import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ViewProjects = ({ role }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const userRole = role || localStorage.getItem('role');

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const res = await axios.get('http://localhost:5002/api/projects', config);
      setProjects(res.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching projects.');
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const res = await axios.post(
        `http://localhost:5002/api/projects/${selectedProject._id}/bid`,
        { bidAmount },
        config
      );
      setSelectedProject(res.data); // Update the project with the latest data including the new bid
      setBidAmount('');
      setSuccessMessage('Bid placed successfully!'); // Set the success message
      setTimeout(() => {
        setSelectedProject(null); // Go back to projects after 3 seconds
        setSuccessMessage(''); // Clear the success message
      }, 3000);
    } catch (error) {
      console.error(error);
      alert('Error placing bid.');
    }
  };

  const getChartData = () => {
    if (!selectedProject || selectedProject.bids.length === 0) {
      console.log('No data available for chart.');
      return { labels: [], datasets: [] };
    }

    const labels = selectedProject.bids.map(bid => bid.user ? bid.user.name : 'Unknown');
    const data = selectedProject.bids.map(bid => bid.amount);

    console.log('Chart Data:', { labels, data });

    return {
      labels,
      datasets: [{
        label: 'Bid Amounts by Investor',
        data,
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1,
      }],
    };
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-gradient bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
        Projects
      </h2>
      {successMessage && (
        <div className="bg-green-500 text-white p-4 rounded-md mb-4 text-center">
          {successMessage}
        </div>
      )}
      {selectedProject ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h3 className="text-3xl font-semibold mb-4">{selectedProject.title}</h3>
          <p className="text-gray-300 mb-4">{selectedProject.description}</p>
          <p className="text-gray-400 mb-4">Invest Amount: ${selectedProject.investAmount}</p>

          {userRole === 'maker' && (
            <div className="mb-6">
              <h4 className="text-2xl font-semibold mb-3">Investors and Bids</h4>
              {selectedProject.bids.length > 0 ? (
                <>
                  <Line
                    data={getChartData()}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.label}: $${context.raw}`,
                          },
                        },
                      },
                      scales: {
                        x: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Investor',
                          },
                        },
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Bid Amount',
                          },
                        },
                      },
                    }}
                  />
                  <div className="mt-6">
                    {selectedProject.bids.map((bid) => (
                      <div key={bid._id} className="border-b border-gray-700 py-2">
                        <p className="text-gray-300">Investor: {bid.user ? bid.user.name : 'Unknown'}</p>
                        <p className="text-gray-400">Bid Amount: ${bid.amount}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-400">No bids yet.</p>
              )}
            </div>
          )}
          
          {userRole === 'investor' && (
            <form onSubmit={handleBidSubmit} className="mt-6">
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Bid Amount"
                required
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-3 rounded-md hover:bg-teal-600 transition duration-300"
              >
                Place Bid
              </button>
            </form>
          )}
          <button
            onClick={() => setSelectedProject(null)}
            className="mt-6 bg-gray-700 text-gray-300 py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Back to Projects
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => handleProjectClick(project)}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400">Invest Amount: ${project.investAmount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProjects;
